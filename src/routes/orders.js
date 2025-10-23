const express = require('express');
const router = express.Router();

// Mock order data
let orders = [];

// Get all orders
router.get('/', (req, res) => {
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
router.post('/', validateOrder, (req, res) => {
  const order = req.body;
  orders.push(order);
  res.status(201).json(order);
});

module.exports = router;
