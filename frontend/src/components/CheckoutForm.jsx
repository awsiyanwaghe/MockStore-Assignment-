import React, { useState } from 'react';
import { checkoutAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const CheckoutForm = ({ onCancel, onComplete }) => {
  const { items, total } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const customerData = {
        customer: {
          name: formData.name,
          email: formData.email
        }
      };

      const response = await checkoutAPI.processCheckout(customerData);
      onComplete(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onCancel}></div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Checkout</h3>
            <button 
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                required
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h4>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item._id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <button 
                type="button"
                onClick={onCancel}
                className="flex-1 btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Complete Order'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;