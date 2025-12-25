export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  image_url: string
  category: string
  stock_quantity: number
  sku: string
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  email: string
  full_name: string
  is_admin: boolean
  created_at: string
  updated_at: string
}

export type Order = {
  id: string
  user_id: string | null
  customer_email: string
  customer_name: string
  total_amount: number
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled"
  stripe_payment_intent_id: string | null
  shipping_address: string
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  created_at: string
}

export type CartItem = {
  id: string
  cart_id: string
  product_id: string
  quantity: number
  created_at: string
}
