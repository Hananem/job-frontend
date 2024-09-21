import React from 'react';
import { FaSearch, FaHandshake, FaCheckCircle } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <div className="bg-gradient-to-r from-primary-light to-secondaryLightGreen py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-slate-800 dark:text-slate-200 mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="flex-1 bg-white dark:bg-dark-card p-8 rounded-xl shadow-xl dark:shadow-none mb-8 md:mb-0">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full shadow-lg">
                <FaSearch className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Search Jobs</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Use our advanced search filters to find the perfect job match based on your skills, location, and preferences.
            </p>
          </div>

          <div className="flex-1 bg-white dark:bg-dark-card p-8 rounded-xl shadow-xl dark:shadow-none mb-8 md:mb-0">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full shadow-lg">
                <FaHandshake className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Apply Easily</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Submit your application directly through our platform with a few clicks. Track your application status in real-time.
            </p>
          </div>

          <div className="flex-1 bg-white dark:bg-dark-card p-8 rounded-xl shadow-xl dark:shadow-none">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full shadow-lg">
                <FaCheckCircle className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Get Hired</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Receive job offers and secure your dream job. We’re here to support you throughout your career journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
