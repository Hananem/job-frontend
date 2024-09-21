import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJob } from '../../redux/jobSlice';

const AddJobForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Get the user token from Redux state

  const [jobData, setJobData] = useState({
    jobTitle: '',
    location: '',
    experienceLevel: '',
    employmentType: '',
    salary: { min: '', max: '' },
    educationLevel: '',
    jobType: '',
    responsibilities: '',
    requirements: '',
    companyName: '',
    companyLogo: null, // For file upload
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setJobData({
      ...jobData,
      companyLogo: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(jobData).forEach((key) => {
      if (Array.isArray(jobData[key])) {
        formData.append(key, JSON.stringify(jobData[key]));
      } else if (jobData[key] !== null) {
        formData.append(key, jobData[key]);
      }
    });

    dispatch(addJob({ jobData: formData, token: user.token }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
    <h1 className="text-2xl font-bold mb-4">Add New Job</h1>
  
    <div className="form-input w-full relative mb-4">
      <input
        type="text"
        name="jobTitle"
        value={jobData.jobTitle}
        onChange={handleChange}
        placeholder=" "
        className="input p-2 w-full border rounded peer"
        id="jobTitle"
      />
      <label htmlFor="jobTitle" className="absolute left-2 top-2 text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500 transition-all">
        Job Title
      </label>
    </div>
  
    <div className="form-input w-full relative mb-4">
      <input
        type="text"
        name="location"
        value={jobData.location}
        onChange={handleChange}
        placeholder=" "
        className="input p-2 w-full border rounded peer"
        id="location"
      />
      <label htmlFor="location" className="absolute left-2 top-2 text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500 transition-all">
        Location
      </label>
    </div>
  
    <div className="form-input w-full relative mb-4">
      <input
        type="text"
        name="experienceLevel"
        value={jobData.experienceLevel}
        onChange={handleChange}
        placeholder=" "
        className="input p-2 w-full border rounded peer"
        id="experienceLevel"
      />
      <label htmlFor="experienceLevel" className="absolute left-2 top-2 text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500 transition-all">
        Experience Level
      </label>
    </div>
  
    <div className="form-input w-full relative mb-4">
      <input
        type="text"
        name="employmentType"
        value={jobData.employmentType}
        onChange={handleChange}
        placeholder=" "
        className="input p-2 w-full border rounded peer"
        id="employmentType"
      />
      <label htmlFor="employmentType" className="absolute left-2 top-2 text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500 transition-all">
        Employment Type
      </label>
    </div>
  
    <div className="form-input w-full relative mb-4">
      <input
        type="number"
        name="salary.min"
        value={jobData.salary.min}
        onChange={handleChange}
        placeholder=" "
        className="input p-2 w-full border rounded peer"
        id="minSalary"
      />
      <label htmlFor="minSalary" className="absolute left-2 top-2 text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500 transition-all">
        Min Salary
      </label>
    </div>
  
    <div className="form-input w-full relative mb-4">
      <input
        type="number"
        name="salary.max"
        value={jobData.salary.max}
        onChange={handleChange}
        placeholder=" "
        className="input p-2 w-full border rounded peer"
        id="maxSalary"
      />
      <label htmlFor="maxSalary" className="absolute left-2 top-2 text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500 transition-all">
        Max Salary
      </label>
    </div>
  
    <div className="form-input w-full relative mb-4">
      <input
        type="text"
        name="educationLevel"
        value={jobData.educationLevel}
        onChange={handleChange}
        placeholder=" "
        className="input p-2 w-full border rounded peer"
        id="educationLevel"
      />
      <label htmlFor="educationLevel" className="absolute left-2 top-2 text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500 transition-all">
        Education Level
      </label>
    </div>
  
    <div className="form-input w-full relative mb-4">
      <input
        type="text"
        name="jobType"
        value={jobData.jobType}
        onChange={handleChange}
        placeholder=" "
        className="input p-2 w-full border rounded peer"
        id="jobType"
      />
      <label htmlFor="jobType" className="absolute left-2 top-2 text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500 transition-all">
        Job Type
      </label>
    </div>
  
    <div className="form-input w-full relative mb-4">
      <textarea
        name="responsibilities"
        value={jobData.responsibilities}
        onChange={handleChange}
        placeholder=" "
        className="input p-2 w-full border rounded peer"
        id="responsibilities"
      />
      <label htmlFor="responsibilities" className="absolute left-2 top-2 text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500 transition-all">
        Responsibilities
      </label>
    </div>
  
    <div className="form-input w-full relative mb-4">
      <textarea
        name="requirements"
        value={jobData.requirements}
        onChange={handleChange}
        placeholder=" "
        className="input p-2 w-full border rounded peer"
        id="requirements"
      />
      <label htmlFor="requirements" className="absolute left-2 top-2 text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500 transition-all">
        Requirements
      </label>
    </div>
  
    <div className="form-input w-full relative mb-4">
      <input
        type="text"
        name="companyName"
        value={jobData.companyName}
        onChange={handleChange}
        placeholder=" "
        className="input p-2 w-full border rounded peer"
        id="companyName"
      />
      <label htmlFor="companyName" className="absolute left-2 top-2 text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-500 transition-all">
        Company Name
      </label>
    </div>
  
    <div className="form-input w-full relative mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="input p-2 w-full border rounded"
      />
    </div>
  
    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
      Add Job
    </button>
  </form>
  
  );
};

export default AddJobForm;
