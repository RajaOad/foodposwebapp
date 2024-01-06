import React, { useContext, useEffect, useState } from 'react';
import AdminOrderComponent from './components/AdminOrderComponent '; // Importing the AdminOrderComponent
import { OrderContext } from '../../../context/order/OrderContext';
import { UserContext } from '../../../context/user/UserContext';
import { useNavigate } from 'react-router-dom';

function Orders() {
    
    const navigate = useNavigate();

    const { orders, cancelAdminOrder, completeAdminOrder, deleteOrder, updateOrder } = useContext(OrderContext);

    const { authenticated, isAdmin } = useContext(UserContext);

    useEffect(() => {
  
      if(!authenticated) {
        navigate('/login');
      }
  
      if (!isAdmin) {
        navigate("/");
      }
  
    }, [])

    if(orders.length === 0) {
        return (
            <div className='h-screen flex justify-center items-center text-4xl font-bold'>No Order Found</div>
        )
    }

    return (
        <div>
            <div className="relative z-10 bg-[#f4f4f4] dark:bg-navy-900 py-12 rounded-lg">
                <div className="container mx-auto">
                    <h1 className="text-[4vw] font-bold text-center mb-4 dark:text-white gradientText capitalize">Admin Orders</h1>
                </div>
            </div>

            <div className="admin-orders-list">
                {orders.map((order, index) => (
                    <AdminOrderComponent key={index} orderData={order} cancelAdminOrder={cancelAdminOrder} completeAdminOrder={completeAdminOrder} deleteOrder={deleteOrder} updateOrder={updateOrder} />
                ))}
            </div>
        </div>
    );
}

export default Orders;
