const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();

// =============================
// Create Order
// =============================
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
      }

      // Find the chosen size
      const chosenSize = product.sizes.find(s => s.label === item.sizeLabel);
      if (!chosenSize) {
        return res.status(400).json({ success: false, message: `Invalid size selected for ${product.name}` });
      }

      // Check stock
      if (chosenSize.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name} - ${item.sizeLabel}`
        });
      }

      const itemTotal = chosenSize.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        sizeLabel: item.sizeLabel,
        quantity: item.quantity,
        price: chosenSize.price
      });
    }

    const tax = +(subtotal * 0.18).toFixed(2); // 18% GST
    const shippingCost = subtotal > 10000 ? 0 : 500;
    const total = subtotal + tax + shippingCost;

    const order = new Order({
      user: req.user.userId,
      items: orderItems,
      subtotal,
      tax,
      shippingCost,
      total,
      shippingAddress,
      paymentMethod
    });

    await order.save();

    // Update stock
    for (const item of orderItems) {
      await Product.updateOne(
        { _id: item.product, "sizes.label": item.sizeLabel },
        { $inc: { "sizes.$.stock": -item.quantity } }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// =============================
// Cancel Order
// =============================
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (order.status === 'shipped' || order.status === 'delivered') {
      return res.status(400).json({ success: false, message: 'Cannot cancel shipped/delivered order' });
    }

    order.status = 'cancelled';
    order.cancelledAt = new Date();
    await order.save();

    // Restore stock
    for (const item of order.items) {
      await Product.updateOne(
        { _id: item.product, "sizes.label": item.sizeLabel },
        { $inc: { "sizes.$.stock": item.quantity } }
      );
    }

    res.json({ success: true, message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// =============================
// Get My Orders
// =============================
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// =============================
// Get Order By ID
// =============================
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
