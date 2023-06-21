// noteController.js

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

// Create a new note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
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


exports.getAllNotes = getAllNotes;
exports.createNote = createNote;
exports.deleteNote= deleteNote;