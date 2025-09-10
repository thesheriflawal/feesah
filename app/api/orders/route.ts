import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    const { db } = await connectToDatabase()
    const ordersCollection = db.collection("orders")

    // Build query
    const query: any = {}

    if (userId) {
      query.userId = userId
    }

    if (status) {
      query.status = status
    }

    const orders = await ordersCollection.find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      orders: orders.map((order) => ({
        id: order._id,
        ...order,
      })),
    })
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const { db } = await connectToDatabase()
    const ordersCollection = db.collection("orders")

    const newOrder = {
      ...orderData,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await ordersCollection.insertOne(newOrder)

    return NextResponse.json({
      success: true,
      order: {
        id: result.insertedId,
        ...newOrder,
      },
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
