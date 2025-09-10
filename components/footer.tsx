import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse-glow">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold">Feesah Collections</span>
            </div>
            <p className="text-background/80 mb-4">
              Your trusted source for quality electronics, home essentials, beauty products, and accessories.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/feesah"
                className="text-background/60 hover:text-primary transition-colors hover-lift"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/feesah_store_"
                className="text-background/60 hover:text-primary transition-colors hover-lift"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/feesah_store_"
                className="text-background/60 hover:text-primary transition-colors hover-lift"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-background/80 hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-background/80 hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-background/80 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/80 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-background/80 hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-background/80 hover:text-primary transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-background/80 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-background/80 hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <a
                  href="https://wa.me/2349120902332"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  +234 912 090 2332
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <a
                  href="mailto:feesahcollections@gmail.com"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  feesahcollections@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span className="text-background/80">Ile-Ife, Osun State, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-t border-background/20 mt-8 pt-8 text-center animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-background/60">© 2025 Feesah Collections. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
