import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  
  const initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [totalItems, setTotalItems] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const { totalQuantity: calculatedTotalQuantity, totalItems: calculatedTotalItems } = calculateTotal();
    setTotalQuantity(calculatedTotalQuantity);
    setTotalItems(calculatedTotalItems);
  }, [cartItems]);

  const toggleOpenState = () => {
    setIsOpen(!isOpen);
  };

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
    const totalItems = cartItems.length;
    const grandTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return { totalQuantity, totalItems, grandTotal };
  };

  const addToCart = (product) => {

    Swal.fire({
      toast: true,
      position: 'top-start',
      icon: 'success',
      title: 'Added to Cart!',
      showConfirmButton: false,
      timer: 1000,
      width: '15rem',
      padding: '0.75rem',
    });
    
    const existingItemIndex = cartItems.findIndex(item => item._id === product._id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      setCartItems(prevCart => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCart);

    if (updatedCart.length <= 0) {
      toggleOpenState();
    }
  };



  return <CartContext.Provider value={{ isOpen, setIsOpen, cartItems, setCartItems, increaseQuantity, decreaseQuantity, addToCart, toggleOpenState, removeFromCart, calculateTotal }}>{children}</CartContext.Provider>
}