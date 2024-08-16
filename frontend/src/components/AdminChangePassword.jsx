import React, { useState } from 'react';
import axios from 'axios';

function AdminChangePassword() {
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const handleChangePassword = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            await axios.post(`${apiUrl}/api/admin/changePassword`, passwords, { withCredentials: true });
            setError(''); // Clear any existing errors on success
            alert('Password changed successfully!');
        } catch (error) {
            console.error("Error changing password:", error);
            setError("Failed to change password.");
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Change Password</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={passwords.oldPassword}
                    onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                />

                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                />

                <button
                    onClick={handleChangePassword}
                    className="w-full bg-red-700 text-white p-3 rounded-md hover:bg-red-600 transition duration-300"
                >
                    Change Password
                </button>
            </div>
        </div>
    );
}

export default AdminChangePassword;
