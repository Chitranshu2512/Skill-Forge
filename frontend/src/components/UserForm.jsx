import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import axios from 'axios';

const UserForm = () => {
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
        await axios.post(`${apiUrl}/api/user/register`, formData);
        navigate('/courses');
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">

      
      <div className="md:w-1/2 w-full h-full ">
        <ImageSlider />
      </div>

      
      <div className="md:w-1/2 w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg border border-gray-200 p-1 animation-fadeIn">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 m-2">User Information</h2>
          <form className="space-y-4 p-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder='Enter your name'
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-1">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder='Enter your phone'
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="institute" className="block text-gray-700 font-medium mb-1">Institute:</label>
              <input
                type="text"
                id="institute"
                name="institute"
                placeholder='(optional)'
                value={formData.institute}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              />
            </div>

            <div className="flex justify-center">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
