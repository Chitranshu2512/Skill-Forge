import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, admin }) => {

  const navigate = useNavigate();

  const handleEdit = (courseId) => {
    navigate(`/admin/edit-course/${courseId}`)
  }


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={course.imageUrl} alt={course.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course.title}</div>
        <p className="text-gray-700 text-base">{course.description}</p>
        <ul className="list-disc list-inside mt-2">
          {course.details.slice(0,3).map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          ${course.discountedPrice} (Discounted)
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          ${course.actualPrice} (Original)
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {course.duration}
        </span>
      </div>
      <div className="px-6 pt-4 pb-2">
        {admin ? (
          <button 
          onClick={() => handleEdit(course._id)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            Edit Course
          </button>
        ) : (
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
