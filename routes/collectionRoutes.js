import express from "express";
import {
    createBooksCollection,
    createAuthorsCollection,
    createLogsCapped, 
    createTitleIndex,
} from "../controllers/collectionController.js";

const router = express.Router();

router.post("/collection/books", createBooksCollection);
router.post("/collection/authors", createAuthorsCollection);
router.post("/collection/logs/capped", createLogsCapped);
router.post("/collection/books/index", createTitleIndex);

export default router;