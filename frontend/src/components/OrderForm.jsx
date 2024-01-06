// src/components/OrderForm.js
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user/UserContext';
import Cart from './Cart';
import { useOrder } from '../context/order/OrderContext';
import { CartContext } from '../context/cart/CartContext';

function OrderForm() {
    const { userData } = useContext(UserContext);
      const { cartItems, setCartItems, calculateTotal } = useContext(CartContext);

    const { placeOrder } = useOrder();

    const [currentStep, setCurrentStep] = useState(1);
    const [deliveryOption, setDeliveryOption] = useState('Delivery');
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [deliveryDetails, setDeliveryDetails] = useState({});

    useEffect(() => {

        setDeliveryDetails({
            address: userData.address,
            city: userData.city,
            zipCode: userData.zipCode,
            phone: userData.phone
        })

    }, [userData])
    

    const handleOrderSubmit = () => {
        placeOrder(cartItems, calculateTotal, deliveryDetails, deliveryOption, setCartItems);
    };

    return (
    <>
<div className='w-3/5 mx-auto my-8'>
{currentStep === 1 && (
                <>
                    <Cart cartStyles={"min-h-screen rounded-md shadow-md max-w-md mx-auto"} showBtn={false} />
                    <button className="p-3 bg-[#ff6b53] text-white dark:bg-navy-700 dark:hover:bg-navy-800 rounded-md w-full mt-6" onClick={() => setCurrentStep(2)}>Next</button>
                </>
            )}
    
     {currentStep === 2 && (
        <>
     <div className="min-h-screen p-8 bg-white dark:bg-navy-800 rounded-md shadow-md max-w-md mx-auto">
            <h2 className="text-2xl mb-6 text-center font-semibold text-gray-800 dark:text-white">Confirm Your Order</h2>
            <div className="mb-6">
                <label className="block mb-4 text-lg text-gray-700 dark:text-white">
                    Select Delivery Option:
                    <select
                        className="p-3 border rounded-md block w-full focus:outline-none focus:border-[#ff6b53] dark:bg-navy-900 dark:text-white text-gray-800"
                        value={deliveryOption}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                    >
                        <option value="Delivery">Delivery</option>
                        <option value="Pickup">Pickup</option>
                        <option value="Dine-In">Dine-In</option>
                    </select>
                </label>
            </div>
            <div className="mb-6">
                <h3 className="text-xl mb-4 font-semibold text-gray-800 dark:text-white">Your Address:</h3>
                {isEditingAddress ? (
                    <div className="space-y-4">
                        <input
                            className="p-3 border rounded-md block w-full dark:text-white dark:bg-navy-900 focus:outline-none focus:border-[#ff6b53] text-gray-800"
                            type="text"
                            placeholder="Phone"
                            value={deliveryDetails.phone}
                            onChange={(e) => setDeliveryDetails(prevDeliveryDetails => ({ ...prevDeliveryDetails, phone: e.target.value }))}
                        />
                        <input
                            className="p-3 border rounded-md block w-full dark:text-white dark:bg-navy-900 focus:outline-none focus:border-[#ff6b53] text-gray-800"
                            type="text"
                            placeholder="City"
                            value={deliveryDetails.city}
                            onChange={(e) => setDeliveryDetails(prevDeliveryDetails => ({ ...prevDeliveryDetails, city: e.target.value }))}
                        />
                        <input
                            className="p-3 border rounded-md block w-full dark:text-white dark:bg-navy-900 focus:outline-none focus:border-[#ff6b53] text-gray-800"
                            type="text"
                            placeholder="Zipcode"
                            value={deliveryDetails.zipCode}
                            onChange={(e) => setDeliveryDetails(prevDeliveryDetails => ({ ...prevDeliveryDetails, zipCode: e.target.value }))}
                        />

                        <textarea
                            className="p-3 border rounded-md block w-full dark:text-white dark:bg-navy-900 focus:outline-none focus:border-[#ff6b53] text-gray-800"
                            placeholder="Address"
                            value={deliveryDetails.address}
                            onChange={(e) => setDeliveryDetails(prevDeliveryDetails => ({ ...prevDeliveryDetails, address: e.target.value }))}
                        />
                    </div>
                ) : (
                    <div className="space-y-2">
                        <p className="text-lg font-medium text-gray-700 dark:text-white">Phone: {deliveryDetails.phone}</p>
                        <p className="text-lg font-medium text-gray-700 dark:text-white">City: {deliveryDetails.city}</p>
                        <p className="text-lg font-medium text-gray-700 dark:text-white">Zipcode: {deliveryDetails.zipCode}</p>
                        <p className="text-lg font-medium text-gray-700 dark:text-white">Address: {deliveryDetails.address}</p>
                    </div>
                )}
                <button
                    className={`p-3 bg-[#ff6b53] text-white dark:bg-navy-900 dark:hover:bg-navy-700 rounded-md w-full mt-6`}
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                >
                    {isEditingAddress ? 'Cancel Edit' : 'Edit Address'}
                </button>
            </div>
            
        </div>
        <div className='flex mt-6 space-x-4'>
        <button className="p-3 bg-[#ff6b53] dark:bg-navy-700 dark:hover:bg-navy-800 text-white rounded-md w-full" onClick={() => setCurrentStep(1)}>Previous</button>
                    <button className="p-3 bg-[#ff6b53] dark:bg-navy-700 dark:hover:bg-navy-800 text-white rounded-md w-full" onClick={handleOrderSubmit}>Confirm Order</button>
                    </div>
        </>
        )}
        </div>
        </>
    );
}

export default OrderForm;
