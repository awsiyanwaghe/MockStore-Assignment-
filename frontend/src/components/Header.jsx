import React from 'react';
import { useCart } from '../context/CartContext';

const Header = ({ onCartClick, onNavigate, currentPage }) => {
  const { getCartCount } = useCart();

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'deals', label: 'Deals', icon: '🔥' },
    { id: 'contact', label: 'Contact', icon: '📞' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="text-3xl">🛒</div>
            <h1 className="text-2xl font-bold text-gray-800">MockStore</h1>
          </div>
          
          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === item.id 
                    ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 pt-4 pb-2">
          <div className="flex justify-around">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center space-y-1 px-2 py-1 rounded-lg transition-all duration-200 ${
                  currentPage === item.id 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;