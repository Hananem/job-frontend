import React from 'react';
import { FaBriefcase, FaRegLightbulb, FaPeopleArrows } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-main dark:bg-dark-main py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-700 dark:text-slate-300 mb-8">About Us</h2>
        <div className="flex flex-col items-center mb-12">
          <img
            src="https://via.placeholder.com/800x400"
            alt="Team"
            className="w-full h-auto rounded-lg shadow-light dark:shadow-none"
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <FaRegLightbulb className="w-8 h-8 text-primary dark:text-primary-light mr-3" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Our Mission</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              We connect job seekers with their ideal careers through a seamless, user-friendly experience.
            </p>
          </div>

          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <FaBriefcase className="w-8 h-8 text-primary dark:text-primary-light mr-3" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Our Story</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Since our inception, we have been committed to transforming the job search experience with innovative solutions.
            </p>
          </div>

          <div className="md:w-1/3">
            <div className="flex items-center mb-4">
              <FaPeopleArrows className="w-8 h-8 text-primary dark:text-primary-light mr-3" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Our Team</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Our dedicated team works tirelessly to ensure that both job seekers and employers find what they need with ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
