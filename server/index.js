import express from "express"
import notesRoutes from "./routes/notesRoutes.js"

// initalize express
const app = express()

app.use("/api/notes", notesRoutes)

app.listen(5001, () => {
    console.log("Server started on PORT: 5001")
})