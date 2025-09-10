"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Extended product data based on catalog images
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
    brand: "jbl",
  },
  {
    id: "2",
    name: "Perfume Atomizer",
    price: 3500,
    image: "/perfume-atomizer-spray-bottle.jpg",
    rating: 4.3,
    reviews: 18,
    badge: "New",
    category: "beauty",
    brand: "generic",
  },
  {
    id: "3",
    name: "Steel Bathroom Rack",
    price: 6000,
    image: "/steel-bathroom-organizer-rack.jpg",
    rating: 4.7,
    reviews: 31,
    badge: "Popular",
    category: "home",
    brand: "generic",
  },
  {
    id: "4",
    name: "Collapsible Water Bottle",
    price: 4500,
    image: "/collapsible-silicone-water-bottle.jpg",
    rating: 4.4,
    reviews: 15,
    badge: "Eco-Friendly",
    category: "accessories",
    brand: "generic",
  },
  {
    id: "5",
    name: "Adjustable Phone Stand",
    price: 2500,
    image: "/adjustable-phone-stand-desk.jpg",
    rating: 4.6,
    reviews: 42,
    badge: "Top Rated",
    category: "accessories",
    brand: "generic",
  },
  {
    id: "6",
    name: "LED Cube Light",
    price: 5800,
    image: "/led-cube-light-colorful.jpg",
    rating: 4.2,
    reviews: 28,
    badge: "Trending",
    category: "electronics",
    brand: "generic",
  },
  {
    id: "7",
    name: "1000W Nova Hair Dryer",
    price: 8500,
    image: "/nova-hair-dryer-professional.jpg",
    rating: 4.5,
    reviews: 19,
    badge: "Professional",
    category: "beauty",
    brand: "nova",
  },
  {
    id: "8",
    name: "Rechargeable Fan",
    price: 6400,
    image: "/rechargeable-portable-fan.jpg",
    rating: 4.3,
    reviews: 22,
    badge: "Portable",
    category: "electronics",
    brand: "generic",
  },
  {
    id: "9",
    name: "Hand Cream Set",
    price: 3200,
    image: "/hand-cream-moisturizer-set.jpg",
    rating: 4.6,
    reviews: 35,
    badge: "Skincare",
    category: "beauty",
    brand: "generic",
  },
  {
    id: "10",
    name: "Temperature Health Watch",
    price: 4500,
    image: "/health-monitoring-smartwatch.jpg",
    rating: 4.4,
    reviews: 28,
    badge: "Health",
    category: "electronics",
    brand: "generic",
  },
  {
    id: "11",
    name: "LED Light Strip",
    price: 3800,
    image: "/led-strip-lights-colorful.jpg",
    rating: 4.2,
    reviews: 16,
    badge: "Ambient",
    category: "home",
    brand: "generic",
  },
  {
    id: "12",
    name: "Spoon & Ladle Set",
    price: 2200,
    image: "/kitchen-spoon-ladle-set.jpg",
    rating: 4.5,
    reviews: 31,
    badge: "Kitchen",
    category: "home",
    brand: "generic",
  },
]

interface ProductGridProps {
  filters: {
    categories: string[]
    brands: string[]
    priceRange: [number, number]
    searchQuery: string
  }
}

export function ProductGrid({ filters }: ProductGridProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { addItem } = useCart()
  const { toast } = useToast()

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Search query filter
      if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false
      }

      return true
    })
  }, [filters])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria.</p>
        <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Card
          key={product.id}
          className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border"
        >
          <CardContent className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <Link href={`/products/${product.id}`}>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{product.badge}</Badge>
              {product.originalPrice && (
                <Badge variant="destructive" className="absolute top-3 right-3">
                  Save ₦{(product.originalPrice - product.price).toLocaleString()}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.has(product.id) ? "text-red-500 fill-current" : "text-muted-foreground"
                  }`}
                />
              </Button>
            </div>

            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <Button className="w-full" size="sm" onClick={() => handleAddToCart(product)}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
