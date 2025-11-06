import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

const Cart = ({ onClose }) => {
  const { items, total } = useCart();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '400px',
      background: 'white',
      boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      overflowY: 'auto'
    }}>
      <div style={{ padding: '2rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '1rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Shopping Cart</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>Your cart is empty</p>
            <p style={{ color: '#9ca3af', marginTop: '0.5rem' }}>Add some products to get started!</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '2rem' }}>
              {items.map(item => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
            
            <div style={{
              borderTop: '2px solid #374151',
              paddingTop: '1rem',
              marginTop: '2rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;