import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        loading: false,
      };
    case 'ADD_ITEM':
      // Find if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        item => item.productId === action.payload.productId
      );

      let newItems;
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Add new item to cart with actual product data
        const newItem = {
          _id: Date.now().toString(), // temporary ID
          productId: action.payload.productId,
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image,
          quantity: action.payload.quantity
        };
        newItems = [...state.items, newItem];
      }
      
      const newTotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        total: newTotal,
      };

    case 'UPDATE_ITEM':
      const updatedItems = state.items.map(item =>
        item._id === action.payload.itemId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      const updatedTotal = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: updatedItems,
        total: updatedTotal,
      };

    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item._id !== action.payload.itemId);
      const filteredTotal = filteredItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: filteredItems,
        total: filteredTotal,
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add to cart function with actual product data
  const addToCart = async (productId, quantity = 1, productData = null) => {
    try {
      // If productData is provided, use it
      if (productData) {
        dispatch({ 
          type: 'ADD_ITEM', 
          payload: {
            productId: productId,
            name: productData.name,
            price: productData.price,
            image: productData.image,
            quantity: quantity
          }
        });
      } else {
        // Fallback to mock data (shouldn't happen in our case)
        const mockProduct = {
          productId: productId,
          name: `Product ${productId}`,
          price: 99.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
        };

        dispatch({ 
          type: 'ADD_ITEM', 
          payload: {
            productId: mockProduct.productId,
            name: mockProduct.name,
            price: mockProduct.price,
            image: mockProduct.image,
            quantity: quantity
          }
        });
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      dispatch({ type: 'UPDATE_ITEM', payload: { itemId, quantity } });
    } catch (error) {
      console.error('Failed to update quantity:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
    } catch (error) {
      console.error('Failed to remove item:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  };

  const getCartCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};