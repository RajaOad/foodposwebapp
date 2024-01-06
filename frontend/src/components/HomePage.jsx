import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCarousel from './ProductCarousel';
import { HomeCardSkeleton } from './HomeCardSkeleton';
import { UserContext } from '../context/user/UserContext';
import { ProductContext } from '../context/product/ProductContext';
import Swal from 'sweetalert2';
import { CategoryCard } from './CategoryCard';
import { CategoryContext } from '../context/category/CategoryContext';
import { useDarkMode } from '../context/darkmode/DarkModeContext';
import HomeTextEffect from './HomeTextEffect';

const HomePage = () => {
  const navigate = useNavigate();
  const { authenticated, authToken, isAdmin } = useContext(UserContext);
  const { products } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const { darkMode } = useDarkMode();



  const [showSkeleton, setShowSkeleton] = useState(true);

  const showAlret = ()=> {
    Swal.fire({
      title: "Sala Halkat",
      imageUrl: "/alretimg1.png",
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: "Custom image"
    });
  }

  const alret2 = ()=> {
    Swal.fire({
      title: "Sala Halkat",
      imageUrl: "alretimg2.png",
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: "Custom image"
    });
   

  }


  useEffect(() => {

    if(!authenticated) {
      Swal.fire({
        title: "Sala Halkat",
        imageUrl: "alretimg2.png",
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: "Custom image"
      });
      navigate('/login');
    }

  }, [authToken]);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if(showSkeleton) {

    return (
      <>
          <div>
            <div className="flex justify-center items-center w-full h-full px-8 pt-0 pb-14">
              
              <HomeCardSkeleton />
  
            </div>
          </div>
      </>
    );

  }

 
  if (isAdmin && products.length <= 0) {
    return (
<div className="min-h-screen flex items-center justify-center">
  <div className="bg-lightGray dark:bg-navy-800 p-14 rounded-lg shadow-xl text-center transform hover:scale-105 transition-transform duration-300">
    <h1 className="text-6xl font-extrabold  gradientText dark:text-white mb-10 tracking-wide">Welcome to Our POS System</h1>
    <p className="text-2xl text-gray-900 dark:text-white mb-12 leading-relaxed"> Efficiently manage your sales, inventory, and customers with ease.</p>
    <div className="flex justify-center space-x-8">
      <Link to="/admin/products">
      <button className={`${darkMode ? "dark:bg-navy-600": "gradientButton"} text-white dark:hover:bg-navy-900 py-3 px-10 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105`}>
        Start Your Journey
      </button>
      </Link>
      <Link to="/admin/products">
      <button className="bg-gray-700/50 hover:bg-gray-700 dark:bg-navy-700 dark:hover:bg-navy-900 text-gray-100 py-3 px-10 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        Explore Features
      </button>
      </Link>
    </div>
  </div>
</div>
    );
  }

    return (
      <>
      {/* <button onClick={showAlret} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md">
    Show Alret
</button>
      <button onClick={alret2} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md">
    Show Alret
</button> */}

      <div className='h-[100vh] md:h-[90vh] space-x-8 flex justify-center md:justify-between flex-col-reverse md:flex-row md:items-center md:p-8'>
      {!isAdmin && <div className="animatedTextContainer">
      <HomeTextEffect textStyles={"text-[4vw] border-b"} mainText="WELCOME TO" spanText="BRAND NAME" />
      <HomeTextEffect textStyles={"text-[4vw] border-b"} mainText="SAVOR THE FLAVORS" spanText="DELICIOUS BURGERS" />
      <HomeTextEffect textStyles={"text-[4vw] border-b"} mainText="CRISP & TASTY" spanText="FRESH-CUT FRIES" />
      <HomeTextEffect textStyles={"text-[4vw] border-b"} mainText="SANDWICH BLISS" spanText="PERFECTION" />
      <HomeTextEffect textStyles={"text-[4vw] border-b"} mainText="EXPLORE OUR MENU" spanText={<Link className='animatedTextLink' to="/menu" rel="noopener noreferrer">VIEW MENU</Link>} />
      {/* <HomeTextEffect textStyles={"text-[4vw] border-b"} mainText="CONNECT WITH US" spanText={<a className='animatedTextLink' href="#" target="_blank" rel="noopener noreferrer">GET IN TOUCH</a>} /> */}
    </div>}

    <div  className={`w-full ${isAdmin ? 'md:w-[60%] mx-auto': 'md:w-[50%]'} mb-24 md:mb-0`}>
      <ProductCarousel products={products} />
    </div>

      </div>
{/* <div className='pt-32'>

<div className="animatedTextContainer h-[100vh]">
      <HomeTextEffect textStyles={"text-[8vw]"} mainText="SAVOR THE FLAVORS" spanText="DELICIOUS BURGERS" />
      <HomeTextEffect textStyles={"text-[8vw]"} mainText="CRISP & TASTY" spanText="FRESH-CUT FRIES" />
      <HomeTextEffect textStyles={"text-[8vw]"} mainText="SANDWICH BLISS" spanText="PERFECTION" />
      <HomeTextEffect textStyles={"text-[8vw]"} mainText="EXPLORE OUR MENU" spanText={<a className='animatedTextLink' href="/menu" target="_blank" rel="noopener noreferrer">VIEW MENU</a>} />
      <HomeTextEffect textStyles={"text-[8vw]"} mainText="CONNECT WITH US" spanText={<a className='animatedTextLink' href="/contact" target="_blank" rel="noopener noreferrer">GET IN TOUCH</a>} />
    </div>
</div> */}

{/* <div className="animatedTextContainer">
  <TextEffect textStyles={"text-[8vw] border-b"} mainText="DELIGHTFUL DISHES" spanText="FOR EVERY PALATE" />
  <TextEffect textStyles={"text-[8vw] border-b"} mainText="FROM THE GRILL" spanText="JUICY BURGERS & MORE" />
  <TextEffect textStyles={"text-[8vw] border-b"} mainText="CRISPY SIDES" spanText="IRRESISTIBLE FRIES" />
  <TextEffect textStyles={"text-[8vw] border-b"} mainText="SANDWICH SELECTION" spanText="A BITE OF BLISS" />
  <TextEffect textStyles={"text-[8vw] border-b"} mainText="DISCOVER FLAVORS" spanText="FROM OUR KITCHEN" />
  <TextEffect textStyles={"text-[8vw] border-b"} mainText="EXPERIENCE" spanText="AUTHENTIC TASTE" />
</div> */}

      <div>

    {categories.length > 0 && <div className='md:py-24'>
      
    <div className="relative z-10 bg-[#f4f4f4] dark:bg-navy-800 mb-12 rounded-lg">
    <div className="container mx-auto px-4">
        <h1 className="text-[4vw] font-bold text-center mb-4 dark:text-white gradientText capitalize">Explore Our Categories</h1>
        <p className="text-center text-gray-900 dark:text-white">From savory burgers to crispy fries, navigate through our diverse categories to find your perfect meal.</p>
    </div>
</div>

      <div className='flex flex-wrap flex-row justify-center'>

         {categories.map((category)=> (

<CategoryCard key={category._id} category={category} />

         ))}


      </div>

      </div>}


      </div>
      
      </>
    )

}

export default HomePage