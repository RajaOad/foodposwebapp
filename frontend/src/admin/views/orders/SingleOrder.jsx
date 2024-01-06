import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../../context/user/UserContext';
import { OrderContext } from '../../../context/order/OrderContext';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const SingleOrder = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const { authenticated, isAdmin } = useContext(UserContext);
    const { adminSingleOrder, fetchAdminSingleOrder } = useContext(OrderContext);

    useEffect(() => {
  
      if(!authenticated) {
        navigate('/login');
      }
  
      if (!isAdmin) {
        navigate("/");
      }
  
    }, [authenticated])

    useEffect(() => {
        fetchAdminSingleOrder(id);
    }, [id]);

    if (!adminSingleOrder) {
        return <div className='h-screen flex justify-center items-center text-4xl font-bold'>Order Not Found</div>;
    }

    return (
        <>
            <div className="bg-white dark:bg-navy-800 dark:text-white text-gray-800 p-8 rounded-md shadow-lg my-6">
                <h2 className="text-3xl font-bold mb-8 pb-2 border-b-2">Order Details</h2>

                <div className="mb-10">
                    <p className="mb-4 text-lg"><span className="font-semibold">Order ID:</span> {adminSingleOrder._id}</p>
                    <p className="mb-4 text-lg"><span className="font-semibold">Status:</span> {adminSingleOrder.status}</p>

                    <div>
                        {adminSingleOrder.completionStatus === 'Completed' ? (
                            <div className="bg-green-100 p-4 rounded-md mt-4">
                                <p className="font-bold text-green-600 mb-2">Completion Status: {adminSingleOrder.completionStatus}</p>
                                <p>Completed Date & Time: {new Date(adminSingleOrder.completedAt).toLocaleDateString()} {new Date(adminSingleOrder.completedAt).toLocaleTimeString()}</p>
                            </div>
                        ) : (
                            <p className="mb-3"><span className="font-semibold">Completion Status:</span> {adminSingleOrder.completionStatus || 'Not Completed'}</p>

                        )}
                    </div>


                    <div>
                        {adminSingleOrder.cancellationStatus === 'Cancelled' ? (
                            <div className="bg-red-100 p-4 rounded-md">
                                <p className="font-bold text-red-600 mb-2">Cancellation Status: {adminSingleOrder.cancellationStatus}</p>
                                <p>Cancelled By: {adminSingleOrder.cancelledBy}</p>
                                <p>Cancelled Date & Time: {new Date(adminSingleOrder.cancelledAt).toLocaleDateString()} {new Date(adminSingleOrder.cancelledAt).toLocaleTimeString()}</p>
                            </div>
                        ) : (
                            <p className="mb-3"><span className="font-semibold">Cancellation Status:</span> {adminSingleOrder.cancellationStatus || 'Not Canceled'}</p>

                        )}
                    </div>

                    <p className="mb-2">
                        <span className="font-semibold">Order Date & Time:</span>
                        {new Date(adminSingleOrder.createdAt).toLocaleDateString()} {new Date(adminSingleOrder.createdAt).toLocaleTimeString()}
                    </p>

                    <p className="mb-4 text-lg"><span className="font-semibold">Total Items:</span> {adminSingleOrder.totalItems}</p>
                    <p className="text-2xl font-bold"><span className="font-semibold">Total Amount:</span> ${adminSingleOrder.grandTotal}</p>
                </div>


                {/* User Details Section */}
                <div className="mb-10">
                    <h3 className="text-2xl font-semibold mb-6 pb-2 border-b-2">User Details</h3>
                    <p className="mb-3"><span className="font-semibold">User ID:</span> {adminSingleOrder.userId._id}</p>
                    <p className="mb-3"><span className="font-semibold">Username:</span> {adminSingleOrder.userId.username}</p>
                    <p className="mb-3"><span className="font-semibold">User Email:</span> {adminSingleOrder.userId.email}</p>
                </div>

                <div className="mb-10">
                    <h3 className="text-2xl font-semibold mb-6 pb-2 border-b-2">Delivery Details</h3>
                    <p className="mb-3"><span className="font-semibold">Address:</span> {adminSingleOrder.deliveryDetails.address}</p>
                    <p className="mb-3"><span className="font-semibold">City:</span> {adminSingleOrder.deliveryDetails.city}</p>
                    <p className="mb-3"><span className="font-semibold">Zip Code:</span> {adminSingleOrder.deliveryDetails.zipCode}</p>
                    <p className="mb-3"><span className="font-semibold">Phone:</span> {adminSingleOrder.deliveryDetails.phone}</p>
                    <p className="text-lg"><span className="font-semibold">Delivery Option:</span> {adminSingleOrder.deliveryOption}</p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-6 pb-2 border-b-2">Products Ordered</h3>
                    <ul>
                    {adminSingleOrder.products.map((product, index) => (
  <li key={index} className="border-b py-3 flex justify-between items-center">
    <div className='flex items-center'>
    <img
      src={(serverUrl + product.productId.imageUrl) || ""}
      alt={product.productId.name}
      className="w-16 h-16 object-cover rounded mr-4 shadow-md"
    />
    <div>
      <p className="text-base font-semibold mb-1">{product.productId.name}</p>
      <p className="text-sm mb-1">&#36;{product.productId.price} | Qty: {product.quantity}</p>
    </div>
    </div>
      <p className="text-base font-semibold">Total &#36;{product.totalPrice}</p>
  </li>
))}
<li className="border-b py-3 flex justify-between items-center">
<span className="text-2xl font-semibold">Grand Total</span>
<p className="text-2xl font-bold"> ${adminSingleOrder.grandTotal}</p>

</li>
                    </ul>
                </div>

            </div>
        </>
    );
};

export default SingleOrder;
