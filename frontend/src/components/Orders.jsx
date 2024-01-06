import React, { useContext } from 'react';
import OrderComponent from './OrderComponent'; // Importing the OrderComponent
import { OrderContext } from '../context/order/OrderContext';

function OrdersComponent() {
    const { cancelUserOrder, userOrders } = useContext(OrderContext);

    if (userOrders.length === 0) {
        return (
            <div className="flex items-center text-center justify-center min-h-screen bg-gray-100 dark:bg-navy-900">
  <div className="bg-white p-8 rounded-lg shadow-md dark:bg-navy-800">
    <h1 className="text-5xl font-bold text-[#ff6b53] dark:text-gray-500 mb-6">No Orders Found</h1>
    <p className="text-xl text-gray-600 mb-8">It looks like there are no orders placed at the moment.</p>
    <p className="text-gray-500 text-center">Feel free to place an order to enjoy our delicious variety of options!</p>
  </div>
</div>

        )
    }

    return (
        <div className='min-h-screen'>

            <div className="relative z-10 bg-[#f4f4f4] dark:bg-navy-900 py-12 rounded-lg">
                <div className="container mx-auto">
                    <h1 className="text-[4vw] font-bold text-center mb-4 dark:text-white gradientText capitalize">Your Orders</h1>
                </div>
            </div>

            <div className="orders-list">
                {userOrders.map((order, index) => (
                    <OrderComponent key={index} orderData={order} cancelUserOrder={cancelUserOrder} />
                ))}
            </div>
        </div>
    );
}

export default OrdersComponent;
