import { Header } from "@/components/header"
import { ProductDetail } from "@/components/product-detail"
import { getProductBySlug } from "@/lib/products"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetail product={product} />
      </main>
    </div>
  )
}
