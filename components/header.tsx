"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onSearch?: (query: string) => void
}

export function Header({ onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim())
      } else {
        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-foreground">Feesah Collections</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              All Products
            </Link>
            <Link
              href="/products?category=electronics"
              className="text-foreground hover:text-primary transition-colors"
            >
              Electronics
            </Link>
            <Link href="/products?category=home" className="text-foreground hover:text-primary transition-colors">
              Home & Kitchen
            </Link>
            <Link href="/products?category=beauty" className="text-foreground hover:text-primary transition-colors">
              Beauty
            </Link>
            <Link
              href="/products?category=accessories"
              className="text-foreground hover:text-primary transition-colors"
            >
              Accessories
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 bg-input border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
                <Link href="/login">
                  <User className="w-5 h-5" />
                </Link>
              </Button>
            )}

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 bg-input border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <nav className="flex flex-col space-y-2">
                <Link href="/products" className="text-foreground hover:text-primary transition-colors py-2">
                  All Products
                </Link>
                <Link
                  href="/products?category=electronics"
                  className="text-foreground hover:text-primary transition-colors py-2"
                >
                  Electronics
                </Link>
                <Link
                  href="/products?category=home"
                  className="text-foreground hover:text-primary transition-colors py-2"
                >
                  Home & Kitchen
                </Link>
                <Link
                  href="/products?category=beauty"
                  className="text-foreground hover:text-primary transition-colors py-2"
                >
                  Beauty
                </Link>
                <Link
                  href="/products?category=accessories"
                  className="text-foreground hover:text-primary transition-colors py-2"
                >
                  Accessories
                </Link>
              </nav>
              {user ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-border">
                  <Link href="/profile" className="text-foreground hover:text-primary transition-colors py-2">
                    Profile
                  </Link>
                  <Link href="/orders" className="text-foreground hover:text-primary transition-colors py-2">
                    My Orders
                  </Link>
                  <Button variant="outline" onClick={logout} className="justify-start bg-transparent">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="/login">
                    <User className="w-4 h-4 mr-2" />
                    Login / Register
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
