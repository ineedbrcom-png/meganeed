const express = require('express');
const router = express.Router();

const db = require('../db');

// Get all orders
router.get('/', async (req, res) => {
  const orders = await db('orders').select();
  res.json(orders);
});

// Middleware for order validation
const validateOrder = (req, res, next) => {
  const { product, quantity } = req.body;
  if (!product || !quantity) {
    return res.status(400).json({ error: 'Product and quantity are required' });
  }
  next();
};

// Create a new order
router.post('/', validateOrder, async (req, res) => {
  const [order] = await db('orders').insert(req.body).returning('*');
  res.status(201).json(order);
});

module.exports = router;
