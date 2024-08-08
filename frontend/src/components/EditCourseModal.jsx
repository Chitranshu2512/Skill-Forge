import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

function EditCourseModal() {
    const { courseId } = useParams();
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        details: '',
        imageUrl: '',
        discountedPrice: '',
        actualPrice: '',
        duration: '',
      });

      useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await axios.get(`${apiUrl}/api/admin/editCourse/${courseId}`)
            const course = response.data;
            const detailsString = course.details.join('\n');
            course.details = detailsString
            setCourseData(course);
            // setDetails(detailsString);
            
          } catch (error) {
            console.error('Failed to fetch courses:', error);
          }
        };
    
        fetchCourses();
      }, []);

      const handleChange = (e) => {
        setCourseData({
          ...courseData,
          [e.target.name]: e.target.value,
        });
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${apiUrl}/api/admin/updateCourse/${courseId}`, {
            ...courseData,
            details: courseData.details.split('\n'), // Convert newline-separated details to an array
          });
          console.log('Course updated:', response.data);
          alert("course updated successfully")
          
        } catch (error) {
          console.error('Failed to update course:', error);
        }
      };

    return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Details</label>
          <textarea
            name="details"
            value={courseData.details}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter each detail on a new line"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={courseData.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Discounted Price</label>
            <input
              type="number"
              name="discountedPrice"
              value={courseData.discountedPrice}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Actual Price</label>
            <input
              type="number"
              name="actualPrice"
              value={courseData.actualPrice}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="text"
            name="duration"
            value={courseData.duration}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditCourseModal

