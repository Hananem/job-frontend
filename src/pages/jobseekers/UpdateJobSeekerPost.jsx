import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateJobSeekerPost } from '../../redux/jobSeekerPostsSlice';

const UpdateJobSeekerPost = ({ postId, onClose }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.jobSeekerPosts.posts.find((post) => post._id === postId)
  );

  // State variables for the form fields
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [educationLevel, setEducationLevel] = useState('');

  // Update form fields when post data changes
  useEffect(() => {
    if (post) {
      setJobTitle(post.jobTitle);
      setLocation(post.location);
      setDescription(post.description);
      setSkills(post.skills.join(', '));
      setExperienceLevel(post.experienceLevel);
      setEducationLevel(post.educationLevel);
    }
  }, [post]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateJobSeekerPost({
      postId,
      updateData: {
        jobTitle,
        location,
        description,
        skills: skills.split(',').map(skill => skill.trim()),
        experienceLevel,
        educationLevel
      }
    }));
    onClose(); // Close modal after update
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="text-xl font-semibold">Update Job Seeker Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Job Title"
            required
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Skills (comma-separated)"
            required
          />
          <input
            type="text"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            placeholder="Experience Level"
            required
          />
          <input
            type="text"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            placeholder="Education Level"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateJobSeekerPost;

