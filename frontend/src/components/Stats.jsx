import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';

const Stats = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Achievements</h2>
        <div className="flex flex-wrap -mx-4 text-center">
          {[
            { title: 'Downloads', value: 2700 },
            { title: 'Projects', value: 100 },
            { title: 'Backend Projects', value: 50 },
            { title: 'Placement Questions', value: 300 },
          ].map((stat, index) => (
            <div key={index} className="w-full md:w-1/4 px-4 mb-8" data-aos="zoom-in">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-4xl font-bold text-blue-600">
                  <CountUp start={0} end={stat.value} duration={2.5} separator="," />
                </h3>
                <p className="mt-2 text-gray-600">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
