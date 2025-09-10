# Feesah Collections - E-commerce Platform

A modern, full-stack e-commerce platform built for Feesah Collections, featuring a customer-facing storefront and comprehensive admin dashboard.

## 🌟 Features

### Customer Features
- **Product Browsing**: Browse products by category with advanced filtering and search
- **Shopping Cart**: Add items to cart with persistent storage across sessions
- **Secure Checkout**: Bank transfer payment with proof of payment upload
- **User Accounts**: Registration, login, and order history tracking
- **Order Management**: Track orders and view detailed order information
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

### Admin Features
- **Product Management**: Add, edit, delete products with image uploads
- **Order Management**: View, update order status, and manage customer orders
- **Customer Management**: View customer details and order history
- **Dashboard Analytics**: Overview of sales, orders, and customer metrics
- **Inventory Tracking**: Monitor stock levels and product availability

### Technical Features
- **Full-Stack Architecture**: Next.js 14 with App Router
- **Database Integration**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based auth with role-based access control
- **File Uploads**: Image upload for products and payment proofs
- **API Routes**: RESTful API endpoints for all operations
- **Responsive UI**: Tailwind CSS with custom animations
- **Type Safety**: TypeScript throughout the application

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd feesah-collections
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/feesah-collections
   JWT_SECRET=your-super-secret-jwt-key-here
   NEXT_PUBLIC_API_URL=http://localhost:3000
   \`\`\`

4. **Database Setup**
   Run the database setup scripts:
   \`\`\`bash
   npm run setup-db
   npm run seed-db
   \`\`\`

5. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Access the Application**
   - Customer Site: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

## 🏗️ Project Structure

\`\`\`
feesah-collections/
├── app/                          # Next.js App Router pages
│   ├── admin/                    # Admin dashboard pages
│   ├── api/                      # API routes
│   ├── (customer pages)/         # Customer-facing pages
│   └── globals.css               # Global styles
├── components/                   # Reusable React components
│   ├── admin/                    # Admin-specific components
│   ├── ui/                       # UI components (shadcn/ui)
│   └── (shared components)       # Shared components
├── contexts/                     # React Context providers
├── lib/                          # Utility functions and configurations
├── scripts/                      # Database setup and utility scripts
└── public/                       # Static assets
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary**: Royal Blue (#1e40af) - Brand color
- **Secondary**: Light Blue (#3b82f6) - Accent color
- **Background**: Clean whites and light grays
- **Text**: Dark grays for optimal readability

### Typography
- **Headings**: Geist Sans - Clean, modern sans-serif
- **Body**: Geist Sans - Consistent typography throughout
- **Monospace**: Geist Mono - For code and technical content

### Components
- Built with shadcn/ui for consistency
- Custom animations for enhanced user experience
- Responsive design with mobile-first approach
- Accessible components with proper ARIA labels

## 🔐 Authentication & Security

### User Authentication
- JWT-based authentication system
- Secure password hashing with bcrypt
- Role-based access control (customer/admin)
- Protected routes and API endpoints

### Admin Access
- Email: feesahcollections@gmail.com
- Password: [MongoDB password]
- Full access to admin dashboard and management features

### Security Features
- Input validation and sanitization
- CORS protection
- Rate limiting on API endpoints
- Secure file upload handling

## 💳 Payment Integration

### Payment Methods
- **Bank Transfer**: Primary payment method
  - Bank: Palmpay
  - Account Number: 8153526811
  - Account Name: Nafisat Alamu
- **Cash on Delivery**: Available for local deliveries
- **Payment Proof**: Upload system for transfer confirmations

### Order Processing
1. Customer places order and selects payment method
2. For bank transfers: Customer uploads payment proof
3. Admin reviews and confirms payment
4. Order status updated and fulfillment begins
5. Customer receives tracking information

## 📦 Shipping & Delivery

### Delivery Coverage
- **Local**: Ile-Ife, Osun State (Same-day delivery available)
- **Regional**: Southwest Nigeria (2-5 days)
- **National**: All 36 states (3-7 days)

### Shipping Features
- Real-time order tracking
- Multiple delivery options
- Delivery confirmation system
- Return and exchange support

## 🛠️ API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Product Endpoints
- `GET /api/products` - Get all products (with filtering)
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Order Endpoints
- `GET /api/orders` - Get orders (user: own orders, admin: all orders)
- `POST /api/orders` - Create new order
- `PUT /api/orders/[id]` - Update order status (admin only)

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Environment Variables for Production
\`\`\`env
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
\`\`\`

## 📱 Mobile Optimization

- Responsive design works on all screen sizes
- Touch-friendly interface elements
- Optimized images and fast loading
- Progressive Web App (PWA) ready
- Mobile-first CSS approach

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup-db` - Initialize database schema
- `npm run seed-db` - Seed database with sample data

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks

## 📞 Support & Contact

### Business Information
- **Business Name**: Feesah Collections
- **Owner**: Nafisat Alamu (Fee Sah)
- **Location**: Ile-Ife, Osun State, Nigeria
- **University**: Obafemi Awolowo University (OAU) Student

### Contact Information
- **WhatsApp**: +234 912 090 2332
- **Email**: feesahcollections@gmail.com
- **Facebook**: Fee Sah
- **Twitter/X**: @feesah_store_

### Business Hours
- **Monday - Saturday**: 9:00 AM - 8:00 PM
- **Sunday**: 12:00 PM - 6:00 PM
- **Emergency Support**: 24/7 via WhatsApp

## 📄 License

This project is proprietary software developed for Feesah Collections. All rights reserved.

## 🤝 Contributing

This is a private project for Feesah Collections. For any modifications or improvements, please contact the development team.

---

**Built with ❤️ for Feesah Collections**
*Empowering young entrepreneurs in Nigeria*
