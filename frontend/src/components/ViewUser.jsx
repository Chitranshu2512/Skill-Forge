import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard({setIsAuthenticated}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const apiUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.get(`${apiUrl}/api/admin/users`, { withCredentials: true });
                setUsers(response.data.users);
                setIsAuthenticated(response.data.authorized);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Registered Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Full Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Phone Number</th>
                            <th className="py-3 px-4 text-left">Institute</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300">
                                <td className="py-3 px-4">{user.fullName}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">{user.phoneNumber}</td>
                                <td className="py-3 px-4">{user.institute}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
