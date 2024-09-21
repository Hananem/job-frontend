import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaCamera } from 'react-icons/fa';
import { uploadProfilePhoto } from '../../redux/profileSlice'; 

const ProfilePhoto = ({ currentPhoto, token }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile); 

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('photo', file);

      dispatch(uploadProfilePhoto({ formData, token }));
    }
  };

  return (
    <div className="relative w-32 h-32 mx-auto">
      <img
        src={currentPhoto?.url} 
        alt="Profile"
        className={`w-32 h-32 rounded-full object-cover border-2 border-gray-300 ${loading ? 'opacity-50' : ''}`}
      />
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-full">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-primary border-solid rounded-full animate-spin"></div>
        </div>
      )}
      <label htmlFor="fileInput">
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
          <FaCamera className="text-white text-lg" />
        </div>
      </label>
      <input
        id="fileInput"
        type="file"
        onChange={handleProfilePhotoChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePhoto;

