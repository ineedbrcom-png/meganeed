const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../db');

// Get all users
router.get('/', async (req, res) => {
  const users = await db('users').select('id', 'name', 'email', 'created_at');
  res.json(users);
});

// Middleware for user validation
const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  next();
};

// Create a new user
router.post('/', validateUser, async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await db('users').where({ email }).first();
  if (existingUser) {
    return res.status(409).json({ error: 'Email already in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await db('users')
    .insert({
      name,
      email,
      password: hashedPassword,
    })
    .returning(['id', 'name', 'email', 'created_at']);

  res.status(201).json(user);
});

module.exports = router;
