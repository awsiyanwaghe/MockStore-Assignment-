import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock products data with proper structure
    const mockProducts = [
      {
        _id: '1',
        name: 'Wireless Bluetooth Headphones',
        price: 79.99,
        description: 'High-quality wireless headphones with noise cancellation and long battery life.',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
        rating: { rate: 4.5, count: 120 }
      },
      {
        _id: '2',
        name: 'Smart Watch', 
        price: 199.99,
        description: 'Feature-rich smartwatch with health monitoring and GPS tracking.',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
        rating: { rate: 4.3, count: 89 }
      },
      {
        _id: '3',
        name: 'Laptop Backpack',
        price: 49.99,
        description: 'Durable laptop backpack with multiple compartments and water resistance.',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
        rating: { rate: 4.7, count: 156 }
      },
      {
        _id: '4',
        name: 'Coffee Mug',
        price: 14.99,
        description: 'Ceramic coffee mug with elegant design and comfortable handle.',
        category: 'Home',
        image: 'data:image/jpeg;base64,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',
        rating: { rate: 4.2, count: 67 }
      },
      {
        _id: '5',
        name: 'Running Shoes',
        price: 89.99,
        description: 'Comfortable running shoes for all terrains with excellent grip.',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
        rating: { rate: 4.6, count: 203 }
      },
      {
        _id: '6',
        name: 'Desk Lamp',
        price: 34.99,
        description: 'LED desk lamp with adjustable brightness and modern design.',
        category: 'Home',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
        rating: { rate: 4.4, count: 98 }
      },
      {_id: '7',
        name: 'Wireless Gaming Mouse',
        price: 89.99,
        description: 'High-precision wireless gaming mouse with RGB lighting and programmable buttons.',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
        rating: { rate: 4.5, count: 134 }
      },
      {
        _id: '8',
        name: 'Mechanical Keyboard',
        price: 119.99,
        description: 'RGB mechanical keyboard with blue switches and aluminum frame.',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&q=80',
        rating: { rate: 4.7, count: 89 }
      },
      {
        _id: '9',
        name: 'Fitness Tracker Band',
        price: 59.99,
        description: 'Waterproof fitness tracker with heart rate monitor and sleep tracking.',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80',
        rating: { rate: 4.1, count: 167 }
      },
      {
        _id: '10',
        name: 'Portable Bluetooth Speaker',
        price: 79.99,
        description: '360° sound portable speaker with 20-hour battery life.',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
        rating: { rate: 4.4, count: 98 }
      },
      {
        _id: '11',
        name: 'Smartphone Case - Premium',
        price: 29.99,
        description: 'Shockproof smartphone case with built-in screen protector.',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&q=80',
        rating: { rate: 4.3, count: 256 }
      },
      {
        _id: '12',
        name: 'Wireless Earbuds Pro',
        price: 149.99,
        description: 'True wireless earbuds with active noise cancellation and wireless charging.',
        category: 'Electronics',
        image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRD6t4nrNkNqj0PC_rWIDBLwAn3HpYWOuU7EAMuotRdAlgUrvrGEPurFyWVzllPT2Ne4lCBsReI5ZJ7eyKZnc-G7HHaTQywvbM9S1xhp7zSByDSBGXaYNMJHq4',
        rating: { rate: 4.6, count: 178 }
      },
      {
        _id: '13',
        name: 'Gaming Headset',
        price: 99.99,
        description: '7.1 surround sound gaming headset with noise-cancelling microphone.',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=500&q=80',
        rating: { rate: 4.4, count: 112 }
      },
      {
        _id: '14',
        name: 'Smart Home Speaker',
        price: 129.99,
        description: 'Voice-controlled smart speaker with premium sound quality.',
        category: 'Electronics',
        image: 'data:image/jpeg;base64,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',
        rating: { rate: 4.5, count: 145 }
      },
      {
        _id: '15',
        name: '4K Action Camera',
        price: 199.99,
        description: 'Waterproof 4K action camera with image stabilization.',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80',
        rating: { rate: 4.3, count: 87 }
      },
    ];
    
    // Small delay to simulate loading
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;