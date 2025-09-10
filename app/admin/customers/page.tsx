"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Users, ShoppingBag, DollarSign } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
  status: "active" | "inactive"
  joinDate: string
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    // Mock customer data - in real app, fetch from API
    const mockCustomers: Customer[] = [
      {
        id: "CUST-001",
        name: "John Doe",
        email: "john@example.com",
        phone: "+234 801 234 5678",
        totalOrders: 5,
        totalSpent: 125000,
        lastOrderDate: "2024-01-15T10:30:00Z",
        status: "active",
        joinDate: "2023-12-01T00:00:00Z",
      },
      {
        id: "CUST-002",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+234 802 345 6789",
        totalOrders: 3,
        totalSpent: 78000,
        lastOrderDate: "2024-01-14T14:20:00Z",
        status: "active",
        joinDate: "2023-11-15T00:00:00Z",
      },
      {
        id: "CUST-003",
        name: "Mike Johnson",
        email: "mike@example.com",
        totalOrders: 8,
        totalSpent: 245000,
        lastOrderDate: "2024-01-13T09:15:00Z",
        status: "active",
        joinDate: "2023-10-20T00:00:00Z",
      },
      {
        id: "CUST-004",
        name: "Sarah Wilson",
        email: "sarah@example.com",
        phone: "+234 803 456 7890",
        totalOrders: 1,
        totalSpent: 15000,
        lastOrderDate: "2023-12-20T16:45:00Z",
        status: "inactive",
        joinDate: "2023-12-15T00:00:00Z",
      },
      {
        id: "CUST-005",
        name: "David Brown",
        email: "david@example.com",
        totalOrders: 12,
        totalSpent: 380000,
        lastOrderDate: "2024-01-10T11:30:00Z",
        status: "active",
        joinDate: "2023-09-05T00:00:00Z",
      },
    ]
    setCustomers(mockCustomers)
  }, [])

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const customerStats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    inactive: customers.filter((c) => c.status === "inactive").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue:
      customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalOrders, 0) || 0,
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
        <p className="text-gray-600">Manage and view customer information</p>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold">{customerStats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-green-600">{customerStats.active}</p>
              </div>
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">₦{customerStats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold">₦{Math.round(customerStats.avgOrderValue).toLocaleString()}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search customers..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{customer.email}</p>
                        {customer.phone && <p className="text-sm text-gray-500">{customer.phone}</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{customer.totalOrders}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">₦{customer.totalSpent.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>{new Date(customer.lastOrderDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          customer.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
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
