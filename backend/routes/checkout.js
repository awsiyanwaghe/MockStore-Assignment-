const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST /api/checkout - Process checkout
router.post('/', 
  [
    body('customer.name').notEmpty().withMessage('Name is required'),
    body('customer.email').isEmail().withMessage('Valid email is required'),
  ],
  orderController.processCheckout
);

module.exports = router;