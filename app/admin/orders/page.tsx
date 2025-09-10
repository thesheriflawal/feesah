"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Package, Clock, CheckCircle, Truck } from "lucide-react"
import Link from "next/link"

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
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    // Mock orders data - in real app, fetch from API
    const mockOrders: Order[] = [
      {
        id: "ORD-001",
        customerName: "John Doe",
        customerEmail: "john@example.com",
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
        status: "completed",
        createdAt: "2024-01-15T10:30:00Z",
        shippingAddress: {
          street: "123 Main St",
          city: "Lagos",
          state: "Lagos",
          zipCode: "100001",
        },
      },
      {
        id: "ORD-002",
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        items: [
          {
            id: "3",
            name: "Steel Bathroom Rack",
            price: 6000,
            quantity: 1,
            image: "/steel-bathroom-organizer-rack.jpg",
          },
        ],
        total: 6000,
        status: "processing",
        createdAt: "2024-01-14T14:20:00Z",
        shippingAddress: {
          street: "456 Oak Ave",
          city: "Abuja",
          state: "FCT",
          zipCode: "900001",
        },
      },
      {
        id: "ORD-003",
        customerName: "Mike Johnson",
        customerEmail: "mike@example.com",
        items: [
          {
            id: "4",
            name: "Collapsible Water Bottle",
            price: 4500,
            quantity: 3,
            image: "/collapsible-silicone-water-bottle.jpg",
          },
          {
            id: "5",
            name: "Adjustable Phone Stand",
            price: 2500,
            quantity: 1,
            image: "/adjustable-phone-stand-desk.jpg",
          },
        ],
        total: 16000,
        status: "shipped",
        createdAt: "2024-01-13T09:15:00Z",
        shippingAddress: {
          street: "789 Pine Rd",
          city: "Port Harcourt",
          state: "Rivers",
          zipCode: "500001",
        },
      },
      {
        id: "ORD-004",
        customerName: "Sarah Wilson",
        customerEmail: "sarah@example.com",
        items: [{ id: "6", name: "LED Cube Light", price: 5800, quantity: 1, image: "/led-cube-light-colorful.jpg" }],
        total: 5800,
        status: "pending",
        createdAt: "2024-01-12T16:45:00Z",
        shippingAddress: {
          street: "321 Elm St",
          city: "Kano",
          state: "Kano",
          zipCode: "700001",
        },
      },
    ]
    setOrders(mockOrders)
  }, [])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      processing: { color: "bg-blue-100 text-blue-800", icon: Package },
      shipped: { color: "bg-purple-100 text-purple-800", icon: Truck },
      completed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon

    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    completed: orders.filter((o) => o.status === "completed").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <p className="text-gray-600">Manage and track customer orders</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{orderStats.processing}</p>
              <p className="text-sm text-gray-600">Processing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{orderStats.shipped}</p>
              <p className="text-sm text-gray-600">Shipped</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{orderStats.completed}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item, index) => (
                            <img
                              key={index}
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-8 h-8 rounded-full border-2 border-white object-cover"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">₦{order.total.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/orders/${order.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                        </select>
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
