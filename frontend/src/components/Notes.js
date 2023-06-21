import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Notes.css';

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [editNoteId, setEditNoteId] = useState('');

  useEffect(() => {
    // Fetch notes from the server using an API call
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.log('Failed to fetch notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ title: '', content: '' });
  };

  const handleOpenModal = (noteId) => {
    if (!noteId) {
      // Add new note
      setFormData({
        title: '',
        content: '',
      });
      setEditNoteId('');
    } else {
      // Edit existing note
      const noteToEdit = notes.find((note) => note._id === noteId);
      if (noteToEdit) {
        setFormData({
          title: noteToEdit.title,
          content: noteToEdit.content,
        });
      }
      setEditNoteId(noteId);
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editNoteId) {
        // If editNoteId exists, update the existing note
        await handleUpdateNote();
      } else {
        // If editNoteId does not exist, create a new note
        await handleCreateNote();
      }

      setEditNoteId('');
    } catch (error) {
      console.log('Failed to save note:', error);
    }
  };

  const handleUpdateNote = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/notes/${editNoteId}`,
        formData
      );
      const updatedNotes = notes.map((note) => {
        if (note._id === editNoteId) {
          return { ...note, ...formData };
        }
        return note;
      });
      setNotes(updatedNotes);
      handleCloseModal();
    } catch (error) {
      console.log('Failed to update note:', error);
    }
  };

  const handleCreateNote = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/notes',
        formData
      );
      const newNote = response.data;
      setNotes([...notes, newNote]);
      handleCloseModal();
    } catch (error) {
      console.log('Failed to create note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${noteId}`);
      const updatedNotes = notes.filter((note) => note._id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.log('Failed to delete note:', error);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div className="notes-header">
            <h2>My Notes</h2>
            <Button variant="primary" onClick={() => handleOpenModal()}>
              Add Note
            </Button>
            <FaSignOutAlt className="logout-icon" onClick={handleLogout} />
          </div>
          <div className="notes-list">
            {notes.length > 0 ? (
              notes.map((note) => (
                <div className="note-item" key={note._id}>
                  <h4>{note.title}</h4>
                  <p>{note.content}</p>
                  <div className="note-actions">
                    <FaEdit
                      className="edit-icon"
                      onClick={() => handleOpenModal(note._id)}
                    />
                    <FaTrash
                      className="delete-icon"
                      onClick={() => handleDeleteNote(note._id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No notes available.</p>
            )}
          </div>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editNoteId ? 'Edit Note' : 'Add Note'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter note title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                rows={4}
                placeholder="Enter note content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              {editNoteId ? 'Update Note' : 'Save Note'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Notes;
