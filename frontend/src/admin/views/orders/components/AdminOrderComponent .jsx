import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UpdateOrderDialog from './UpdateOrderDialog';

const AdminOrderComponent = ({ orderData, cancelAdminOrder, completeAdminOrder, deleteOrder, updateOrder }) => {

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const handleEditOrder = () => {
    console.log("Order edited by admin!");
  };

  const handleDeleteOrder = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteOrder(orderData._id);
    setShowDeleteModal(false);
  }

  const handleCompleteOrder = () => {
    setShowCompleteModal(true);
  };

  const handleCancelOrder = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    await cancelAdminOrder(orderData._id);
    setShowCancelModal(false);
  };

  const confirmComplete = async () => {
    await completeAdminOrder(orderData._id);
    setShowCompleteModal(false);
  };

  return (
    <>
    <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-md my-4 relative">
      <h2 className="text-2xl font-semibold mb-4">Admin Order Details</h2>

      {/* Edit and Delete buttons on top right */}
      <div className="absolute top-4 right-4">
        <button 
          onClick={()=> setIsOrderDialogOpen(true)} 
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md"
        >
          <FaEdit />
        </button>
        
        <button 
          onClick={handleDeleteOrder} 
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md ml-3"
        >
          <FaTrash />
        </button>
      </div>

<div className='mb-6 flex justify-between pr-24'>


      {/* Order Details */}
      <div>
        <p className="mb-2">
          <span className="font-semibold text-lg">Order ID:</span> 
          <Link to={`/admin/order/${orderData._id}`} className="text-blue-500 hover:underline ml-3">
            {orderData._id}
          </Link>
        </p>

        {/* User Details */}
        <div className="mb-4">
          <p><span className="font-semibold">User ID:</span> {orderData.userId._id}</p>
          <p><span className="font-semibold">Username:</span> {orderData.userId.username}</p>
        </div>

        {/* Order Status */}
        <p className="mb-2"><span className="font-semibold">Status:</span> {orderData.status}</p>
        <p className="mb-3"><span className="font-semibold">Completion Status:</span> {orderData.completionStatus || 'Not Completed'}</p>
        <p className="mb-2"><span className="font-semibold">Cancellation Status:</span> {orderData.cancellationStatus || 'Not Canceled'}</p>

        {/* Order Date, Total Items, and Grand Total */}
        <p className="mb-2">
  <span className="font-semibold">Order Date & Time:</span> 
  {new Date(orderData.createdAt).toLocaleDateString()} {new Date(orderData.createdAt).toLocaleTimeString()}
</p>

        <p className="mb-2"><span className="font-semibold">Total Quantity:</span> {orderData.totalQuantity}</p>
        <p className="mb-2"><span className="font-semibold">Total Items:</span> {orderData.totalItems}</p>
        <p className="mb-4"><span className="font-semibold">Grand Total:</span> ${orderData.grandTotal}</p>
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
    <p>Cancelled By: {orderData.cancelledBy}</p>
    <p>Cancelled Date & Time: {new Date(orderData.cancelledAt).toLocaleDateString()} {new Date(orderData.cancelledAt).toLocaleTimeString()}</p>
  </div>
)}

      </div>
      </div>

      {/* Cancel and Complete buttons on bottom right */}
      <div className="absolute flex space-x-4 bottom-4 right-4">

       <button 
          className="bg-green-500 flex items-center hover:bg-green-700 text-white p-2 rounded-md shadow-md"
          onClick={handleCompleteOrder}
        >
          Complete <FaCheck className="ml-2" />
        </button>

        <button 
          className="bg-red-500 flex items-center hover:bg-red-700 text-white p-2 rounded-md shadow-md mr-3"
          onClick={handleCancelOrder}
        >
          Cancel <FaTimes className="ml-2" />
        </button>
      </div>
    </div>




      {/* Cancel Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to Delete this order?</p>
            <div className="flex justify-end">
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button 
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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

      {/* Complete Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Complete</h2>
            <p className="mb-4">Are you sure you want to complete this order?</p>
            <div className="flex justify-end">
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={confirmComplete}
              >
                Confirm
              </button>
              <button 
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setShowCompleteModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

<UpdateOrderDialog
orderId={orderData._id}
    orderData={orderData} 
    onUpdateOrder={updateOrder} 
    isOpen={isOrderDialogOpen} 
    setIsOpen={setIsOrderDialogOpen} 
/>

    </>
  );
};

export default AdminOrderComponent;
