import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FAQs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const faqItems = [
    {
      question: 'What will I learn from this eBook?',
      answer:
        'You will learn how to build a full-stack web application using the MERN stack. This eBook covers topics such as setting up the development environment, creating a RESTful API, building a user interface with React, connecting to a MongoDB database, and deploying your application. You’ll also learn best practices and tips for MERN development.',
    },
    {
      question: 'Is this eBook up-to-date with the latest versions of MERN stack components?',
      answer:
        'This eBook ensures you’re at the forefront of web development, providing you with the most up-to-date and relevant knowledge for secure, high-performance applications. With a focus on the latest MERN stack versions, this eBook equips you with the tools, practices, and skills required to excel in today’s ever-evolving development landscape.',
    },
    {
      question: 'Do I need prior programming experience to use this eBook?',
      answer:
        'Some prior programming experience is beneficial, but this eBook provides explanations and examples that are accessible to beginners. If you’re new to web development or JavaScript, it’s recommended to learn the basics first, but the eBook will still be a valuable resource.',
    },
    {
      question: 'Can I use the knowledge from this eBook to build production-ready applications?',
      answer:
        'Yes, the eBook is designed to give you the knowledge and skills needed to build production-ready MERN applications. However, building production applications may require additional considerations like security, scalability, and best practices, which you can explore further after mastering the fundamentals presented in this eBook.',
    },
    {
      question: 'Who is this eBook for?',
      answer:
        'This eBook is for web developers, both beginners and experienced, who want to learn how to build web applications using the MERN stack. It covers a wide range of topics, from the basics to advanced concepts, making it suitable for various skill levels.',
    },
  ];

  return (
    <section className="bg-gray-50">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 lg:text-6xl">
          Frequently Asked Questions
        </h1>
        <div className="mt-12 space-y-8">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-md overflow-hidden"
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-aos="fade-up"
            >
              <button className="flex items-center justify-between w-full p-6 bg-white hover:bg-gray-50 transition duration-300">
                <h1
                  className="font-semibold text-xl text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: item.question,
                  }}
                ></h1>
                <span className="text-blue-500 bg-gray-200 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-6 h-6 transform transition-transform duration-300 ${hoveredIndex === index ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {hoveredIndex === index && (
                <div>
                  <hr className="border-gray-200" />
                  <p
                    className="p-6 text-gray-600 bg-gray-100"
                    dangerouslySetInnerHTML={{
                      __html: item.answer,
                    }}
                  ></p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
