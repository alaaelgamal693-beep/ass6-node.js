import { MongoClient } from "mongodb"

const client = new MongoClient("mongodb://127.0.0.1:27017")
let db

export async function connectDB() {
    await client.connect()
    db = client.db("libraryDB")
    console.log("Connected to MongoDB")
}

export function getDB() {
    return db
}