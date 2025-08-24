const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Modern Bedroom Set - Luxury Collection",
    description: "Complete bedroom furniture set with king-size bed, wardrobes, and nightstands. Perfect for modern homes with contemporary design.",
    price: 45000,
    originalPrice: 55000,
    category: "bedroom",
    images: [
      { url: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg", alt: "Modern Bedroom Set" },
      { url: "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg", alt: "Bedroom Interior" }
    ],
    specifications: {
      material: "Engineered Wood",
      color: "Walnut Brown",
      style: "Modern",
      warranty: "2 Years"
    },
    roomSizeRequirements: {
      minLength: 12,
      maxLength: 20,
      minWidth: 10,
      maxWidth: 16,
      minHeight: 8,
      maxHeight: 12
    },
    stock: 25,
    deliveryPincodes: ["110001", "110002", "110003", "400001", "400002", "600001", "700001"],
    tags: ["bedroom", "furniture", "modern", "luxury"],
    featured: true
  },
  {
    name: "Contemporary Living Room Package",
    description: "Stylish living room setup with sofa set, coffee table, and entertainment unit. Designed for comfort and elegance.",
    price: 38000,
    originalPrice: 48000,
    category: "living-room",
    images: [
      { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", alt: "Living Room Set" },
      { url: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg", alt: "Modern Living Room" }
    ],
    specifications: {
      material: "Fabric & Wood",
      color: "Grey & Brown",
      style: "Contemporary",
      warranty: "1 Year"
    },
    roomSizeRequirements: {
      minLength: 14,
      maxLength: 24,
      minWidth: 12,
      maxWidth: 18,
      minHeight: 8,
      maxHeight: 12
    },
    stock: 30,
    deliveryPincodes: ["110001", "110002", "110003", "400001", "400002", "600001", "700001"],
    tags: ["living-room", "sofa", "contemporary", "comfort"],
    featured: true
  },
  {
    name: "Modular Kitchen - Premium Design",
    description: "Complete modular kitchen solution with cabinets, countertops, and appliances. Space-efficient and stylish.",
    price: 85000,
    originalPrice: 100000,
    category: "kitchen",
    images: [
      { url: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg", alt: "Modular Kitchen" },
      { url: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg", alt: "Kitchen Design" }
    ],
    specifications: {
      material: "Marine Plywood",
      color: "White & Oak",
      style: "Modern",
      warranty: "5 Years"
    },
    roomSizeRequirements: {
      minLength: 8,
      maxLength: 16,
      minWidth: 6,
      maxWidth: 12,
      minHeight: 8,
      maxHeight: 10
    },
    stock: 15,
    deliveryPincodes: ["110001", "110002", "110003", "400001", "400002", "600001", "700001"],
    tags: ["kitchen", "modular", "premium", "appliances"],
    featured: true
  },
  {
    name: "Compact Bedroom Set - Small Spaces",
    description: "Space-saving bedroom furniture perfect for small apartments. Includes bed with storage and compact wardrobe.",
    price: 22000,
    originalPrice: 28000,
    category: "bedroom",
    images: [
      { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", alt: "Compact Bedroom" },
      { url: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg", alt: "Small Bedroom Design" }
    ],
    specifications: {
      material: "Particle Board",
      color: "White",
      style: "Minimalist",
      warranty: "1 Year"
    },
    roomSizeRequirements: {
      minLength: 8,
      maxLength: 14,
      minWidth: 8,
      maxWidth: 12,
      minHeight: 8,
      maxHeight: 10
    },
    stock: 40,
    deliveryPincodes: ["110001", "110002", "110003", "400001", "400002", "600001", "700001"],
    tags: ["bedroom", "compact", "small-space", "storage"],
    featured: false
  },
  {
    name: "Executive Office Setup",
    description: "Professional office furniture set with executive desk, chair, and storage solutions. Perfect for home offices.",
    price: 32000,
    originalPrice: 40000,
    category: "office",
    images: [
      { url: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg", alt: "Office Setup" },
      { url: "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg", alt: "Executive Office" }
    ],
    specifications: {
      material: "Solid Wood",
      color: "Dark Brown",
      style: "Executive",
      warranty: "3 Years"
    },
    roomSizeRequirements: {
      minLength: 10,
      maxLength: 18,
      minWidth: 8,
      maxWidth: 14,
      minHeight: 8,
      maxHeight: 12
    },
    stock: 20,
    deliveryPincodes: ["110001", "110002", "110003", "400001", "400002", "600001", "700001"],
    tags: ["office", "executive", "professional", "workspace"],
    featured: false
  },
  {
    name: "Elegant Dining Room Package",
    description: "Beautiful dining room set with 6-seater table, chairs, and buffet unit. Perfect for family gatherings.",
    price: 55000,
    originalPrice: 65000,
    category: "dining-room",
    images: [
      { url: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg", alt: "Dining Room" },
      { url: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg", alt: "Dining Table Set" }
    ],
    specifications: {
      material: "Solid Wood",
      color: "Honey Brown",
      style: "Traditional",
      warranty: "2 Years"
    },
    roomSizeRequirements: {
      minLength: 12,
      maxLength: 20,
      minWidth: 10,
      maxWidth: 16,
      minHeight: 8,
      maxHeight: 12
    },
    stock: 18,
    deliveryPincodes: ["110001", "110002", "110003", "400001", "400002", "600001", "700001"],
    tags: ["dining-room", "family", "traditional", "elegant"],
    featured: true
  }
];

const adminUser = {
  name: "Admin User",
  email: "admin@roomaura.com",
  password: "admin123",
  role: "admin",
  isVerified: true
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({ role: 'admin' });

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${products.length} products`);

    // Insert admin user
    const admin = new User(adminUser);
    await admin.save();
    console.log('✅ Inserted admin user');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nAdmin Login:');
    console.log('Email: admin@roomaura.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();