import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, toggleDropdown, toggleNotifications, openDropdown, closeSidebar, closeDropdown } from '../../redux/uiSlice';
import { fetchNotifications, markNotificationsAsRead } from '../../redux/notificationsSlice';
import Notifications from './Notifications';
import Dropdown from './Dropdown';
import useDarkMode from '../../helpers/useDarkMode';
import links from './links';
import { BiBell, BiChevronDown, BiMenu } from 'react-icons/bi';
import { FiDelete, FiSun, FiMoon } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import { fetchUserById } from '../../redux/profileSlice';
const Navbar = () => {
  const dispatch = useDispatch();
  const [colorTheme, setColorTheme] = useDarkMode();
  const [mode, toggleMode] = useDarkMode('JobIt-Next-theme-mode');
  const { notifications, unreadCount, status } = useSelector((state) => state.notifications);
  const { user } = useSelector((state) => state.profile);
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);
  const isNotificationsOpen = useSelector((state) => state.ui.isNotificationsOpen);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const isDropdownOpen = useSelector((state) => state.ui.isDropdownOpen);
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleDropdown = () => {
    dispatch(toggleDropdown());
  };

  const handleClose = (e) => {
    if (!e.target.classList.contains('dropdown-btn')) {
      dispatch(closeDropdown());
    }
  
  };


  const handleNotifications = () => {
    dispatch(toggleNotifications());
  };



  const handleCloseSidebar = (e) => {
    if (e.target.classList.contains('mobile-modal')) dispatch(closeSidebar());
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);
  return (
    <nav className="navbar mx-auto fixed w-full z-10 top-0 left-0 px-[2%]  md:px-[6%] flex-center-between py-[0.35rem] bg-white dark:bg-dark-card border-b dark:border-slate-800" onClick={handleClose}>
      {/* Logo */}
      <div className="text-xl font-semibold">
        <a href="/">Logo</a>
      </div>
      <ul className="hidden md:flex-align-center space-x-3 lg:space-x-6">
        {links.map(({ id, linkText, url }) => (
          <Link to={url} key={id}>
            {linkText}
          </Link>
        ))}
      </ul>

      <div
        className={`mobile-modal fixed w-screen h-screen top-0 left-0 bg-black/50 z-10 opacity-0 pointer-events-none transition-a ${isSidebarOpen && 'open'}`}
        onClick={handleCloseSidebar}
      >
        <ul
          className={`mobile-dialog absolute flex flex-col space-y-4 p-3 bg-white dark:bg-dark-card h-screen max-w-[300px] w-full -translate-x-[500px] transition-a ${isSidebarOpen && 'open'}`}
        >
          <div className="flex-center-between border-b dark:border-slate-800">
            <p className="uppercase">menu</p>
            <div className="icon-box md:hidden" onClick={() => dispatch(closeSidebar())}>
              <FiDelete />
            </div>
          </div>
          {links.map(({ id, linkText, url }) => (
            <Link key={id} href={url} end>
              <a onClick={() => dispatch(closeSidebar())}>
                {linkText}
              </a>
            </Link>
          ))}
        </ul>
      </div>
      
      {/* Search Form */}
      <SearchForm showSearchBar={showSearchBar} setShowSearchBar={setShowSearchBar} />

      {/* Menu and Sidebar */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div
          className={`icon-box !opacity-100 relative notification-btn ${showSearchBar && '!hidden'}`}
          onClick={handleNotifications}
        >
          <motion.div className="relative" whileTap={{ scale: 0.5 }}>
            <BiBell className="notification-btn text-muted" />
            {unreadCount > 0 && (
              <div className="absolute w-2 h-2 bg-primary top-0 right-0 rounded-full notification-btn">
                {unreadCount}
              </div>
            )}
          </motion.div>
          {isNotificationsOpen && <Notifications notifications={notifications} status={status} />}
        </div>

        {/* Dropdown */}
        <div
          className="dropdown-btn flex-align-center space-x-1 md:pl-4 flex-shrink-0 relative"
          onClick={handleDropdown}
        >
          <motion.img
            src={user?.profilePhoto.url}
            alt=""
            className="w-8 h-8 rounded-full sm:cursor-pointer dropdown-btn"
            whileTap={{ scale: 0.5 }}
          />
          <BiChevronDown className="dropdown-btn" />
          {isDropdownOpen && <Dropdown />}
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <motion.div
        className="icon-box bg-slate-100 dark:bg-[#2b2b35]"
        onClick={toggleMode}
        whileTap={{ scale: 0.5 }}
      >
        {mode === 'dark' ? <FiSun /> : <FiMoon />}
      </motion.div>
      <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700"></div>

      {/* Mobile Menu Toggle Button */}
      <motion.div
        className="icon-box md:hidden"
        onClick={() => dispatch(toggleSidebar())}
        whileTap={{ scale: 0.5 }}
      >
        <BiMenu />
      </motion.div>
    </nav>
  );
};

export default Navbar;

