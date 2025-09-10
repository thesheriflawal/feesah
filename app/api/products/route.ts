import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

    const { db } = await connectToDatabase()
    const productsCollection = db.collection("products")

    // Build query
    const query: any = {}

    if (category) {
      query.category = category
    }

    if (search) {
      query.name = { $regex: search, $options: "i" }
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number.parseInt(minPrice)
      if (maxPrice) query.price.$lte = Number.parseInt(maxPrice)
    }

    const products = await productsCollection.find(query).toArray()

    return NextResponse.json({
      success: true,
      products: products.map((product) => ({
        id: product._id,
        ...product,
      })),
    })
  } catch (error) {
    console.error("Products fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()

    const { db } = await connectToDatabase()
    const productsCollection = db.collection("products")

    const newProduct = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await productsCollection.insertOne(newProduct)

    return NextResponse.json({
      success: true,
      product: {
        id: result.insertedId,
        ...newProduct,
      },
    })
  } catch (error) {
    console.error("Product creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
