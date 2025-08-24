  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const helmet = require('helmet');
  const rateLimit = require('express-rate-limit');
  require('dotenv').config();

  const app = express();

  // Security middleware
  app.use(helmet());
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use('/api/', limiter);

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Static file serving
  app.use('/uploads', express.static('uploads'));

  // Database connection
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

  // Routes
  // Load routes individually with error checking
  try {
    const authRoutes = require('./routes/auth');
    console.log('Auth routes loaded:', typeof authRoutes);
    app.use('/api/auth', authRoutes);
  } catch (error) {
    console.error('Error loading auth routes:', error);
    process.exit(1);
  }

  try {
    const productRoutes = require('./routes/products');
    console.log('Product routes loaded:', typeof productRoutes);
    app.use('/api/products', productRoutes);
  } catch (error) {
    console.error('Error loading product routes:', error);
    process.exit(1);
  }

  try {
    const orderRoutes = require('./routes/orders');
    console.log('Order routes loaded:', typeof orderRoutes);
    app.use('/api/orders', orderRoutes);
  } catch (error) {
    console.error('Error loading order routes:', error);
    process.exit(1);
  }

  try {
    const adminRoutes = require('./routes/admin');
    console.log('Admin routes loaded:', typeof adminRoutes);
    app.use('/api/admin', adminRoutes);
  } catch (error) {
    console.error('Error loading admin routes:', error);
    process.exit(1);
  }

  try {
    const cartRoutes = require('./routes/cart');
    console.log('Cart routes loaded:', typeof cartRoutes);
    app.use('/api/cart', cartRoutes);
  } catch (error) {
    console.error('Error loading cart routes:', error);
    process.exit(1);
  }

  try {
    const reviewRoutes = require('./routes/reviews');
    console.log('Review routes loaded:', typeof reviewRoutes);
    app.use('/api/reviews', reviewRoutes);
  } catch (error) {
    console.error('Error loading review routes:', error);
    process.exit(1);
  }

  try {
    const refundRoutes = require('./routes/refund');
    console.log('Refund routes loaded:', typeof refundRoutes);
    app.use('/api/refund', refundRoutes);
  } catch (error) {
    console.error('Error loading refund routes:', error);
    process.exit(1);
  }

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'RoomAura API is running' });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Something went wrong!',
      error: process.env.NODE_ENV === 'production' ? {} : err.message
    });
  });

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ 
      success: false, 
      message: 'API endpoint not found' 
    });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });