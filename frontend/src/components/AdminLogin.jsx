import React, { useState } from 'react';
import axios from 'axios';

function AdminLogin({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            await axios.post(`${apiUrl}/api/admin/login`, formData, {withCredentials: true});
            setIsAuthenticated(true);
        } catch (error) {
            console.log("Error while logging in admin:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="userName" className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md border-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md border-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md border-gray-300"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
