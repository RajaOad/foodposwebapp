import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderContext } from '../context/order/OrderContext';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const SingleOrder = () => {
    const { id } = useParams();
    const { fetchSingleOrder, singleOrder } = useContext(OrderContext);;
  
    useEffect(() => {
      fetchSingleOrder(id);
    }, [id]);
  
    if (!singleOrder) {
      return <div className='h-screen flex justify-center items-center text-4xl'>Order Not Found</div>;
    }

  return (
    <>
    <div className="bg-lightGray dark:bg-navy-800 dark:text-white text-gray-800 p-8 rounded-md shadow-lg my-6">
      <h2 className="text-3xl font-bold mb-8 pb-2 border-b-2">Order Details</h2>
      
      <div className="mb-10">
        <p className="mb-4 text-lg"><span className="font-semibold">Order ID:</span> {singleOrder._id}</p>
        <p className="mb-4 text-lg"><span className="font-semibold">Status:</span> {singleOrder.status}</p>
        <p className="mb-4 text-lg"><span className="font-semibold">Order Date:</span> {new Date(singleOrder.createdAt).toLocaleDateString()}</p>
        <p className="mb-4 text-lg"><span className="font-semibold">Total Items:</span> {singleOrder.totalItems}</p>
        <p className="text-2xl font-bold"><span className="font-semibold">Grand Total:</span> ${singleOrder.grandTotal}</p>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-6 pb-2 border-b-2">Delivery Details</h3>
        <p className="mb-3"><span className="font-semibold">Address:</span> {singleOrder.deliveryDetails.address}</p>
        <p className="mb-3"><span className="font-semibold">City:</span> {singleOrder.deliveryDetails.city}</p>
        <p className="mb-3"><span className="font-semibold">Zip Code:</span> {singleOrder.deliveryDetails.zipCode}</p>
        <p className="mb-3"><span className="font-semibold">Phone:</span> {singleOrder.deliveryDetails.phone}</p>
        <p className="text-lg"><span className="font-semibold">Delivery Option:</span> {singleOrder.deliveryOption}</p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-6 pb-2 border-b-2">Products Ordered</h3>
        <ul>
          {singleOrder.products.map((product, index) => (
            <li key={index} className="border-b py-6 flex items-center">
              <img 
                src={(serverUrl + product.productId.imageUrl) || ""} 
                alt={product.productId.name} 
                className="w-24 h-24 object-cover rounded mr-8 shadow-md"
              />
              <div>
                <p className="text-xl font-semibold mb-2">{product.productId.name}</p>
                <p className="mb-1">Price: ${product.productId.price}</p>
                <p className="mb-1">Quantity: {product.quantity}</p>
                <p className="text-lg font-semibold">Total: ${product.totalPrice}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default SingleOrder;
