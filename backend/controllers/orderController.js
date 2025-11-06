const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { validationResult } = require('express-validator');

// Generate unique order ID
const generateOrderId = () => {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

// Process checkout
exports.processCheckout = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customer } = req.body;
    const sessionId = req.headers['session-id'] || 'default-session';

    // Get cart
    const cart = await Cart.findOne({ sessionId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate totals
    const subtotal = cart.total;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    // Create order
    const order = new Order({
      orderId: generateOrderId(),
      customer,
      items: cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
      })),
      subtotal,
      tax,
      total,
    });

    await order.save();

    // Clear cart after successful order
    cart.items = [];
    cart.total = 0;
    await cart.save();

    // Return receipt
    const receipt = {
      orderId: order.orderId,
      customer: order.customer,
      items: order.items,
      subtotal: order.subtotal.toFixed(2),
      tax: order.tax.toFixed(2),
      total: order.total.toFixed(2),
      orderDate: order.createdAt,
    };

    res.status(201).json(receipt);
  } catch (error) {
    res.status(500).json({ message: 'Error processing checkout', error: error.message });
  }
};