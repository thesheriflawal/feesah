"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Eye, Package } from "lucide-react"
import Link from "next/link"

// Extended product data for admin management
const products = [
  {
    id: 1,
    name: "JBL Super Bass Headphone",
    price: 15000,
    originalPrice: 18000,
    image: "/jbl-headphones-black-wireless.jpg",
    category: "Electronics",
    stock: 25,
    status: "active",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Perfume Atomizer",
    price: 3500,
    image: "/perfume-atomizer-spray-bottle.jpg",
    category: "Beauty",
    stock: 50,
    status: "active",
    badge: "New",
  },
  {
    id: 3,
    name: "Steel Bathroom Rack",
    price: 6000,
    image: "/steel-bathroom-organizer-rack.jpg",
    category: "Home & Garden",
    stock: 15,
    status: "active",
    badge: "Popular",
  },
  {
    id: 4,
    name: "Collapsible Water Bottle",
    price: 4500,
    image: "/collapsible-silicone-water-bottle.jpg",
    category: "Kitchen",
    stock: 8,
    status: "low_stock",
    badge: "Eco-Friendly",
  },
  {
    id: 5,
    name: "Adjustable Phone Stand",
    price: 2500,
    image: "/adjustable-phone-stand-desk.jpg",
    category: "Electronics",
    stock: 0,
    status: "out_of_stock",
    badge: "Top Rated",
  },
]

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Electronics", "Beauty", "Home & Garden", "Kitchen"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    }
    if (status === "low_stock" || stock < 10) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Low Stock
        </Badge>
      )
    }
    return (
      <Badge variant="default" className="bg-green-100 text-green-800">
        In Stock
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600">Manage your product catalog and inventory</p>
        </div>
        <Link href="/admin/products/add">
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <p className="text-2xl font-bold">{products.filter((p) => p.status === "active").length}</p>
              </div>
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold">{products.filter((p) => p.stock < 10 && p.stock > 0).length}</p>
              </div>
              <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold">{products.filter((p) => p.stock === 0).length}</p>
              </div>
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          {product.badge && (
                            <Badge variant="outline" className="text-xs mt-1">
                              {product.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">₦{product.price.toLocaleString()}</p>
                        {product.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            ₦{product.originalPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${product.stock < 10 ? "text-red-600" : "text-gray-900"}`}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status, product.stock)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
