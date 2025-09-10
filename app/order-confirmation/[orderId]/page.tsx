"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Truck, Phone, Mail } from "lucide-react"
import Link from "next/link"

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
  shippingInfo: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
  }
  paymentMethod: string
  status: string
  createdAt: string
}

export default function OrderConfirmationPage() {
  const params = useParams()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("feesah_orders") || "[]")
    const foundOrder = orders.find((o: Order) => o.id === params.orderId)
    setOrder(foundOrder || null)
  }, [params.orderId])

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-8">The order you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
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
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Order Number:</span>
                    <span className="font-mono text-primary">#{order.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Order Date:</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Status:</span>
                    <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Payment Method:</span>
                    <span className="capitalize">{order.paymentMethod.replace("_", " ")}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-medium">{order.shippingInfo.fullName}</p>
                    <p>{order.shippingInfo.address}</p>
                    <p>
                      {order.shippingInfo.city}, {order.shippingInfo.state}
                    </p>
                    <p className="text-muted-foreground">{order.shippingInfo.phone}</p>
                    <p className="text-muted-foreground">{order.shippingInfo.email}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Items Ordered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">₦{item.price.toLocaleString()} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary & Actions */}
            <div className="lg:col-span-1 space-y-6">
              {/* Order Total */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{order.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">₦{order.total.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    We'll process your order and send you tracking information once it ships.
                  </p>
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link href="/orders">View All Orders</Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full bg-transparent">
                      <Link href="/products">Continue Shopping</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <a href="https://wa.me/2349120902332" className="text-sm text-primary hover:underline">
                      +234 912 090 2332
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <a href="mailto:feesahcollections@gmail.com" className="text-sm text-primary hover:underline">
                      feesahcollections@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
