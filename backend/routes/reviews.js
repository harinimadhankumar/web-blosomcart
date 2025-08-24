const express = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// ➕ Add or 🔁 update review
router.post('/', auth, async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;

    // Check if the user already reviewed this product
    const existingReview = await Review.findOne({
      user: req.user.userId,
      product: productId
    });

    if (existingReview) {
      // 🔁 Update existing review
      existingReview.rating = rating;
      existingReview.title = title;
      existingReview.comment = comment;
      await existingReview.save();

      // 🔄 Recalculate average rating
      const reviews = await Review.find({ product: productId });
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

      await Product.findByIdAndUpdate(productId, {
        $set: {
          'rating.average': avgRating,
          'rating.count': reviews.length
        }
      });

      return res.status(200).json({
        success: true,
        message: 'Review updated successfully',
        review: existingReview
      });
    }

    // ➕ Add new review
    const review = new Review({
      user: req.user.userId,
      product: productId,
      rating,
      title,
      comment
    });

    await review.save();

    // 🔄 Update product rating
    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: review._id },
      $set: {
        'rating.average': avgRating,
        'rating.count': reviews.length
      }
    });

    res.status(201).json({ success: true, message: 'Review added successfully', review });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 📄 Get all reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
