import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../../redux/profileSlice'; // Adjust the path accordingly
import ProfilePhoto from "./ProfilePhoto";
import { FaLinkedin, FaGithub, FaTwitter, FaGraduationCap, FaBriefcase, FaHeart, FaLanguage, FaCertificate, FaProjectDiagram } from 'react-icons/fa';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('certifications');
  const { user = {}, loading, error } = useSelector((state) => state.profile); 
  const token = useSelector((state) => state.user.user.token);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="col-span-1 bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border dark:border-gray-700 h-[calc(100vh-2rem)] flex flex-col">
          <ProfilePhoto currentPhoto={user.profilePhoto} token={token} />
          <div className="mb-4 flex-1">
            <p className="text-lg font-semibold">{user.username}</p>
            <p className="text-gray-600">{user.email}</p>
            {user.jobTitle && <p className="text-gray-600">{user.jobTitle}</p>}
            <div className="flex space-x-4 mt-2">
              {user.socialLinks?.linkedin && (
                <a
                  href={user.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondaryGreen transition-colors duration-300"
                >
                  <FaLinkedin size={30} />
                </a>
              )}
              {user.socialLinks?.github && (
                <a
                  href={user.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondaryGreen transition-colors duration-300"
                >
                  <FaGithub size={30} />
                </a>
              )}
              {user.socialLinks?.twitter && (
                <a
                  href={user.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondaryGreen transition-colors duration-300"
                >
                  <FaTwitter size={30} />
                </a>
              )}
            </div>
            {user.bio && <p className="text-gray-600 mt-4">{user.bio}</p>}
            {user.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary text-white px-2 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="col-span-2 bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border dark:border-gray-700">
          {user.education?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaGraduationCap className="mr-2" /> Education
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {user.education.map((edu, index) => (
                  <li key={index} className="mb-1">{edu}</li>
                ))}
              </ul>
            </div>
          )}

          {user.experience?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaBriefcase className="mr-2" /> Experience
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {user.experience.map((exp, index) => (
                  <li key={index} className="mb-1">{exp}</li>
                ))}
              </ul>
            </div>
          )}

          {user.interests?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaHeart className="mr-2" /> Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-white px-2 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {user.languages?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaLanguage className="mr-2" /> Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.languages.map((language, index) => (
                  <span
                    key={index}
                    className="bg-primary text-white px-2 py-1 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tabs for Certifications and Projects */}
          <div className="flex border-b border-gray-300 dark:border-gray-700 mb-4">
            <button
              className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === 'certifications' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'}`}
              onClick={() => setActiveTab('certifications')}
            >
              Certifications
            </button>
            <button
              className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === 'projects' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
          </div>

          {activeTab === 'certifications' && user.certifications?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaCertificate className="mr-2" /> Certifications
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {user.certifications.map((certification, index) => (
                  <li key={index} className="mb-1">{certification}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'projects' && user.projects?.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaProjectDiagram className="mr-2" /> Projects
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {user.projects.map((project, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondaryGreen transition-colors duration-300"
                    >
                      {project.name}
                    </a> - {project.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

