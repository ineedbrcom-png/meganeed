const express = require('express');
const router = express.Router();

const db = require('../db');

// Get all users
router.get('/', async (req, res) => {
  const users = await db('users').select();
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
router.post('/', validateUser, async (req, res) => {
  const [user] = await db('users').insert(req.body).returning('*');
  res.status(201).json(user);
});

module.exports = router;
