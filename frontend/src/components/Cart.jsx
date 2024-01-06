import React, { useContext } from 'react';
import { CartContext } from '../context/cart/CartContext';
import { SaleContext } from '../context/sale/SaleContext';
import { useDarkMode } from '../context/darkmode/DarkModeContext';
import { useOrder } from '../context/order/OrderContext';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user/UserContext';

const Cart = ({ cartStyles, showBtn }) => {

  const { cartItems, setCartItems, isOpen, toggleOpenState, removeFromCart, increaseQuantity, decreaseQuantity, calculateTotal } = useContext(CartContext);

  const { handleMakeSale } = useContext(SaleContext);
  const { isAdmin } = useContext(UserContext);
  const { orders, fetchOrders, placeOrder } = useOrder();
  const { darkMode } = useDarkMode();

    const { totalQuantity, totalItems, grandTotal } = calculateTotal();

    // if (!isOpen) {
    //     return null;
    //   }
  
  return (
    <div className={`${darkMode ? "bgDarkFull": "gradientOrange"} ${cartStyles} dark:bg-navy-900 dark:text-white`}>
      <div className="p-6">

     {showBtn && <div className="flex justify-end mb-4">
          <button onClick={toggleOpenState} className="text-white hover:text-red-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="h-6 w-6 cursor-pointer"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>}

        <h1 className="mb-6 text-white text-center text-2xl font-bold">Cart Items</h1>
        
        {/* Product Card 1 */}
        {cartItems.map((item) => (
         <div className="mb-6 bg-lightGray dark:bg-navy-800 dark:text-white" key={item._id}>
         <div className="justify-between mb-4 rounded-lg p-4 shadow-md flex flex-wrap md:flex-nowrap">
           <img src={`http://localhost:3001/${item.imageUrl}`} alt="product-image" className="min-w-full md:min-w-32 object-cover h-24 rounded-lg" />
           <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
             <div className="mt-5 sm:mt-0">
               <h2 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h2>
             </div>
             <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
               <div className="flex items-center border-gray-100">
                 <span onClick={() => decreaseQuantity(item._id)} className={`${darkMode ? "darkBtn": "cartBtn"} cursor-pointer rounded-l bg-gray-100 dark:bg-navy-900 py-1 px-3.5 duration-100`}> - </span>
                 <span className="h-8 w-8 border bg-white dark:bg-navy-800 text-center text-xs outline-none pt-2" >{item.quantity}</span>
                 <span onClick={() => increaseQuantity(item._id)} className={`${darkMode ? "darkBtn": "cartBtn"} cursor-pointer rounded-r bg-gray-100 dark:bg-navy-900 py-1 px-3 duration-100`}> + </span>
               </div>
               <div className="flex items-center space-x-4">
                 <p className="text-sm">&#x20A8;{item.price}</p>
                 <button onClick={() => removeFromCart(item._id)}>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>
          ))}
        

       

        {/* Subtotal and Checkout */}
        <div className="rounded-lg border bg-lightGray dark:bg-navy-800 p-4 shadow-md">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700 dark:text-white">Total Quantity</p>
            <p className="text-gray-700 dark:text-white">{totalQuantity}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700 dark:text-white">Total Items</p>
            <p className="text-gray-700 dark:text-white">{totalItems}</p>
          </div>
          {/* <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div> */}
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">&#x20A8;{grandTotal.toFixed(2)}</p>
            </div>
          </div>

          {isAdmin && 
          <button onClick={()=> handleMakeSale(cartItems, setCartItems, toggleOpenState, calculateTotal)} className={`${darkMode ? "darkBtn": "gradientButton"} mt-6 w-full rounded-md py-1.5 font-medium text-white`}>Make Sale</button>
          }

          {showBtn &&
          <Link to="/orderform">
          <button onClick={()=> toggleOpenState()} className={`${darkMode ? "darkBtn": "gradientButton"} mt-6 w-full rounded-md py-1.5 font-medium text-white`}>Place Order</button>
          </Link>
        }
        </div>
      </div>
    </div>
  );
};

export default Cart;