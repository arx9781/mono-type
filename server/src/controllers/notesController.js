// get request to fetch notes
export const getAllNotes = (req, res) => {
  res.status(200).send("+ Notes");
};

// post request to create notes
export const createNote = (req, res) => {
  res.status(201).json({ message: "Note created successfully!" });
};

// put request to upadte notes
export const updateNote = (req, res) => {
  res.status(200).json({ message: "Note updated successfully!" });
};

// delete request to delete notes
export const deleteNote = (req, res) => {
  res.status(200).json({ message: "Note deleted successfully!" });
};
