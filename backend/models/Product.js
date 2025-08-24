const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    enum: ['Small', 'Medium', 'Large', 'Extra Large'] // extendable
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  // ✅ Now we use bouquet sizes instead of single price/stock
  sizes: [sizeSchema],

  category: {
    type: String,
    required: true,
    enum: ['bouquet', 'flower-basket', 'gift', 'combo'] // customized for BlossomCart
  },

  images: [{
    url: String,
    alt: String
  }],

  specifications: {
    flowers: [String],   // e.g., ["Roses", "Lilies"]
    colorTheme: String,  // e.g., "Red & White"
    occasion: String     // e.g., "Birthday", "Anniversary"
  },

  deliveryPincodes: {
    type: [String],
    default: [] // empty means deliver anywhere
  },

  tags: [String],

  featured: {
    type: Boolean,
    default: false
  },

  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },

  numReviews: {
    type: Number,
    default: 0
  },

  isAvailable: {
    type: Boolean,
    default: true
  },

  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],

  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued'],
    default: 'active'
  }
}, {
  timestamps: true
});

// 🔁 Auto-update `isAvailable` based on bouquet sizes stock
productSchema.pre('save', function (next) {
  this.isAvailable = this.sizes.some(size => size.stock > 0);
  next();
});

// 🔍 Full-text search index
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
