// src/components/Login.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../context/user/UserContext';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const Login = () => {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  useEffect(() => {
    if(authenticated) {
      navigate('/');
    }
  }, [])
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${serverUrl}api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (data.success) {
        localStorage.setItem('authToken', data.authToken);
        setAuthenticated(true);
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.msg,
          showConfirmButton: false,
          timer: 1500
        });
        setFormData({
          email: '',
    password: '',
        })
        navigate('/');
      } else {
        Swal.fire({
          title: "Sala Kutriya Email or Password Dekh Kar Dail Kar",
          imageUrl: "/alretimg1.png",
          imageWidth: 400,
          imageHeight: 300,
          imageAlt: "Custom image"
        });
        // Swal.fire({
        //   position: "center",
        //   icon: "error",
        //   title: data.error,
        //   showConfirmButton: false,
        //   timer: 1500
        // });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-navy-900">
      <form
        onSubmit={handleSubmit}
        className="bg-lightGray dark:bg-navy-800 p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4 text-[#ff6b53]">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 rounded border bg-[#f4f4f4] dark:bg-navy-900"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 rounded border bg-[#f4f4f4] dark:bg-navy-900"
            minLength={4}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-[#ff6b53] text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
