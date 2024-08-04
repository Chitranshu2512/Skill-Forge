import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserForm = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    institute: ''
  });


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the environment variable for the API URL
      const apiUrl = import.meta.env.VITE_BACKEND_URL;


      await axios.post(`${apiUrl}/api/user/register`, formData);
      navigate('/courses');
    } 
    catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="user-form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>User Information</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="institute">Institute:</label>
          <input
            type="text"
            id="institute"
            name="institute"
            value={formData.institute}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
