import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Headphones, speakers, phone accessories, and tech gadgets",
    itemCount: 45,
    image: "/modern-electronics-headphones-speakers-tech-gadget.jpg",
    featured: ["JBL Headphones", "Bluetooth Speakers", "Phone Stands", "Charging Cables"],
  },
  {
    name: "Home & Kitchen",
    slug: "home",
    description: "Kitchen appliances, storage solutions, and home organization",
    itemCount: 38,
    image: "/modern-kitchen-appliances-home-organization-storag.jpg",
    featured: ["Water Bottles", "Storage Racks", "Kitchen Tools", "Organizers"],
  },
  {
    name: "Beauty & Personal Care",
    slug: "beauty",
    description: "Skincare, makeup tools, and personal care accessories",
    itemCount: 32,
    image: "/beauty-products-skincare-makeup-cosmetics.jpg",
    featured: ["Perfume Atomizers", "Makeup Tools", "Skincare Sets", "Beauty Accessories"],
  },
  {
    name: "Fashion Accessories",
    slug: "accessories",
    description: "Bags, jewelry, watches, and fashion accessories",
    itemCount: 28,
    image: "/fashion-accessories-bags-jewelry-watches.jpg",
    featured: ["Handbags", "Jewelry Sets", "Watches", "Scarves"],
  },
  {
    name: "Health & Wellness",
    slug: "health",
    description: "Fitness accessories, health monitors, and wellness products",
    itemCount: 22,
    image: "/health-wellness-fitness-accessories-monitors.jpg",
    featured: ["Fitness Trackers", "Water Bottles", "Health Monitors", "Wellness Tools"],
  },
  {
    name: "Office & Stationery",
    slug: "office",
    description: "Office supplies, stationery, and work accessories",
    itemCount: 18,
    image: "/office-supplies-stationery-work-desk-accessories.jpg",
    featured: ["Notebooks", "Pens", "Desk Organizers", "Office Tools"],
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Shop by Category</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated collection of products across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card
              key={category.slug}
              className="group hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                      {category.itemCount} items
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{category.name}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Featured Items:</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.featured.map((item, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/products?category=${category.slug}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors group"
                  >
                    Shop {category.name}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Products Link */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Card className="inline-block hover-lift">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Browse All Products</h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Browse our complete product catalog
              </p>
              <Link
                href="/products"
                className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors animate-pulse-glow"
              >
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
