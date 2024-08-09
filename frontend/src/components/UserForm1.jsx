import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserForm1 = ({ setIsRegistered }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    institute: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    let errors = { fullName: '', email: '', phoneNumber: '' };

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10 digits';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {

      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL;
        await axios.post(`${apiUrl}/api/user/register`, formData, {withCredentials: true});
        setIsRegistered(true);
      } catch (error) {
        console.error('Error registering user:', error);
      }

    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>
          <div>
            <label htmlFor="institute" className="block text-gray-700">Institute</label>
            <input
              type="text"
              id="institute"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-gray-300"
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm1;
