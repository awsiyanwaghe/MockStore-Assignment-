import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleNavigate = (event) => {
      setCurrentPage(event.detail);
    };

    window.addEventListener('navigate', handleNavigate);
    
    return () => {
      window.removeEventListener('navigate', handleNavigate);
    };
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'shopping':
        return <ProductGrid />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <CartProvider>
      <div className="App min-h-screen bg-gray-50">
        <Header 
          onCartClick={() => setIsCartOpen(true)}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
        <main>
          {renderPage()}
        </main>
        {isCartOpen && (
          <Cart onClose={() => setIsCartOpen(false)} />
        )}
      </div>
    </CartProvider>
  );
}

export default App;