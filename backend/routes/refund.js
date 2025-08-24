// routes/refund.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth'); // optional: only allow logged-in users to refund

// POST /api/refund
router.post('/', auth, async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ success: false, message: 'paymentIntentId is required' });
    }

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId
    });

    res.status(200).json({
      success: true,
      message: 'Refund initiated successfully',
      refund
    });
  } catch (error) {
    console.error('Refund Error:', error.message);
    res.status(500).json({ success: false, message: 'Refund failed', error: error.message });
  }
});

module.exports = router;
