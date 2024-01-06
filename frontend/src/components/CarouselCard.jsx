import React, { useContext } from 'react';
import { useDarkMode } from '../context/darkmode/DarkModeContext';
import { UserContext } from '../context/user/UserContext';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const CarouselCard = ({ product, addToCart }) => {
  const { darkMode } = useDarkMode();
  const { isAdmin } = useContext(UserContext);

  return (
    <div className={`relative carouselCard w-full ${!isAdmin ? 'md:w-4/5' : 'mx-4'} h-[60vh] md:h-[80vh] overflow-hidden rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300`}>
      <img
        src={(serverUrl + product.imageUrl) || ""}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover filter brightness-75 rounded-lg"
      />
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-10 bg-gradient-to-t from-black via-transparent to-transparent text-white">

        {/* Large Header */}
        <div className="col-span-3 row-span-1 flex items-center justify-center bg-opacity-80">
          <h3 className="text-4xl font-extrabold">{product.name}</h3>
        </div>

        {/* Description */}
        <div className="col-span-2 row-span-2 flex items-end justify-start bg-opacity-60">
          <p className="text-lg opacity-80 pl-4"></p>
        </div>

        {/* Price */}
        <div className="col-span-1 row-span-2 flex items-start justify-end bg-opacity-70">
          <p className="text-3xl font-semibold pr-4">&#x20A8;{product.price}</p>
        </div>

        {!isAdmin ? (<div className='relative carouselCardBtn'>
          <div className='fork w-6 absolute'>
            <img src="/fork2.png" alt="" className='w-full' />
          </div>
          <div className="carouselCardBtn col-span-1 row-span-1 flex items-start justify-center bg-opacity-80">
            <button onClick={() => addToCart(product)}
              className={`${darkMode ? "bgDarkFull" : "gradientButton"} px-8 py-3 dark:bg-navy-900 text-white dark:hover:bg-navy-800 font-semibold rounded-full shadow-md hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400`}
            >
              Add
            </button>
          </div>
          <div className='knife w-6 absolute'>
            <img src="knife2.png" alt="" className='w-full' />
          </div>
        </div>) : (

          <div className="col-span-1 row-span-1 flex items-start justify-center bg-opacity-80">
            <button onClick={() => addToCart(product)}
              className={`${darkMode ? "bgDarkFull" : "gradientButton"} px-8 py-3 dark:bg-navy-900 text-white dark:hover:bg-navy-800 font-semibold rounded-full shadow-md hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400`}
            >
              Add
            </button>
          </div>

        )}

        {/* Small Design Elements */}
        <div className="col-span-1 row-span-1 bg-opacity-50">
          {/* Small square or any design element for visual appeal */}
          <div className="w-6 h-6 bg-red-500 rounded-full mx-auto my-4 shadow-glow-red cursor-pointer"></div>
        </div>
        <div className="col-span-1 row-span-1 bg-opacity-50">
          {/* Another small design element */}
          <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto my-4 shadow-glow-blue cursor-pointer"></div>
        </div>
        <div className="col-span-1 row-span-1 bg-opacity-50">
          {/* Another small design element */}
          <div className="w-5 h-5 bg-green-500 rounded-full mx-auto my-4 shadow-glow-green cursor-pointer"></div>
        </div>
        <div className="col-span-1 row-span-1 bg-opacity-50">
          {/* Another small design element */}
          <div className="w-7 h-7 bg-yellow-500 rounded-full mx-auto my-4 shadow-glow-yellow cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
