


import React from 'react';

const Cart2 = ({ cartItems, setCartItems }) => {

 
    const increaseQuantity = (productId) => {
        const updatedCart = cartItems.map(item => 
          item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCart);
      };
    
      const decreaseQuantity = (productId) => {
        const updatedCart = cartItems.map(item => 
          item._id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0);
        setCartItems(updatedCart);
      };
    
      const calculateTotal = () => {
        const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        const grandTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        return { totalQuantity, grandTotal };
      };
    
      const handleMakeSale = async () => {
        try {
          const saleItems = cartItems.map(item => ({
            product: item._id,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity
          }));
    
          const { totalQuantity, grandTotal } = calculateTotal();
    
          const response = await fetch('http://localhost:3001/api/sale', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              products: saleItems,
              totalQuantity,
              grandTotal
            })
          });
    
          if (response.ok) {
            // Clear the cart after successful sale
            setCartItems([]);
            alert('Sale completed successfully!');
          } else {
            alert('Failed to complete sale. Please try again.');
          }
    
        } catch (error) {
          console.error('Error making sale:', error);
          alert('An error occurred while making the sale. Please try again.');
        }
      };
    
      const { totalQuantity, grandTotal } = calculateTotal();
  return (
    <div className="h-full m-4">
      <button className="bg-blue-500 text-white p-2 rounded">Open Cart</button>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl mb-2">Cart Items:</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} className="flex justify-between items-center mb-2">
              <span>{item.name} - ${item.price} - Quantity: {item.quantity}</span>
              <div>
                <button onClick={() => increaseQuantity(item._id)} className="bg-green-500 text-white p-2 rounded mr-2">+</button>
                <button onClick={() => decreaseQuantity(item._id)} className="bg-red-500 text-white p-2 rounded">-</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <strong>Total Quantity:</strong> {totalQuantity}
        </div>
        <div className="mt-2">
          <strong>Grand Total:</strong> ${grandTotal.toFixed(2)}
        </div>
        <button onClick={handleMakeSale} className="bg-green-500 text-white p-2 mt-4 rounded">Make Sale</button>
      </div>
    </div>
  );
};

export default Cart2;

