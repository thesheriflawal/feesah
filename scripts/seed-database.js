// Seed database with initial data for Feesah Collections
const { MongoClient, ObjectId } = require("mongodb")
const bcrypt = require("bcryptjs")

const MONGO_URI =
  "mongodb+srv://feesahAdmin:$J4$wXTgb.ZZ#@cluster0.vbbyjvp.mongodb.net/feesahShop?retryWrites=true&w=majority&appName=Cluster0"

async function seedDatabase() {
  const client = new MongoClient(MONGO_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB Atlas for seeding")

    const db = client.db("feesahShop")

    // Clear existing data
    await db.collection("users").deleteMany({})
    await db.collection("products").deleteMany({})
    await db.collection("orders").deleteMany({})

    // Seed admin user
    const adminPassword = await bcrypt.hash("admin123", 10)
    const adminUser = {
      name: "Feesah Admin",
      email: "admin@feesah.com",
      password: adminPassword,
      role: "admin",
      phone: "+234 912 090 2332",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const adminResult = await db.collection("users").insertOne(adminUser)
    console.log("Admin user created:", adminResult.insertedId)

    // Seed test users
    const testPassword = await bcrypt.hash("password123", 10)
    const testUsers = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: testPassword,
        role: "user",
        phone: "+234 801 234 5678",
        address: {
          street: "123 Main St",
          city: "Lagos",
          state: "Lagos",
          zipCode: "100001",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: testPassword,
        role: "user",
        phone: "+234 802 345 6789",
        address: {
          street: "456 Oak Ave",
          city: "Abuja",
          state: "FCT",
          zipCode: "900001",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const usersResult = await db.collection("users").insertMany(testUsers)
    console.log("Test users created:", usersResult.insertedIds)

    // Seed products based on catalog images
    const products = [
      {
        name: "JBL Super Bass Headphone",
        description: "High-quality wireless headphones with superior bass and crystal clear sound quality.",
        price: 15000,
        originalPrice: 18000,
        category: "Electronics",
        stock: 25,
        images: ["/jbl-headphones-black-wireless.jpg"],
        badge: "Best Seller",
        status: "active",
        rating: 4.5,
        reviews: 24,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Perfume Atomizer",
        description: "Portable perfume atomizer spray bottle, perfect for travel and daily use.",
        price: 3500,
        category: "Beauty",
        stock: 50,
        images: ["/perfume-atomizer-spray-bottle.jpg"],
        badge: "New",
        status: "active",
        rating: 4.3,
        reviews: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Steel Bathroom Rack",
        description: "Durable steel bathroom organizer rack with multiple shelves for storage.",
        price: 6000,
        category: "Home & Garden",
        stock: 15,
        images: ["/steel-bathroom-organizer-rack.jpg"],
        badge: "Popular",
        status: "active",
        rating: 4.7,
        reviews: 31,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Collapsible Water Bottle",
        description: "Eco-friendly collapsible silicone water bottle, space-saving and reusable.",
        price: 4500,
        category: "Kitchen",
        stock: 8,
        images: ["/collapsible-silicone-water-bottle.jpg"],
        badge: "Eco-Friendly",
        status: "low_stock",
        rating: 4.4,
        reviews: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Adjustable Phone Stand",
        description: "Universal adjustable phone stand for desk, compatible with all smartphone sizes.",
        price: 2500,
        category: "Electronics",
        stock: 0,
        images: ["/adjustable-phone-stand-desk.jpg"],
        badge: "Top Rated",
        status: "out_of_stock",
        rating: 4.6,
        reviews: 42,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "LED Cube Light",
        description: "Colorful LED cube light with multiple color modes and remote control.",
        price: 5800,
        category: "Electronics",
        stock: 20,
        images: ["/led-cube-light-colorful.jpg"],
        badge: "Trending",
        status: "active",
        rating: 4.2,
        reviews: 28,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const productsResult = await db.collection("products").insertMany(products)
    console.log("Products created:", productsResult.insertedIds)

    // Seed sample orders
    const sampleOrders = [
      {
        userId: usersResult.insertedIds[0],
        items: [
          {
            productId: productsResult.insertedIds[0],
            name: "JBL Super Bass Headphone",
            price: 15000,
            quantity: 1,
            image: "/jbl-headphones-black-wireless.jpg",
          },
          {
            productId: productsResult.insertedIds[1],
            name: "Perfume Atomizer",
            price: 3500,
            quantity: 2,
            image: "/perfume-atomizer-spray-bottle.jpg",
          },
        ],
        total: 22000,
        status: "completed",
        shippingAddress: {
          street: "123 Main St",
          city: "Lagos",
          state: "Lagos",
          zipCode: "100001",
        },
        paymentMethod: "Bank Transfer",
        trackingNumber: "TRK123456789",
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-15T10:30:00Z"),
      },
      {
        userId: usersResult.insertedIds[1],
        items: [
          {
            productId: productsResult.insertedIds[2],
            name: "Steel Bathroom Rack",
            price: 6000,
            quantity: 1,
            image: "/steel-bathroom-organizer-rack.jpg",
          },
        ],
        total: 6000,
        status: "processing",
        shippingAddress: {
          street: "456 Oak Ave",
          city: "Abuja",
          state: "FCT",
          zipCode: "900001",
        },
        paymentMethod: "Card Payment",
        createdAt: new Date("2024-01-14T14:20:00Z"),
        updatedAt: new Date("2024-01-14T14:20:00Z"),
      },
    ]

    const ordersResult = await db.collection("orders").insertMany(sampleOrders)
    console.log("Sample orders created:", ordersResult.insertedIds)

    console.log("Database seeded successfully!")
    console.log("Admin credentials: admin@feesah.com / admin123")
    console.log("Test user credentials: john@example.com / password123")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
