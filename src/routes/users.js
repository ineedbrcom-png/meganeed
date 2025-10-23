const express = require('express');
const router = express.Router();

// Mock user data
let users = [];

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Middleware for user validation
const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  next();
};

// Create a new user
router.post('/', validateUser, (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
});

module.exports = router;
