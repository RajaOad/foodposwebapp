import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const OrderComponent = ({ orderData, cancelUserOrder }) => {

  const [showCancelModal, setShowCancelModal] = useState(false);
  
  // Function to handle canceling an order (you can implement this logic)
  const handleCancelOrder = () => {
    // Logic to cancel the order
    setShowCancelModal(true)
  };

  const confirmCancel = () => {
    cancelUserOrder(orderData._id);
    setShowCancelModal(false);
  }

  return (
    <>
    <div className="bg-lightGray dark:bg-navy-800 flex justify-between items-end p-6 rounded-md shadow-md my-4">
      <div>
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      
      <div className="mb-4">
        {/* Order ID as a link */}
        <p className="mb-2">
          <span className="font-semibold text-lg">Order ID:</span> 
          <Link to={`/order/${orderData._id}`} className="text-blue-500 hover:underline ml-2">
            {orderData._id}
          </Link>
        </p>
        <p className="mb-2"><span className="font-semibold">Status:</span> {orderData.status}</p>
        <p className="mb-2"><span className="font-semibold">Order Date:</span> {new Date(orderData.createdAt).toLocaleDateString()}</p>
        <p className="mb-4"><span className="font-semibold">Total Items:</span> {orderData.totalItems}</p>
        <p className="mb-4"><span className="font-semibold">Grand Total:</span> ${orderData.grandTotal}</p>
      </div>
      </div>

      <div>
      {orderData.completionStatus === 'Completed' && (
  <div className="bg-green-100 p-8 rounded-md mt-4">
    <p className="font-bold text-green-600 mb-2">Order {orderData.completionStatus}</p>
    <p>Completed Date & Time: {new Date(orderData.completedAt).toLocaleDateString()} {new Date(orderData.completedAt).toLocaleTimeString()}</p>
    
  </div>
)}
      {orderData.cancellationStatus === 'Cancelled' && (
  <div className="bg-red-100 p-4 rounded-md">
    <p className="font-bold text-red-600 mb-2">Order {orderData.cancellationStatus}</p>
    <p>Cancelled By {orderData.cancelledBy === "User" ? "You": orderData.cancelledBy}</p>
    <p>Cancelled Date & Time: {new Date(orderData.cancelledAt).toLocaleDateString()} {new Date(orderData.cancelledAt).toLocaleTimeString()}</p>
  </div>
)}
      </div>

      {/* Cancel Button */}
      
      {orderData.completionStatus !== 'Completed' && orderData.cancellationStatus !== 'Cancelled' && (
  <div className="flex justify-end">
    <button 
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md"
      onClick={handleCancelOrder}
    >
      Cancel Order
    </button>
  </div>
)}

    </div>

    {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Cancel</h2>
            <p className="mb-4">Are you sure you want to cancel this order?</p>
            <div className="flex justify-end">
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={confirmCancel}
              >
                Confirm
              </button>
              <button 
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setShowCancelModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
};

export default OrderComponent;
