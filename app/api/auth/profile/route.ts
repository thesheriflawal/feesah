import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/database"
import { ObjectId } from "mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "feesah-secret-key-2024"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Authorization token required" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any

      // Handle admin user
      if (decoded.userId === "admin-001") {
        return NextResponse.json({
          success: true,
          user: {
            id: "admin-001",
            email: "feesahcollections@gmail.com",
            name: "Nafisat Alamu",
            role: "admin",
          },
        })
      }

      // Connect to database for regular users
      const { db } = await connectToDatabase()
      const usersCollection = db.collection("users")

      const user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) })
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user

      return NextResponse.json({
        success: true,
        user: {
          id: user._id,
          ...userWithoutPassword,
        },
      })
    } catch (jwtError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    console.error("Profile error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
