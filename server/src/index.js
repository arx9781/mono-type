import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"

dotenv.config()

// initalize express
const app = express();

connectDB();

// create route
app.use("/api/notes", notesRoutes);

app.listen(5001, () => {
  console.log("Server started on PORT: 5001");
});
