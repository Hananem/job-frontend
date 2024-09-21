import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJobSeekerPost } from '../../redux/jobSeekerPostsSlice';

const CreateJobSeekerPost = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.user.token); 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createJobSeekerPost({
      jobTitle,
      location,
      description,
      skills: skills.split(',').map(skill => skill.trim()),
      experienceLevel,
      educationLevel
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreateJobSeekerPost;
