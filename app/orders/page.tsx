"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Eye } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

interface Order {
  id: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  total: number
  status: string
  createdAt: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("feesah_orders") || "[]")
    setOrders(storedOrders.reverse()) // Show newest first
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Please Log In</h1>
          <p className="text-muted-foreground mb-8">You need to be logged in to view your orders.</p>
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">My Orders</h1>
          <p className="text-lg text-muted-foreground">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">No Orders Yet</h2>
            <p className="text-lg text-muted-foreground mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Button asChild size="lg">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="bg-card border-border">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-green-100 text-green-800">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/order-confirmation/${order.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items Preview */}
                    <div className="space-y-2">
                      {order.items.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-sm text-muted-foreground">+{order.items.length - 2} more item(s)</p>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <span className="font-medium">Total</span>
                      <span className="text-lg font-bold text-primary">₦{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
