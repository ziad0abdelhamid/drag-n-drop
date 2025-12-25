# Luxe Drops - Premium Drop-shipping Platform

A full-stack luxury e-commerce drop-shipping website built with Next.js 16, featuring multi-language support (English, Arabic, German), Stripe payment integration, and a comprehensive admin dashboard.

## Features

### For Customers
- **Beautiful Store Frontend**: Luxury-focused product browsing with artistic design
- **Multi-language Support**: Full i18n support for English, Arabic, and German
- **Shopping Cart**: Client-side cart with persistent storage
- **Stripe Checkout**: Secure payment processing with Stripe
- **Order Tracking**: View order history and status
- **Authentication**: User signup and login system

### For Admins
- **Product Management**: Add, edit, and manage products
- **Inventory Control**: Real-time stock management with low-stock alerts
- **Order Management**: View and manage all customer orders
- **Sales Analytics**: Dashboard with revenue, orders, and sales charts
- **User Management**: Admin access control

## Tech Stack

- **Frontend**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui with Radix UI
- **Database**: Neon PostgreSQL
- **Authentication**: Custom auth with bcrypt password hashing
- **Payments**: Stripe integration
- **State Management**: Zustand for cart management
- **i18n**: Custom translation system

## Getting Started

### Prerequisites
- Node.js 18+
- Neon PostgreSQL database
- Stripe account

### Environment Variables

Create a `.env.local` file with:

```env
DATABASE_URL=your_neon_postgresql_url
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Initialize database**
   - The `scripts/01-init-schema.sql` file contains all necessary table schemas
   - Run this script in your Neon dashboard or through a database tool

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Create admin user**
   - Sign up a new account at `/auth/signup`
   - Update the user to admin in the database:
   ```sql
   UPDATE users SET is_admin = true WHERE email = 'your@email.com';
   ```

5. **Access admin dashboard**
   - Navigate to `/admin` after logging in as admin

## Project Structure

```
├── app/
│   ├── api/              # API routes (auth, products, orders, stripe)
│   ├── admin/            # Admin dashboard pages
│   ├── auth/             # Auth pages (login, signup)
│   ├── checkout/         # Checkout page
│   ├── cart/             # Cart page
│   ├── shop/             # Shop page
│   ├── products/         # Product detail page
│   └── page.tsx          # Homepage
├── components/
│   ├── admin/            # Admin components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Main header
│   ├── product-card.tsx  # Product card component
│   └── language-switcher.tsx
├── lib/
│   ├── types.ts          # TypeScript types
│   ├── db.ts             # Database connection
│   ├── auth.ts           # Authentication logic
│   ├── products.ts       # Product queries
│   ├── cart.ts           # Cart state management
│   ├── i18n.ts           # Translations
│   └── middleware.ts     # Auth middleware
└── scripts/
    └── 01-init-schema.sql # Database schema
```

## Key Features Explained

### Multi-language Support
- Switch between English, Arabic, and German using the language switcher
- Translations stored in `lib/i18n.ts`
- RTL support ready for Arabic

### Shopping Cart
- Client-side cart with Zustand state management
- Persistent storage using localStorage
- Real-time quantity updates

### Stripe Integration
- Create payment intents for secure transactions
- Automatic order creation on checkout
- Stock management during order processing

### Admin Dashboard
- Real-time sales analytics with charts
- Product inventory management
- Order status tracking
- Low stock alerts

## Database Schema

### Tables
- `users`: Customer and admin accounts
- `products`: Product catalog with pricing and inventory
- `orders`: Customer orders
- `order_items`: Line items for each order
- `cart`: Shopping cart sessions
- `cart_items`: Items in shopping cart

## Styling

The design uses a luxury premium color palette:
- **Primary**: Gold/Bronze accent color (oklch 0.45 0.15 70)
- **Secondary**: Dark sophisticated color (oklch 0.15 0.01 0)
- **Accent**: Lighter gold (oklch 0.65 0.08 80)

All colors are defined as CSS variables in `app/globals.css` for easy theming.

## API Endpoints

### Public
- `GET /api/products` - List all products
- `GET /api/products/[id]` - Get product details
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check` - Check auth status

### Protected (Authenticated)
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

### Admin Only
- `POST /api/products` - Create product
- `PUT /api/products/[id]` - Update product
- `GET /api/inventory` - Get inventory
- `PUT /api/inventory` - Update stock
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/orders` - All orders

## Security

- Passwords hashed with bcrypt
- HTTP-only cookies for authentication
- CSRF protection ready
- Input validation on all endpoints
- Admin-only routes protected with middleware

## Performance

- Next.js 16 with Turbopack for fast builds
- Static generation where possible
- Image optimization ready
- Database indexing on frequently queried fields

## Future Enhancements

- [ ] Email notifications for orders
- [ ] Customer reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filtering
- [ ] Discount codes and promotions
- [ ] Shipping integration
- [ ] SMS notifications
- [ ] Social media integration

## Deployment

Deploy to Vercel with:

```bash
vercel deploy
```

Set environment variables in Vercel project settings.

## License

MIT

## Support

For issues or questions, refer to the documentation or create an issue in the repository.
