const Note = require('../models/NotesModel');

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

// Create or update a note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const noteId = req.params.noteId;

    if (noteId) {
      // Update existing note
      const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { title, content },
        { new: true }
      );
      res.json(updatedNote);
    } else {
      // Create new note
      const newNote = new Note({
        title,
        content,
      });
      const savedNote = await newNote.save();
      res.status(201).json(savedNote);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create or update note' });
  }
};



// Update a note
const updateNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    await Note.findByIdAndDelete(noteId);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote
};
