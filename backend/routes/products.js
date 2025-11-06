const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products - Get all products
router.get('/', productController.getProducts);

// GET /api/products/:id - Get single product
router.get('/:id', productController.getProductById);

module.exports = router;