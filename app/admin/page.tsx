"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Eye } from "lucide-react"

export default function AdminDashboard() {
  // Mock data - replace with actual API calls
  const stats = [
    {
      title: "Total Products",
      value: "156",
      change: "+12%",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: "89",
      change: "+23%",
      icon: ShoppingCart,
      color: "text-green-600",
    },
    {
      title: "Total Customers",
      value: "234",
      change: "+8%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Revenue",
      value: "₦2,450,000",
      change: "+15%",
      icon: DollarSign,
      color: "text-amber-600",
    },
  ]

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", amount: "₦25,000", status: "Completed" },
    { id: "ORD-002", customer: "Jane Smith", amount: "₦18,500", status: "Processing" },
    { id: "ORD-003", customer: "Mike Johnson", amount: "₦32,000", status: "Shipped" },
    { id: "ORD-004", customer: "Sarah Wilson", amount: "₦15,750", status: "Pending" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome to Feesah Collections Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-amber-600" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2 text-amber-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-900">Add New Product</div>
                <div className="text-sm text-gray-600">Add a new item to your catalog</div>
              </button>
              <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-900">Process Orders</div>
                <div className="text-sm text-gray-600">Review and process pending orders</div>
              </button>
              <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-900">View Analytics</div>
                <div className="text-sm text-gray-600">Check sales and performance metrics</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
