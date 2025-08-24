const express = require('express');
const auth = require('../middleware/auth');
const Product = require('../models/Product');

const router = express.Router();

// 🔹 Create new product (admin only in real usage)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
});

// 🔹 Get all product categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({ success: true, categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 🔹 Get all products with filters, search, sort, and pagination
router.get('/', async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      search,
      sort,
      page = 1,
      limit = 12,
      featured
    } = req.query;

    const query = { status: 'active' };

    if (category) query.category = category;

    // ✅ Price filter will look inside sizes array
    if (minPrice || maxPrice) {
      query['sizes.price'] = {};
      if (minPrice) query['sizes.price'].$gte = Number(minPrice);
      if (maxPrice) query['sizes.price'].$lte = Number(maxPrice);
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (featured === 'true') {
      query.featured = true;
    }

    let sortOption = {};
    switch (sort) {
      case 'price-low':
        sortOption = { 'sizes.price': 1 };
        break;
      case 'price-high':
        sortOption = { 'sizes.price': -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'newest':
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('reviews', 'rating');

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 🔹 Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ❌ Removed: Check room size compatibility (not needed for bouquets)

// 🔹 Check delivery availability by pincode
router.post('/:id/check-delivery', async (req, res) => {
  try {
    const { pincode } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // If deliveryPincodes is empty or undefined, assume delivery is available everywhere
    const deliverAnywhere = !product.deliveryPincodes || product.deliveryPincodes.length === 0;
    const isAvailable = deliverAnywhere || product.deliveryPincodes.includes(pincode);

    res.json({
      success: true,
      available: isAvailable,
      message: isAvailable
        ? 'Delivery available to your location'
        : 'Sorry, delivery not available to your location'
    });
  } catch (error) {
    console.error('Check delivery error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
