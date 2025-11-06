import React from 'react';

const ReceiptModal = ({ receipt, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mt-3">Order Confirmed!</h3>
            <p className="text-sm text-gray-500 mt-1">Thank you for your purchase!</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-500">Order ID:</span>
                <p className="text-gray-900">{receipt.orderId}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Date:</span>
                <p className="text-gray-900">{new Date(receipt.orderDate).toLocaleString()}</p>
              </div>
              <div className="col-span-2">
                <span className="font-medium text-gray-500">Customer:</span>
                <p className="text-gray-900">{receipt.customer.name}</p>
                <p className="text-gray-600">{receipt.customer.email}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Order Details</h4>
              <div className="space-y-2">
                {receipt.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 mt-3 pt-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${receipt.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${receipt.tax}</span>
                </div>
                <div className="flex justify-between text-base font-semibold border-t border-gray-200 mt-2 pt-2">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${receipt.total}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button 
              onClick={onClose}
              className="w-full btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;