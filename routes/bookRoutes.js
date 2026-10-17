import express from "express"
import { insertBook,
    insertManyBooks, 
    insertLog, updateBookYear, 
    findBookByTitle, 
    findBooksByYearRange, 
    findBooksByGenre, 
    findBooksSkipLimit, 
    findBooksYearInteger,
    findBooksExcludeGenres,
    deleteBooksBeforeYear,
    aggregateBooksAfter2000,
    aggregateBooksTitleAuthorYear,
    aggregateUnwindGenres,
    aggregateJoinBooksLogs } from "../controllers/bookController.js"


const router = express.Router()

router.post("/books", insertBook)
router.post("/books/batch", insertManyBooks)
router.post("/logs", insertLog)
router.patch("/books/:title", updateBookYear)
router.get("/books/title", findBookByTitle)
router.get("/books/year", findBooksByYearRange)
router.get("/books/genre", findBooksByGenre)
router.get("/books/skip-limit", findBooksSkipLimit)
router.get("/books/year-integer", findBooksYearInteger)
router.get("/books/exclude-genres", findBooksExcludeGenres)
router.delete("/books/before-year", deleteBooksBeforeYear)
router.get("/books/aggregate1", aggregateBooksAfter2000)
router.get("/books/aggregate2", aggregateBooksTitleAuthorYear)
router.get("/books/aggregate3", aggregateUnwindGenres)
router.get("/books/aggregate4", aggregateJoinBooksLogs)

export default router