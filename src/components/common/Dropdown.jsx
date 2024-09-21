import React from 'react';
import { BiBriefcase, BiLogOut, BiUser, BiUserCircle } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { closeDropdown } from '../../redux/uiSlice';
import { logout } from '../../redux/userSlice'; 
import { Link } from 'react-router-dom'; 

const Dropdown = () => {
  const dispatch = useDispatch();
  const isDropdownOpen = useSelector((state) => state.ui.isDropdownOpen); 
  const id = useSelector((state) => state.user?.user?.user?._id); 

  const handleCloseDropdown = () => {
    dispatch(closeDropdown()); 
  };

  const handleLogout = () => {
    dispatch(logout()); 
    handleCloseDropdown(); 
  };

  return (
    <>
      {isDropdownOpen && (
        <motion.div
          className="dropdown absolute right-0 top-full mt-1 p-2 !rounded-xl w-48 card card-shadow dark:shadow-none"
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          onClick={handleCloseDropdown} 
        >
          {id && (
            <Link 
              to={`/profile/${id}`} 
              className="flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-slate-100 dark:hover:bg-hover-color rounded-lg"
              onClick={handleCloseDropdown} 
            >
              <BiUserCircle className="text-muted" />
              <span className="text-muted">My Profile</span>
            </Link>
          )}
          <div className="flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-slate-100 dark:hover:bg-hover-color rounded-lg">
            <BiUser className="text-muted" />
            <span className="text-muted">Manage Account</span>
          </div>
          <div className="flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-slate-100 dark:hover:bg-hover-color rounded-lg">
            <BiBriefcase className="text-muted" />
            <span className="text-muted">My Jobs</span>
          </div>
          <div 
            className="flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-slate-100 dark:hover:bg-hover-color rounded-lg"
            onClick={handleLogout} 
          >
            <BiLogOut className="text-muted" />
            <span className="text-muted">Sign out</span>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Dropdown;
