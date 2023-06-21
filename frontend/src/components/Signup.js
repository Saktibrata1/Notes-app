import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
      
    
    // Submit the form data to the server using an API call
    // You can use axios or fetch to send a POST request to your backend API
    // Upon successful form submission, navigate to the login page
    // You may need to handle validation and error scenarios as well
    try {
      // Send the form data to the server using an API call
      const response = await axios.post('http://localhost:3000/api/signup', formData);
      console.log('User registration successful:', response.data);
  
      // Navigate to the login page or perform any other necessary action
      navigate('/login');
    }catch (error) {
      console.log('Failed to register user:', error);
      // Handle any error scenarios, such as displaying an error message
    }
   
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mt-5">Sign Up to Notes-app</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>
                <FaUser className="mb-1" /> Name
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

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

            <Form.Group controlId="phone">
              <Form.Label>
                <FaPhone className="mb-1" /> Phone
              </Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
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

            <Form.Group controlId="confirmPassword">
              <Form.Label>
                <FaLock className="mb-1" /> Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" block>
              Sign Up
            </Button>

            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
