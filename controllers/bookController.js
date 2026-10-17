import { getDB } from "../config/db.js"
import { ObjectId } from "mongodb";

export const insertBook = async (req, res) => {
    try {
        const result = await getDB().collection("books").insertOne(req.body)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}




//===========================
export const insertManyBooks = async (req, res) => {
    try {
        const result = await getDB().collection("books").insertMany(req.body)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}



//===========================
export const insertLog = async (req, res) => {
    try {
        const result = await getDB().collection("logs").insertOne(req.body)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}




//===========================
export const updateBookYear = async (req, res) => {
    try {
        const result = await getDB().collection("books").updateOne(
        { title: req.params.title },
        { $set: { year: 2022 } }
        )
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}




//===========================
export const findBookByTitle = async (req, res) => {
    try {
        const book = await getDB().collection("books").findOne({ title: req.query.title })
        res.json(book)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}



//============================
export const findBooksByYearRange = async (req, res) => {
    try {
        const from = parseInt(req.query.from)
        const to = parseInt(req.query.to)
        const books = await getDB()
        .collection("books")
        .find({ year: { $gte: from, $lte: to } })
        .toArray()
        res.json(books)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}




//============================
export const findBooksByGenre = async (req, res) => {
    try {
        const books = await getDB()
        .collection("books")
        .find({ genres: req.query.genre })
        .toArray()
        res.json(books)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}



//============================
export const findBooksSkipLimit = async (req, res) => {
    try {
        const books = await getDB()
        .collection("books")
        .find({})
        .sort({ year: -1 })
        .skip(2)
        .limit(3)
        .toArray()
        res.json(books)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}






//============================
export const findBooksYearInteger = async (req, res) => {
    try {
        const books = await getDB()
        .collection("books")
        .find({ year: { $type: "int" } })
        .toArray()
        res.json(books)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}





//===========================
export const findBooksExcludeGenres = async (req, res) => {
    try {
        const books = await getDB()
        .collection("books")
        .find({ genres: { $nin: ["Horror", "Science Fiction"] } })
        .toArray()
        res.json(books)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}



//============================
export const deleteBooksBeforeYear = async (req, res) => {
    try {
        const year = parseInt(req.query.year)
        const result = await getDB().collection("books").deleteMany({ year: { $lt: year } })
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}




//===========================
export const aggregateBooksAfter2000 = async (req, res) => {
    try {
        const books = await getDB()
        .collection("books")
        .aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $sort: { year: -1 } },
            { $project: { _id: 0, title: 1, author: 1, year: 1, genres: 1 } },
        ])
        .toArray()
        res.json(books)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}




//==========================
export const aggregateBooksTitleAuthorYear = async (req, res) => {
    try {
        const books = await getDB()
        .collection("books")
        .aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $project: { _id: 0, title: 1, author: 1, year: 1 } },
        ])
        .toArray()
        res.json(books)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}




//===========================
export const aggregateUnwindGenres = async (req, res) => {
    try {
        const books = await getDB()
        .collection("books")
        .aggregate([
            { $match: { title: "The Hobbit" } },
            { $unwind: "$genres" },
            { $project: { _id: 0, title: 1, genres: 1 } },
        ])
        .toArray()
        res.json(books)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}




//==========================
export const aggregateJoinBooksLogs = async (req, res) => {
    try {
        const logs = await getDB()
        .collection("logs")
        .aggregate([
            { $addFields: { bookObjectId: { $toObjectId: "$book_id" } } },
            {
            $lookup: {
                from: "books",
                localField: "bookObjectId",
                foreignField: "_id",
                as: "book_details",
            },
            },
            {
            $project: {
                _id: 0,
                action: 1,
                "book_details.title": 1,
                "book_details.author": 1,
                "book_details.year": 1,
            },
            },
        ])
        .toArray();
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};