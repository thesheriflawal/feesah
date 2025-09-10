// Database connection utility for MongoDB
import { MongoClient } from "mongodb"

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://feesahAdmin:$J4$wXTgb.ZZ#@cluster0.vbbyjvp.mongodb.net/feesahShop?retryWrites=true&w=majority&appName=Cluster0"

let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = new MongoClient(MONGO_URI)
    await client.connect()
    const db = client.db("feesahShop")

    cachedClient = client
    cachedDb = db

    console.log("Connected to MongoDB Atlas")
    return { client, db }
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}
