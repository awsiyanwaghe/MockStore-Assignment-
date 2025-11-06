import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    console.log('Add to Cart clicked for:', product.name, 'Price:', product.price);
    setAdding(true);
    try {
      // Pass the actual product data to addToCart function
      await addToCart(product._id, 1, {
        name: product.name,
        price: product.price,
        image: product.image
      });
      console.log('Product added to cart successfully');
      alert(`✅ ${product.name} added to cart!`);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      alert('❌ Failed to add item to cart');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    }} className="product-card">
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{ 
            width: '100%', 
            height: '200px', 
            objectFit: 'cover' 
          }}
        />
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: '#10B981',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '9999px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          ${product.price.toFixed(2)}
        </div>
      </div>
      
      <div style={{ padding: '1rem' }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#1F2937',
          marginBottom: '0.5rem'
        }}>
          {product.name}
        </h3>
        
        <p style={{ 
          color: '#6B7280', 
          fontSize: '14px',
          marginBottom: '1rem',
          height: '40px',
          overflow: 'hidden'
        }}>
          {product.description}
        </p>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <div style={{ color: '#FBBF24', fontSize: '14px' }}>
            {'★'.repeat(4)}☆ ({product.rating?.count || 0})
          </div>
          <span style={{ 
            fontSize: '12px', 
            color: '#6B7280',
            textTransform: 'uppercase',
            background: '#F3F4F6',
            padding: '2px 8px',
            borderRadius: '4px'
          }}>
            {product.category}
          </span>
        </div>
        
        <button 
          onClick={handleAddToCart}
          disabled={adding}
          style={{
            width: '100%',
            background: adding ? '#9CA3AF' : '#2563EB',
            color: 'white',
            fontWeight: '600',
            padding: '12px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: adding ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '16px'
          }}
          onMouseOver={(e) => {
            if (!adding) e.target.style.background = '#1D4ED8';
          }}
          onMouseOut={(e) => {
            if (!adding) e.target.style.background = '#2563EB';
          }}
        >
          {adding ? 'Adding to Cart...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;