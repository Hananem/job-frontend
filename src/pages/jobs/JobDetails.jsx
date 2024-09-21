import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobById } from '../../redux/jobSlice';
import { useParams } from 'react-router-dom';
import UpdateJob from './UpdateJob';
import DeleteJob from './DeleteJob'; 
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { FaMapMarkerAlt, FaDollarSign, FaBriefcase } from 'react-icons/fa';
import { IoMdPaperPlane } from 'react-icons/io';
import { PiGraduationCapLight } from 'react-icons/pi';
import { TbClockHour7 } from 'react-icons/tb';

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedJob, status, error } = useSelector((state) => state.jobs);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [showDropdown, setShowDropdown] = useState(false);
  const userId = useSelector((state) => state.user?.user?.user?._id);

  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  if (status === 'loading') return <div className="text-center py-4">Loading...</div>;
  if (status === 'failed') return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  if (!selectedJob) return <div className="text-center py-4">No job found</div>;

  return (
    <div className="p-4 card mt-10 sm:p-6 md:p-8 ">
      <div className="relative flex flex-col md:flex-row items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 md:mr-4">{selectedJob.jobTitle}</h1>
        {selectedJob.postedBy._id === userId && (
          <div className="relative">
            <FaEllipsisV 
              className="text-lg cursor-pointer" 
              onClick={toggleDropdown} 
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 card border border-gray-200 rounded shadow-lg z-10">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={toggleUpdateModal}>
                    <FaEdit className="inline-block mr-2" /> Edit
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={toggleDeleteModal}>
                    <FaTrash className="inline-block mr-2" /> Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mb-4">
        {selectedJob.company.logo && (
          <img 
            src={selectedJob.company.logo.url} 
            alt={`${selectedJob.company.name} logo`} 
            className="w-24 h-24 object-contain mb-4" 
          />
        )}
        <p className="mb-2"> {selectedJob.company.name}</p>
        <p className="mb-2"> {selectedJob.company.description}</p>
        <p className="mb-2 flex items-center"><FaBriefcase className="mr-2"/> {selectedJob.experienceLevel}</p>
        <p className="mb-2 flex items-center"><IoMdPaperPlane className="mr-2"/> {selectedJob.jobType}</p>
        <p className="mb-2 flex items-center"><TbClockHour7 className="mr-2"/> {selectedJob.employmentType}</p>
        <p className="mb-2 flex items-center"><PiGraduationCapLight className="mr-2"/> {selectedJob.educationLevel}</p>
        <p className="mb-2 flex items-center"><MdOutlineMail className="mr-2"/> {selectedJob.company.contactEmail}</p>
        <p className="mb-2 flex items-center"><FaMapMarkerAlt className="mr-2"/> {selectedJob.location}</p>
        <p className="mb-2 flex items-center"><FaDollarSign className="mr-2"/> ${selectedJob.salary.min} - ${selectedJob.salary.max}</p>
      </div>

      <div className="mb-6">
        <p><strong>Requirements:</strong> {selectedJob.requirements.join(', ')}</p>
        <p><strong>Responsibilities:</strong> {selectedJob.responsibilities.join(', ')}</p>
      </div>

      {/* Update Job Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <UpdateJob 
              isOpen={showUpdateModal}
              onClose={toggleUpdateModal}
              jobId={id}
            />
          </div>
        </div>
      )}

      {/* Delete Job Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <DeleteJob
              isOpen={showDeleteModal}
              onClose={toggleDeleteModal}
              jobId={id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;




