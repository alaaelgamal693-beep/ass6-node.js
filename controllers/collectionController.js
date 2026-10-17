import { getDB } from "../config/db.js"

export const createBooksCollection = async (req, res) => {
    try {
        await getDB().createCollection("books", {
        validator: {
            $jsonSchema: {
            bsonType: "object",
            required: ["title"],
            properties: {
                title: {
                bsonType: "string",
                minLength: 1,
                description: "title is required and must be a non-empty string",
                },
            },
            },
        },
        })
        res.json({ ok: 1 })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


//=======================
export const createAuthorsCollection = async (req, res) => {
    try {
        const result = await getDB().collection("authors").insertOne({
        name: "Author1",
        nationality: "British",
        })
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}



//=======================
export const createLogsCapped = async (req, res) => {
    try {
        await getDB().createCollection("logs", {
        capped: true,
        size: 1048576, 
        })
        res.json({ ok: 1 })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}



//=======================
export const createTitleIndex = async (req, res) => {
    try {
        const indexName = await getDB().collection("books").createIndex({ title: 1 })
        res.json(indexName)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}






