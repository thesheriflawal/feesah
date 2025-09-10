"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    priceRange: [0, 20000] as [number, number],
    searchQuery: "",
  })

  useEffect(() => {
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    if (category) {
      setFilters((prev) => ({
        ...prev,
        categories: [category],
      }))
    }

    if (search) {
      setFilters((prev) => ({
        ...prev,
        searchQuery: search,
      }))
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={(query) => setFilters((prev) => ({ ...prev, searchQuery: query }))} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">All Products</h1>
          <p className="text-lg text-muted-foreground">Discover our complete collection of quality products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <ProductFilters filters={filters} onFiltersChange={setFilters} />
          </aside>
          <div className="flex-1">
            <ProductGrid filters={filters} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
