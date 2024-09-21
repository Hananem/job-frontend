import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById, updateUser } from '../../redux/profileSlice'; // Adjust path

const UpdateProfile = () => {
  const { id } = useParams(); // Get user ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.profile);
  const token = useSelector((state) => state.user.user.token);// Replace with actual token from Redux state or local storage

  // Local state to manage form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    skills: '',
    languages: '',
    interests: '',
    experience: '',
    education: '',
    projects: '',
    certifications: '',
  });

  // Fetch user details on component mount
  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  // Set form values when user data is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        skills: user.skills ? user.skills.join(', ') : '',
        languages: user.languages ? user.languages.join(', ') : '',
        interests: user.interests ? user.interests.join(', ') : '',
        experience: user.experience || '',
        education: user.education || '',
        projects: user.projects || '',
        certifications: user.certifications || '',
      });
    }
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    

    const updatedData = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()), // Convert skills to an array
      languages: formData.languages.split(',').map(lang => lang.trim()), // Convert languages to an array
      interests: formData.interests.split(',').map(interest => interest.trim()), // Convert interests to an array
    };

    dispatch(updateUser({ id, updatedData, token }))
      .unwrap()
      .then(() => {
        navigate(`/profile/${id}`); // Redirect to profile page after successful update
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-100 shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Update Profile</h1>
  
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <label htmlFor="username" className="block text-sm font-medium text-gray-600 mt-2">Username</label>
      </div>
  
      <div>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mt-2">Email</label>
      </div>
  
      <div>
        <input
          type="text"
          name="skills"
          id="skills"
          value={formData.skills}
          onChange={handleChange}
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <label htmlFor="skills" className="block text-sm font-medium text-gray-600 mt-2">Skills (comma-separated)</label>
      </div>
  
      <div>
        <input
          type="text"
          name="languages"
          id="languages"
          value={formData.languages}
          onChange={handleChange}
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <label htmlFor="languages" className="block text-sm font-medium text-gray-600 mt-2">Languages (comma-separated)</label>
      </div>
  
      <div>
        <input
          type="text"
          name="interests"
          id="interests"
          value={formData.interests}
          onChange={handleChange}
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <label htmlFor="interests" className="block text-sm font-medium text-gray-600 mt-2">Interests (comma-separated)</label>
      </div>
  
      <div>
        <textarea
          name="experience"
          id="experience"
          value={formData.experience}
          onChange={handleChange}
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows="4"
        />
        <label htmlFor="experience" className="block text-sm font-medium text-gray-600 mt-2">Experience</label>
      </div>
  
      <div>
        <textarea
          name="education"
          id="education"
          value={formData.education}
          onChange={handleChange}
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows="4"
        />
        <label htmlFor="education" className="block text-sm font-medium text-gray-600 mt-2">Education</label>
      </div>
  
      <div>
        <textarea
          name="projects"
          id="projects"
          value={formData.projects}
          onChange={handleChange}
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows="4"
        />
        <label htmlFor="projects" className="block text-sm font-medium text-gray-600 mt-2">Projects</label>
      </div>
  
      <div>
        <textarea
          name="certifications"
          id="certifications"
          value={formData.certifications}
          onChange={handleChange}
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows="4"
        />
        <label htmlFor="certifications" className="block text-sm font-medium text-gray-600 mt-2">Certifications</label>
      </div>
  
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Update Profile
      </button>
    </form>
  </div>
  
  );
};

export default UpdateProfile;
