// Database schema creation and seeding script for Feesah Collections
const { MongoClient } = require("mongodb")

const MONGO_URI =
  "mongodb+srv://feesahAdmin:$J4$wXTgb.ZZ#@cluster0.vbbyjvp.mongodb.net/feesahShop?retryWrites=true&w=majority&appName=Cluster0"

async function createDatabaseSchema() {
  const client = new MongoClient(MONGO_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB Atlas")

    const db = client.db("feesahShop")

    // Create collections with validation schemas

    // Users collection
    await db.createCollection("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "email", "password", "role"],
          properties: {
            name: { bsonType: "string" },
            email: { bsonType: "string" },
            password: { bsonType: "string" },
            role: { enum: ["user", "admin"] },
            phone: { bsonType: "string" },
            address: {
              bsonType: "object",
              properties: {
                street: { bsonType: "string" },
                city: { bsonType: "string" },
                state: { bsonType: "string" },
                zipCode: { bsonType: "string" },
              },
            },
            createdAt: { bsonType: "date" },
            updatedAt: { bsonType: "date" },
          },
        },
      },
    })

    // Products collection
    await db.createCollection("products", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "price", "category", "stock"],
          properties: {
            name: { bsonType: "string" },
            description: { bsonType: "string" },
            price: { bsonType: "number", minimum: 0 },
            originalPrice: { bsonType: "number", minimum: 0 },
            category: { bsonType: "string" },
            stock: { bsonType: "number", minimum: 0 },
            images: { bsonType: "array", items: { bsonType: "string" } },
            badge: { bsonType: "string" },
            status: { enum: ["active", "inactive", "out_of_stock"] },
            rating: { bsonType: "number", minimum: 0, maximum: 5 },
            reviews: { bsonType: "number", minimum: 0 },
            createdAt: { bsonType: "date" },
            updatedAt: { bsonType: "date" },
          },
        },
      },
    })

    // Orders collection
    await db.createCollection("orders", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "items", "total", "status"],
          properties: {
            userId: { bsonType: "objectId" },
            items: {
              bsonType: "array",
              items: {
                bsonType: "object",
                required: ["productId", "name", "price", "quantity"],
                properties: {
                  productId: { bsonType: "objectId" },
                  name: { bsonType: "string" },
                  price: { bsonType: "number" },
                  quantity: { bsonType: "number", minimum: 1 },
                  image: { bsonType: "string" },
                },
              },
            },
            total: { bsonType: "number", minimum: 0 },
            status: { enum: ["pending", "processing", "shipped", "completed", "cancelled"] },
            shippingAddress: {
              bsonType: "object",
              properties: {
                street: { bsonType: "string" },
                city: { bsonType: "string" },
                state: { bsonType: "string" },
                zipCode: { bsonType: "string" },
              },
            },
            paymentMethod: { bsonType: "string" },
            trackingNumber: { bsonType: "string" },
            createdAt: { bsonType: "date" },
            updatedAt: { bsonType: "date" },
          },
        },
      },
    })

    // Create indexes for better performance
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("products").createIndex({ category: 1 })
    await db.collection("products").createIndex({ name: "text", description: "text" })
    await db.collection("orders").createIndex({ userId: 1 })
    await db.collection("orders").createIndex({ status: 1 })

    console.log("Database schema created successfully")
  } catch (error) {
    console.error("Error creating database schema:", error)
  } finally {
    await client.close()
  }
}

createDatabaseSchema()
