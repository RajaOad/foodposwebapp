import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import Register from '../components/Register';
import Login from '../components/Login';
import SingleSale from '../components/SingleSale';
import AddProduct from '../components/AddProduct';
import ProfilePage from '../components/ProfilePage';
import Sales from '../components/Sales';
import Products from '../components/Products';
import Cart from '../components/Cart';
import Overlay from '../components/Overlay';
import { CartContext } from '../context/cart/CartContext';
import ProductByCategory from '../components/ProductsByCategory';
import OrderForm from '../components/OrderForm';
import SingleOrder from '../components/SingleOrder';
import  Orders from '../components/Orders';

const Layout = () => {


    const { isOpen, toggleOpenState } = useContext(CartContext)


  return (
    <>

        <Overlay show={isOpen} onClose={toggleOpenState} />

        <Routes>

          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/sales" element={<Sales />} />
          <Route path="/sales/:id" element={<SingleSale />} />
          <Route exact path="/menu" element={<Products />} />
          <Route exact path="/addproduct" element={<AddProduct />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/orderform" element={<OrderForm />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/order/:id" element={<SingleOrder />} />
          <Route path="/products/:categoryName" element={<ProductByCategory />} />
          
        </Routes>

      {isOpen && <Cart cartStyles={"fixed top-0 right-0 h-screen w-1/2 shadow-md overflow-y-auto z-50"} showBtn={true} />}

    
    </>
  )
}

export default Layout