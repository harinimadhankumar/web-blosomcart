const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user cart
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId })
      .populate('items.product', 'name images sizes');

    if (!cart) {
      return res.json({ success: true, cart: { items: [] } }); // empty cart
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add item to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, sizeLabel, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const size = product.sizes.find(s => s.label === sizeLabel);
    if (!size) {
      return res.status(400).json({ success: false, message: 'Invalid size selected' });
    }

    if (size.stock < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock for this size' });
    }

    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      cart = new Cart({ user: req.user.userId, items: [] });
    }

    // Check if item with same product & size already exists
    const existingItem = cart.items.find(item =>
      item.product.toString() === productId && item.sizeLabel === sizeLabel
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, sizeLabel, quantity });
    }

    await cart.save();
    await cart.populate('items.product', 'name images sizes');

    res.json({ success: true, message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update cart item
router.put('/update', auth, async (req, res) => {
  try {
    const { productId, sizeLabel, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const cartItem = cart.items.find(item =>
      item.product.toString() === productId && item.sizeLabel === sizeLabel
    );

    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(item =>
        !(item.product.toString() === productId && item.sizeLabel === sizeLabel)
      );
    } else {
      cartItem.quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.product', 'name images sizes');

    res.json({ success: true, message: 'Cart updated', cart });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Remove item from cart
router.delete('/remove/:productId/:sizeLabel', auth, async (req, res) => {
  try {
    const { productId, sizeLabel } = req.params;

    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item =>
      !(item.product.toString() === productId && item.sizeLabel === sizeLabel)
    );

    await cart.save();
    await cart.populate('items.product', 'name images sizes');

    res.json({ success: true, message: 'Item removed from cart', cart });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
