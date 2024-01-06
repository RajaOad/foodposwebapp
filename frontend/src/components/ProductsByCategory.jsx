import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/cart/CartContext';
import { useParams } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { ProductContext } from '../context/product/ProductContext';

const ProductByCategory = () => {
    const { categoryName } = useParams();
    const { fetchProductsByCategory } = useContext(ProductContext)
    const { addToCart } = useContext(CartContext)

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({})
  
  useEffect(() => {

    fetchProductsByCategory(categoryName, setProducts, setCategory);

  }, [])
  

  return (

    <>

     <div className="relative z-10 bg-[#f4f4f4] dark:bg-navy-800 py-12 rounded-lg">
    <div className="container mx-auto">
        <h1 className="text-[4vw] font-bold text-center mb-4 dark:text-white gradientText capitalize">{category.name}</h1>
        <p className="text-center text-gray-900 dark:text-white">{category.description}</p>
    </div>
</div>

    <div className="container mx-auto pb-8 md:py-8">
      <div className='flex flex-wrap justify-center'>
        
        {products.map((product) => (

    <ProductCard key={product._id} product={product} cardStyles={"w-full md:w-80 my-4 md:m-4"} cardHeaderStyles={"h-60 md:h-80"} addToCart={addToCart} />

        ))}

      </div>
    </div>
    </>
  );
};

export default ProductByCategory;
