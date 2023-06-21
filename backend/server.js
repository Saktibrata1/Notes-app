const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the 'cors' package
const bcrypt = require('bcrypt');

const User = require('./models/UserModel'); // Import the User model
const noteRoutes = require("./routes/notesRoutes");

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Notesapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB:', error);
  });

// Enable CORS
app.use(cors());

// Set up middleware and routes
app.use(express.json());
app.use('/api/notes', noteRoutes);

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email in the database
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare the provided password with the stored password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Successful login
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.log('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  const saltRounds = 10;

  // ...
  
  app.post('/api/signup', async (req, res) => {
    try {
      const { name, email, phone, password, confirmPassword } = req.body;
  
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = new User({
        name,
        email,
        phone,
        password: hashedPassword, // Store the hashed password
        confirmPassword,
      });
  
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
  





// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
