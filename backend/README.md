# RoomAura - Smart Room Package Selector & E-Commerce Platform

A full-stack MERN application for interior design package selection and e-commerce with room size validation, real-time inventory management, and secure payment processing.

## 🚀 Features

### User Features
- **Authentication System**: Email/password and OTP-based login
- **Product Catalog**: Browse and filter room design packages
- **Room Size Validation**: Required room dimensions with compatibility checking
- **Stock Management**: Real-time stock availability
- **Shopping Cart**: Add, update, and remove items
- **Secure Checkout**: Stripe payment integration
- **Order Management**: View order history and track deliveries
- **Product Reviews**: Rate and review products
- **Delivery Check**: Pincode-based delivery availability

### Admin Features
- **Dashboard**: Comprehensive analytics and metrics
- **Product Management**: Full CRUD operations for products
- **Order Management**: View and update order status
- **User Management**: Customer account oversight
- **Inventory Control**: Stock level monitoring

### Technical Features
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Live cart and stock updates
- **Secure APIs**: JWT-based authentication
- **Database Integration**: MongoDB with Mongoose ODM
- **Email Service**: Nodemailer for OTP and notifications
- **Payment Gateway**: Stripe integration
- **File Upload**: Image handling for products

## 🛠 Tech Stack

### Frontend
- **React.js**: UI library
- **Tailwind CSS**: Styling framework
- **React Router**: Navigation
- **Axios**: HTTP client
- **Framer Motion**: Animations
- **React Hot Toast**: Notifications
- **Stripe React**: Payment components

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM
- **JWT**: Authentication
- **Nodemailer**: Email service
- **Stripe**: Payment processing
- **Bcrypt**: Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Stripe account (for payments)
- Gmail account (for email service)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://dhinakaran1845:i85ajrsofsJ9pjKt@merncluster.bnmp55a.mongodb.net/roomaura?retryWrites=true&w=majority&appName=Merncluster
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   
   # Email Configuration
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@roomaura.com
   
   # Payment Gateway
   STRIPE_SECRET_KEY=your-stripe-secret-key
   
   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   ```

4. **Seed the database**
   ```bash
   node seedData.js
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🗄 Database Schema

### Collections Created:
- **users**: User accounts and authentication
- **products**: Room design packages and inventory
- **orders**: Purchase orders and transactions
- **reviews**: Product reviews and ratings

### Sample Data:
The seeder creates:
- 6 featured room design packages
- 1 admin user (admin@roomaura.com / admin123)
- Various categories (bedroom, living-room, kitchen, etc.)

## 🔐 Authentication

### User Authentication:
- **Email/Password**: Traditional login method
- **OTP Login**: Email-based one-time password
- **JWT Tokens**: Secure session management

### Admin Access:
- **Email**: admin@roomaura.com
- **Password**: admin123

## 💳 Payment Integration

### Stripe Configuration:
1. Create a Stripe account
2. Get your publishable and secret keys
3. Add keys to environment variables
4. Test with Stripe test cards

### Supported Payment Methods:
- Credit/Debit Cards
- Cash on Delivery (COD)

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/send-otp` - Send OTP for login
- `POST /api/auth/verify-otp` - Verify OTP
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get product details
- `POST /api/products/:id/check-size` - Check room compatibility
- `POST /api/products/:id/check-delivery` - Check delivery availability

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user orders
- `PUT /api/orders/:id/payment` - Update payment status

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:productId` - Remove item

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/products` - Manage products
- `GET /api/admin/orders` - Manage orders

## 🎨 Design Features

### UI/UX Elements:
- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on all devices
- **Smooth Animations**: Framer Motion transitions
- **Interactive Elements**: Hover effects and micro-interactions
- **Color Scheme**: Indigo and purple gradients
- **Typography**: Readable fonts with proper hierarchy

### Key Components:
- **Product Cards**: Interactive product display
- **Room Size Validator**: Required dimension input
- **Cart Management**: Real-time updates
- **Checkout Flow**: Secure payment process
- **Admin Dashboard**: Comprehensive management tools

## 🔍 Room Size Validation

### Required Fields:
- **Length**: Room length in feet
- **Width**: Room width in feet  
- **Height**: Room height in feet

### Validation Process:
1. User enters room dimensions
2. System checks against product requirements
3. Compatibility status displayed
4. Prevents incompatible purchases

## 📊 Admin Features

### Dashboard Analytics:
- Total products count
- Total orders and revenue
- User statistics
- Recent orders overview

### Product Management:
- Add/edit/delete products
- Upload product images
- Set room size requirements
- Manage inventory levels

### Order Management:
- View all orders
- Update order status
- Track delivery progress
- Generate reports

## 🚀 Deployment

### Backend Deployment (Railway/Render):
1. Push code to GitHub
2. Connect to deployment platform
3. Set environment variables
4. Deploy backend service

### Frontend Deployment (Vercel):
1. Push code to GitHub
2. Connect to Vercel
3. Set build command: `npm run build`
4. Deploy frontend

### Database:
- MongoDB Atlas (already configured)
- Connection string provided in env

## 📧 Email Configuration

### Gmail Setup:
1. Enable 2-factor authentication
2. Generate app password
3. Use app password in EMAIL_PASS
4. Update EMAIL_USER with your Gmail

### Email Features:
- OTP delivery for login
- Order confirmation emails
- Password reset emails

## 🔒 Security Features

### Implemented Security:
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Bcrypt encryption
- **Input Validation**: Express validator
- **Rate Limiting**: Prevent abuse
- **CORS Configuration**: Cross-origin security
- **Helmet**: Security headers

## 🎯 Future Enhancements

### Planned Features:
- **AI Recommendations**: Smart product suggestions
- **AR Visualization**: Room preview with AR
- **Multi-language Support**: Localization
- **Voice Search**: Voice-activated search
- **Social Login**: OAuth integration
- **Wishlist Sharing**: Social features

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and queries:
- **Email**: support@roomaura.com
- **Phone**: +91 98765 43210

## 🙏 Acknowledgments

- **Pexels**: Stock images
- **Stripe**: Payment processing
- **MongoDB**: Database platform
- **Vercel**: Frontend hosting
- **Railway**: Backend hosting

---

Made with ❤️ by the RoomAura Team