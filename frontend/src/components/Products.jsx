import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/cart/CartContext';
import { CardSkeleton } from './CardSkeleton';
import { UserContext } from '../context/user/UserContext';
import { ProductContext } from '../context/product/ProductContext';
import { ProductCard } from './ProductCard';
import { useDarkMode } from '../context/darkmode/DarkModeContext';

const Products = () => {
  const navigate = useNavigate();
  const { authenticated, authToken } = useContext(UserContext);
  const { addToCart } = useContext(CartContext)
  const { products } = useContext(ProductContext)

  const { darkMode } = useDarkMode();

  const [showSkeleton, setShowSkeleton] = useState(true);



  useEffect(() => {
    // Fetch products from backend

    if (!authenticated) {
      navigate('/login');
    }

  }, []);

  useEffect(() => {
    // This will hide the skeleton after 2 seconds
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);










  if (showSkeleton) {
    return (
      <div className='container mx-auto p-4'>
        <CardSkeleton />
      </div>
    );
  }

  if (products.length <= 0) {

    return (
<div className="flex items-center text-center justify-center min-h-screen bg-gray-100 dark:bg-navy-900">
  <div className="bg-white p-8 rounded-lg shadow-md dark:bg-navy-800">
    <h1 className="text-5xl font-bold text-[#ff6b53] dark:text-gray-500 mb-6">No Items Available</h1>
    <p className="text-xl text-gray-600 mb-8">We apologize, but currently, there are no items available.</p>
    <p className="text-gray-500 text-center">Kindly revisit us later for our updated menu</p>
  </div>
</div>
    )
  }


  return (

    <>

      <div className="relative z-10 bg-[#f4f4f4] dark:bg-navy-900 py-12 rounded-lg">
        <div className="container mx-auto">
          <h1 className="text-[4vw] font-bold text-center mb-4 dark:text-white gradientText capitalize">Explore Our Menu</h1>
          <p className="text-center text-gray-900 dark:text-white">From mouthwatering burgers to crispy fries, discover our diverse range of offerings crafted just for you.</p>
        </div>
      </div>

      <div className="container pb-8 md:py-8">
        <div className='flex flex-wrap justify-center'>

          {products.map((product) => (

            <ProductCard key={product._id} product={product} cardStyles={"w-full md:w-80 my-4 md:m-4"} cardHeaderStyles={"h-60 md:h-80"} addToCart={addToCart} darkMode={darkMode} />

          ))}

        </div>
      </div>
    </>
  );
};

export default Products;
