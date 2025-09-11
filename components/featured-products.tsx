"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

// Sample products based on the catalog images
const featuredProducts = [
  {
    id: 1,
    name: "JBL Super Bass Headphone",
    price: 15000,
    originalPrice: 18000,
    image: "/jbl-headphones-black-wireless.jpg",
    rating: 4.5,
    reviews: 24,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Perfume Atomizer",
    price: 3500,
    image: "/perfume-atomizer-spray-bottle.jpg",
    rating: 4.3,
    reviews: 18,
    badge: "New",
  },
  {
    id: 3,
    name: "Steel Bathroom Rack",
    price: 6000,
    image: "/steel-bathroom-organizer-rack.jpg",
    rating: 4.7,
    reviews: 31,
    badge: "Popular",
  },
  {
    id: 4,
    name: "Collapsible Water Bottle",
    price: 4500,
    image: "/collapsible-silicone-water-bottle.jpg",
    rating: 4.4,
    reviews: 15,
    badge: "Eco-Friendly",
  },
  {
    id: 5,
    name: "Adjustable Phone Stand",
    price: 2500,
    image: "/adjustable-phone-stand-desk.jpg",
    rating: 4.6,
    reviews: 42,
    badge: "Top Rated",
  },
  {
    id: 6,
    name: "LED Cube Light",
    price: 5800,
    image: "/led-cube-light-colorful.jpg",
    rating: 4.2,
    reviews: 28,
    badge: "Trending",
  },
];

export function FeaturedProducts() {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular and highly-rated products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
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
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </Link>
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {product.badge}
                  </Badge>
                  {product.originalPrice && (
                    <Badge
                      variant="destructive"
                      className="absolute top-3 right-3"
                    >
                      Save ₦
                      {(product.originalPrice - product.price).toLocaleString()}
                    </Badge>
                  )}
                </div>

                <div className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
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
                      <span className="text-2xl font-bold text-primary">
                        ₦{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₦{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
