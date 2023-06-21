import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';

import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the form data to the server for authentication
   
    try {
      // Send the form data to the server using an API call
      const response = await axios.post('http://localhost:3000/api/login', formData);
      console.log('Login successful:', response.data);

      // Redirect to the Notes page upon successful login
      navigate('/notes');
    } catch (error) {
      console.log('Failed to login:', error);
      // Handle any error scenarios, such as displaying an error message
    }
  };

  // ...


  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mt-5">Sign In to your Notes-app account</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>
                <FaEnvelope className="mb-1" /> Email
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>
                <FaLock className="mb-1" /> Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" block>
              Sign In
            </Button>

            <p className="text-center mt-3">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
