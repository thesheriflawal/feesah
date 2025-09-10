import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Headphones, Home, Sparkles, Watch } from "lucide-react"

const categories = [
  {
    name: "Electronics",
    icon: Headphones,
    href: "/products?category=electronics",
    description: "Headphones, speakers, gadgets & more",
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Home & Kitchen",
    icon: Home,
    href: "/products?category=home",
    description: "Organizers, storage, kitchen essentials",
    color: "bg-green-50 text-green-600",
  },
  {
    name: "Beauty & Care",
    icon: Sparkles,
    href: "/products?category=beauty",
    description: "Skincare, perfumes, beauty tools",
    color: "bg-pink-50 text-pink-600",
  },
  {
    name: "Accessories",
    icon: Watch,
    href: "/products?category=accessories",
    description: "Phone accessories, bags, jewelry",
    color: "bg-purple-50 text-purple-600",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated collection of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${category.color}`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
