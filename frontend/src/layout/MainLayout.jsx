import React from 'react'
import Layout from './Layout'
import AdminLayout from '../admin/layouts/index';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ComplexNavbar } from '../components/Navbar';
import Footer from '../components/Footer';
import WelcomePage from '../components/WelcomePage';
import AdminRegister from '../admin/components/AdminRegister';
import AdminLogin from '../admin/components/AdminLogin';


const MainLayout = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>

      {!isAdminRoute && <ComplexNavbar />}

      <div className='mx-8 md:mx-12'>
        <Layout />
      </div>

      {!isAdminRoute && <Footer />}

      <Routes>
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="admin/register" element={<AdminRegister />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route exact path="/welcome" element={<WelcomePage />} />
      </Routes>

    </>
  )
}

export default MainLayout