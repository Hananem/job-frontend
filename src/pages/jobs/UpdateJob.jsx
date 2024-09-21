import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById, updateJob, updateJobLogo } from '../../redux/jobSlice';

const UpdateJob = ({ isOpen, onClose, jobId }) => {
  const dispatch = useDispatch();
  const { selectedJob, status } = useSelector((state) => state.jobs);
  const user = useSelector((state) => state.user.user);

  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [location, setLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    if (isOpen && jobId) {
      dispatch(fetchJobById(jobId));
    }
  }, [dispatch, isOpen, jobId]);

  useEffect(() => {
    if (selectedJob) {
      setJobTitle(selectedJob.jobTitle);
      setCompanyName(selectedJob.company.name);
      setCompanyDescription(selectedJob.company.description);
      setLocation(selectedJob.location);
      setMinSalary(selectedJob.salary.min);
      setMaxSalary(selectedJob.salary.max);
      setExperienceLevel(selectedJob.experienceLevel);
      setEmploymentType(selectedJob.employmentType);
      setEducationLevel(selectedJob.educationLevel);
    }
  }, [selectedJob]);

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleJobUpdate = async (e) => {
    e.preventDefault();
    const jobData = {
      jobTitle,
      company: { name: companyName, description: companyDescription },
      location,
      salary: { min: minSalary, max: maxSalary },
      experienceLevel,
      employmentType,
      educationLevel,
    };
    await dispatch(updateJob({ id: jobId, jobData }));
    if (logoFile) {
      await dispatch(updateJobLogo({ id: jobId, logoFile, token: user.token }));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Update Job</h2>

        {status === 'loading' && <div>Loading...</div>}
        {status === 'failed' && <div>Error: Failed to load job details</div>}

        {selectedJob && (
          <form onSubmit={handleJobUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="border rounded p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="border rounded p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Company Description</label>
              <textarea
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                className="border rounded p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border rounded p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Salary Range</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  placeholder="Min"
                  className="border rounded p-2 w-full"
                  required
                />
                <input
                  type="number"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  placeholder="Max"
                  className="border rounded p-2 w-full"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Experience Level</label>
              <input
                type="text"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="border rounded p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Employment Type</label>
              <input
                type="text"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="border rounded p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Education Level</label>
              <input
                type="text"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="border rounded p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Update Company Logo</label>
              {selectedJob?.company?.logo?.url && (
                <img src={selectedJob.company.logo.url} alt="Current Logo" className="mb-4 max-w-full h-auto" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="mb-4 p-2 w-full border rounded"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Update Job
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateJob;


