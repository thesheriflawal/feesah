import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/database"

const JWT_SECRET = process.env.JWT_SECRET || "feesah-secret-key-2024"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, whatsapp } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Name, email, and password are required" }, { status: 400 })
    }

    // Connect to database
    const { db } = await connectToDatabase()
    const usersCollection = db.collection("users")

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      whatsapp: whatsapp || "",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await usersCollection.insertOne(newUser)

    // Generate JWT token
    const token = jwt.sign({ userId: result.insertedId, email, role: "user" }, JWT_SECRET, { expiresIn: "7d" })

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: result.insertedId,
        ...userWithoutPassword,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
