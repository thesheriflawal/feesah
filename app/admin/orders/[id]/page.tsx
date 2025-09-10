"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, User, MapPin, CreditCard } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  items: OrderItem[]
  total: number
  status: string
  createdAt: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  paymentMethod: string
  trackingNumber?: string
}

export default function OrderDetails() {
  const params = useParams()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    // Mock order data - in real app, fetch from API using params.id
    const mockOrder: Order = {
      id: params.id as string,
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "+234 801 234 5678",
      items: [
        {
          id: "1",
          name: "JBL Super Bass Headphone",
          price: 15000,
          quantity: 1,
          image: "/jbl-headphones-black-wireless.jpg",
        },
        { id: "2", name: "Perfume Atomizer", price: 3500, quantity: 2, image: "/perfume-atomizer-spray-bottle.jpg" },
      ],
      total: 22000,
      status: "processing",
      createdAt: "2024-01-15T10:30:00Z",
      shippingAddress: {
        street: "123 Main St",
        city: "Lagos",
        state: "Lagos",
        zipCode: "100001",
      },
      paymentMethod: "Bank Transfer",
      trackingNumber: "TRK123456789",
    }
    setOrder(mockOrder)
  }, [params.id])

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  const updateOrderStatus = (newStatus: string) => {
    setOrder((prev) => (prev ? { ...prev, status: newStatus } : null))
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      completed: "bg-green-100 text-green-800",
    }
    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || statusColors.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
          <p className="text-gray-600">Order #{order.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Unit Price: ₦{item.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>₦{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Info Sidebar */}
        <div className="space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Current Status:</span>
                {getStatusBadge(order.status)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              {order.trackingNumber && (
                <div>
                  <span className="text-sm font-medium text-gray-700">Tracking Number:</span>
                  <p className="text-sm text-gray-900">{order.trackingNumber}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Name:</span>
                <p className="text-sm text-gray-900">{order.customerName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Email:</span>
                <p className="text-sm text-gray-900">{order.customerEmail}</p>
              </div>
              {order.customerPhone && (
                <div>
                  <span className="text-sm font-medium text-gray-700">Phone:</span>
                  <p className="text-sm text-gray-900">{order.customerPhone}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-900">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
                <p>{order.shippingAddress.zipCode}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-700">Payment Method:</span>
                  <p className="text-sm text-gray-900">{order.paymentMethod}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Order Date:</span>
                  <p className="text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
