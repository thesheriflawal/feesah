import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/database"

const JWT_SECRET = process.env.JWT_SECRET || "feesah-secret-key-2024"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Check for admin credentials
    if (email === "feesahcollections@gmail.com" && password === "feesah2024") {
      const adminUser = {
        id: "admin-001",
        email: "feesahcollections@gmail.com",
        name: "Nafisat Alamu",
        role: "admin",
      }

      const token = jwt.sign({ userId: adminUser.id, email: adminUser.email, role: adminUser.role }, JWT_SECRET, {
        expiresIn: "7d",
      })

      return NextResponse.json({
        success: true,
        token,
        user: adminUser,
      })
    }

    // Connect to database for regular users
    const { db } = await connectToDatabase()
    const usersCollection = db.collection("users")

    // Find user by email
    const user = await usersCollection.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role || "user" }, JWT_SECRET, {
      expiresIn: "7d",
    })

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        ...userWithoutPassword,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
