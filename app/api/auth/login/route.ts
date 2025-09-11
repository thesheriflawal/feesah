import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/database";

const JWT_SECRET = process.env.JWT_SECRET || "feesah-secret-key-2024";

export async function POST(request: NextRequest) {
  try {
    // Log environment variables (remove in production)
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

    const body = await request.json();
    console.log("Request body received:", {
      email: body.email,
      hasPassword: !!body.password,
    });

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check for admin credentials
    if (email === "feesahcollections@gmail.com" && password === "feesah2024") {
      console.log("Admin login attempt");

      const adminUser = {
        id: "admin-001",
        email: "feesahcollections@gmail.com",
        name: "Nafisat Alamu",
        role: "admin",
      };

      const token = jwt.sign(
        {
          userId: adminUser.id,
          email: adminUser.email,
          role: adminUser.role,
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      console.log("Admin login successful");
      return NextResponse.json({
        success: true,
        token,
        user: adminUser,
      });
    }

    console.log("Attempting regular user login");

    // Connect to database for regular users
    let db;
    try {
      const connection = await connectToDatabase();
      db = connection.db;
      console.log("Database connection successful");
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    const usersCollection = db.collection("users");

    // Find user by email
    const user = await usersCollection.findOne({ email });
    console.log("User found:", !!user);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role || "user",
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    console.log("Regular user login successful");
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        ...userWithoutPassword,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
