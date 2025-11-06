const Cart = require('../models/Cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Helper function to get or create cart
const getOrCreateCart = async (sessionId) => {
  let cart = await Cart.findOne({ sessionId }).populate('items.productId');
  if (!cart) {
    cart = new Cart({ sessionId, items: [], total: 0 });
    await cart.save();
  }
  return cart;
};

// Calculate cart total
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get cart
exports.getCart = async (req, res) => {
  try {
    const sessionId = req.headers['session-id'] || 'default-session';
    const cart = await getOrCreateCart(sessionId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const sessionId = req.headers['session-id'] || 'default-session';

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await getOrCreateCart(sessionId);
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        productId: product._id,
        quantity,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }

    cart.total = calculateTotal(cart.items);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};

// Update cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const sessionId = req.headers['session-id'] || 'default-session';

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    cart.total = calculateTotal(cart.items);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const sessionId = req.headers['session-id'] || 'default-session';

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items.pull({ _id: itemId });
    cart.total = calculateTotal(cart.items);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const sessionId = req.headers['session-id'] || 'default-session';
    
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};