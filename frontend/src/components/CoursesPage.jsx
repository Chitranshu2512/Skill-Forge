import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import Stats from './Stats';
import FAQs from './FAQs';
import Footer from './Footer';
import HeroSection from './HeroSection';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${apiUrl}/api/user/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
    <HeroSection/>
    <Stats />
    <div id='courses' className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Courses</h2>
      <div className="flex flex-wrap -mx-4">
        {courses.map((course) => (
          <div key={course._id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
    <FAQs />
    <Footer/>
    </>
  );
};

export default CoursesPage;
