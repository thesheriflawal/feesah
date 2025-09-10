"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, Minus, Plus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

// Mock product data - in real app, this would come from API
const getProduct = (id: string) => {
  const products = [
    {
      id: "1",
      name: "JBL Super Bass Headphone",
      price: 15000,
      originalPrice: 18000,
      image: "/jbl-headphones-black-wireless.jpg",
      rating: 4.5,
      reviews: 24,
      badge: "Best Seller",
      category: "electronics",
      description:
        "Experience premium sound quality with these wireless JBL headphones featuring super bass technology. Perfect for music lovers and professionals alike.",
      features: [
        "Wireless Bluetooth 5.0",
        "30-hour battery life",
        "Super bass technology",
        "Comfortable over-ear design",
        "Built-in microphone",
      ],
      inStock: true,
      stockCount: 15,
    },
  ]
  return products.find((p) => p.id === id)
}

export default function ProductDetailPage() {
  const params = useParams()
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const product = getProduct(params.id as string)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name}(s) added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-card">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{product.badge}</Badge>
              {product.originalPrice && (
                <Badge variant="destructive" className="absolute top-4 right-4">
                  Save ₦{(product.originalPrice - product.price).toLocaleString()}
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">{product.stockCount} in stock</span>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleAddToCart} className="flex-1" size="lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" onClick={() => setIsFavorite(!isFavorite)}>
                  <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-current" : ""}`} />
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Availability:</span>
                <Badge variant={product.inStock ? "default" : "destructive"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
