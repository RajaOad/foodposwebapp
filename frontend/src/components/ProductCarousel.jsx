// ProductCarousel.js
import React, { useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CartContext } from '../context/cart/CartContext';
import CarouselCard from './CarouselCard';
import { UserContext } from '../context/user/UserContext';

const ProductCarousel = ({ products }) => {

  const { addToCart } = useContext(CartContext);
  const { isAdmin } = useContext(UserContext);

  let settings;

if(isAdmin) {

  settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  

} else {

  settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

}

  return (
    <>
    <div>
    <Slider {...settings}>
      {products.map((product) => (


        <div key={product._id}>
          <div className="flex justify-center items-center w-full h-full">
        
          {/* <ProductCard product={product} cardStyles={"w-3/5 m-4 mb-0"}   cardHeaderStyles={"h-96 cursor-pointer"} addToCart={addToCart} /> */}
          <CarouselCard product={product} addToCart={addToCart} />
          </div>
        </div>

        
      ))}
    </Slider>
    </div>
    </>
  );
};

export default ProductCarousel;
