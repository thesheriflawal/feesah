"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "electronics", label: "Electronics", count: 15 },
  { id: "home", label: "Home & Kitchen", count: 12 },
  { id: "beauty", label: "Beauty & Care", count: 18 },
  { id: "accessories", label: "Accessories", count: 22 },
]

const brands = [
  { id: "jbl", label: "JBL", count: 3 },
  { id: "nova", label: "Nova", count: 2 },
  { id: "generic", label: "Generic", count: 25 },
]

interface ProductFiltersProps {
  filters: {
    categories: string[]
    brands: string[]
    priceRange: [number, number]
    searchQuery: string
  }
  onFiltersChange: (filters: any) => void
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((id) => id !== categoryId)

    onFiltersChange({
      ...filters,
      categories: newCategories,
    })
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    const newBrands = checked ? [...filters.brands, brandId] : filters.brands.filter((id) => id !== brandId)

    onFiltersChange({
      ...filters,
      brands: newBrands,
    })
  }

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      brands: [],
      priceRange: [0, 20000] as [number, number],
      searchQuery: "",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <Label htmlFor={category.id} className="text-sm flex-1 cursor-pointer">
                    {category.label} ({category.count})
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-3">
              <Slider
                value={[filters.priceRange[0], filters.priceRange[1]]}
                onValueChange={handlePriceChange}
                max={20000}
                min={0}
                step={500}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>₦{filters.priceRange[0].toLocaleString()}</span>
                <span>₦{filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-semibold mb-3">Brands</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.id}
                    checked={filters.brands.includes(brand.id)}
                    onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                  />
                  <Label htmlFor={brand.id} className="text-sm flex-1 cursor-pointer">
                    {brand.label} ({brand.count})
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
            Clear Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
