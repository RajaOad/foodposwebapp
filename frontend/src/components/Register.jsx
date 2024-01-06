// src/components/Register.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../context/user/UserContext';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const Register = () => {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(UserContext);
  const [passwordMismatch, setPasswordMismatch] = useState(false);


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { username, email, password, confirmPassword } = formData;

  useEffect(() => {
    if(authenticated) {
      navigate('/');
    }

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }

  }, [confirmPassword])

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${serverUrl}register`, {
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
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        })
        navigate('/');
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: data.error,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-navy-900">
      <form
        onSubmit={handleSubmit}
        className="bg-lightGray dark:bg-navy-800 p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4 text-[#ff6b53]">Register</h2>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 rounded border bg-[#f4f4f4] dark:bg-navy-900"
            minLength={4}
            required
          />
        </div>
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
            minLength={8}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-2 rounded border bg-[#f4f4f4] dark:bg-navy-900"
            minLength={8}
            required
          />
          {passwordMismatch ? (
  <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
) : (
  password && confirmPassword && (
    <p className="text-green-500 text-sm mt-1">Passwords match.</p>
  )
)}

        </div>
        <button
          type="submit"
          className="w-full p-2 bg-[#ff6b53] text-white rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
