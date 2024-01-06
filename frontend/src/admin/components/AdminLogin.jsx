// src/components/AdminLogin.js
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../../context/user/UserContext';
import { useNavigate } from 'react-router-dom';

const serverUrl = import.meta.env.VITE_SERVER_URL;

function AdminLogin() {
    const navigate = useNavigate();
    const { authenticated, setAuthenticated, setIsAdmin, isAdmin } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${serverUrl}api/admin/login`, {
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
                    title: "Sala Kutriya Email or Password Dekh Kar Dail Kar",
                    imageUrl: "/alretimg1.png",
                    imageWidth: 400,
                    imageHeight: 300,
                    imageAlt: "Custom image"
                  });
                // Swal.fire({
                //     position: "center",
                //     icon: "error",
                //     title: data.error,
                //     showConfirmButton: false,
                //     timer: 1500
                // });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md w-96">
                <h2 className="text-2xl mb-4 font-semibold text-[#ff6b53]">Admin Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email}
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
                            value={password}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            minLength="4"
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full p-2 bg-[#ff6b53] text-white rounded-md"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
