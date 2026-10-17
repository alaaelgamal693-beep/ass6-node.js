import express from "express";
import { connectDB } from "./config/db.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
app.use(express.json());
app.use(collectionRoutes);
app.use(bookRoutes);

connectDB().then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
});