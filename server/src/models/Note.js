import mongoose from "mongoose";

// note schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// note model
const Note = mongoose.model("Note", noteSchema);

export default Note;
