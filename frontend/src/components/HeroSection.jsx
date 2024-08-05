import React from 'react';
import 'aos/dist/aos.css';

const HeroSection = () => {

  const scrollToCourses = () => {
    const element = document.getElementById('courses');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 relative overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" data-aos="fade-up">Welcome to SkillForge</h1>
        <p className="text-xl md:text-2xl mb-8" data-aos="fade-up" data-aos-delay="200">
          Empowering you with the skills to succeed in your career.
        </p>
        <button
          onClick={scrollToCourses}
          className="bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Explore Courses
        </button>
      </div>
      <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-wave-pattern bg-repeat-x"></div>
    </section>
  );
};

export default HeroSection;