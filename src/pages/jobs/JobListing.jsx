// JobListings.jsx
import React from 'react';
import { FaBriefcase, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { LiaMoneyBillWaveSolid } from 'react-icons/lia';
import Pagination from '../../components/common/Pagination';
import { Link } from 'react-router-dom';
const JobListing = ({ jobs, status, error, currentPage, totalPages, handlePageChange }) => {
  return (
    <div>
      <div className="grid grid-cols-1  gap-4">
        {status === 'loading' && (
          <div className="col-span-full flex justify-center items-center h-32">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 border-solid rounded-full animate-spin"></div>
            <span className="ml-2 text-gray-600">Loading</span>
          </div>
        )}
        {status === 'failed' && <p className="text-red-500">{error}</p>}
        {status === 'succeeded' && jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="card  relative p-4  mb-6">
            <div className="flex items-center mb-4">
                            <img
                                src={job.company.logo.url}
                                alt={`${job.company.name} logo`}
                                className="w-12 h-12 mr-4"
                            />
                            <div>
                            <Link to={`/jobs/${job?._id}`}>
                            <h2 className="text-xl font-bold text-primary "> {job.jobTitle}</h2>
                            </Link>
                            <p className="text-sm text-secondaryLightGreen mb-2">
                             {job.jobType}
                        </p>
                                    <p className="text-gray-600">{job.company.description}</p>
                            </div>
                                      </div>
                                      <div className="flex-align-center mb-4">
                            <span className="text-sm text-muted bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 mb-2 flex items-center">
                                <FaBriefcase className="mr-1" /> {job.employmentType}
                            </span>
                            <span className="text-sm text-muted bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 mb-2 flex items-center">
                                <FaUser className="mr-1" /> {job.experienceLevel}
                            </span>
                             <span className="text-sm text-muted bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 mb-2 flex items-center">
                                <FaMapMarkerAlt className="mr-1" /> {job.location}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-2">{job.company.description}</p>
                      
                          <p className="text-sm absolute bottom-2 right-2 text-gray-500 mb-2">
                            <strong>Views:</strong> {job.views}
                        </p>
                        {job.salary && (
                            <div className="w-fit bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded mt-4 flex items-center">
                                <LiaMoneyBillWaveSolid className="mr-2" /> 
                                <span>
                                    ${job.salary.min} - ${job.salary.max} /month
                                </span>
                            </div>
                        )}            
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default JobListing;
