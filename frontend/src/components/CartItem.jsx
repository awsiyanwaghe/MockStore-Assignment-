import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(item._id, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(item._id);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '1rem 0',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <img 
        src={item.image} 
        alt={item.name}
        style={{
          width: '60px',
          height: '60px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginRight: '1rem'
        }}
      />
      
      <div style={{ flex: 1 }}>
        <div style={{
          fontWeight: '600',
          marginBottom: '0.25rem',
          fontSize: '14px'
        }}>
          {item.name}
        </div>
        <div style={{
          color: '#10B981',
          fontWeight: '600',
          fontSize: '14px'
        }}>
          ${item.price.toFixed(2)}
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          margin: '0.5rem 0'
        }}>
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            style={{
              width: '24px',
              height: '24px',
              background: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            -
          </button>
          <span style={{ fontSize: '14px', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>
            {item.quantity}
          </span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            style={{
              width: '24px',
              height: '24px',
              background: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            +
          </button>
        </div>
        
        <button 
          onClick={handleRemove}
          style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Remove
        </button>
      </div>
      
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
          ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;