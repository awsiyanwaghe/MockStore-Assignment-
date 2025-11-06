const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    rating: { rate: 4.5, count: 120 }
  },
  {
    name: "Smart Watch",
    price: 199.99,
    description: "Feature-rich smartwatch with health monitoring",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    rating: { rate: 4.3, count: 89 }
  },
  {
    name: "Laptop Backpack",
    price: 49.99,
    description: "Durable laptop backpack with multiple compartments",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    rating: { rate: 4.7, count: 156 }
  },
  {
    name: "Coffee Mug",
    price: 14.99,
    description: "Ceramic coffee mug with elegant design",
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&q=80",
    rating: { rate: 4.2, count: 67 }
  },
  {
    name: "Running Shoes",
    price: 89.99,
    description: "Comfortable running shoes for all terrains",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    rating: { rate: 4.6, count: 203 }
  },
  {
    name: "Desk Lamp",
    price: 34.99,
    description: "LED desk lamp with adjustable brightness",
    category: "Home",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    rating: { rate: 4.4, count: 98 }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing products
    await Product.deleteMany({});
    
    // Insert new products
    await Product.insertMany(products);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();