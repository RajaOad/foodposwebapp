// src/components/AdminRegister.js
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../../context/user/UserContext';
import { useNavigate } from 'react-router-dom';

const serverUrl = import.meta.env.VITE_SERVER_URL;

function AdminRegister() {
    const navigate = useNavigate();
    const { authenticated, setAuthenticated, setIsAdmin } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const { password, confirmPassword } = formData;

    useEffect(() => {
        // if(authenticated) {
        //     navigate('/');
        //   }      

        if (password !== confirmPassword) {
            setPasswordMismatch(true);
          } else {
            setPasswordMismatch(false);
          }

    }, [formData.confirmPassword])
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${serverUrl}admin/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('authToken', data.authToken);
                setIsAdmin(data.isAdmin)
                setAuthenticated(true);
                navigate('/');
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1500
                  });
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
            console.log(error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md w-96">
                <h2 className="text-2xl mb-4 font-semibold text-[#ff6b53]">Admin Registration</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            minLength="4"
                            required 
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required 
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            minLength="8"
                            required 
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            minLength="8"
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
                        className="w-full p-2 bg-[#ff6b53] text-white rounded-md"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminRegister;
