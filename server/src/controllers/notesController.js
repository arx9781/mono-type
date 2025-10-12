import Note from "../models/Note.js";

// get request to fetch notes
export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // show newest note first
    res.status(200).json({
      success: true,
      message:
        notes.length > 0
          ? `Successfully retrieved ${notes.length} note(s)`
          : "No notes found",
      data: notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve notes. Please try again later.",
    });
  }
};

// get a specific note
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: `Note with ID '${req.params.id}' not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to retrieve note. Please try again later.",
    });
  }
};

// post request to create notes
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Both title and content are required to create a note",
      });
    }

    const note = new Note({ title, content });
    const savedNote = await note.save();

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: savedNote,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message:
          "Validation error: " +
          Object.values(error.errors)
            .map((e) => e.message)
            .join(", "),
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create note. Please try again later.",
    });
  }
};

// put request to update notes
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Both title and content are required to update a note",
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: `Note with ID '${req.params.id}' not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
      });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message:
          "Validation error: " +
          Object.values(error.errors)
            .map((e) => e.message)
            .join(", "),
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update note. Please try again later.",
    });
  }
};

// delete request to delete notes
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: `Note with ID '${req.params.id}' not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: { deletedNoteId: req.params.id },
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to delete note. Please try again later.",
    });
  }
};
