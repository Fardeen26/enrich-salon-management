import { useState, useEffect } from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Home from './Home';
import './Admin.css';
import Bookings from './Bookings';
import Services from './Services';
import { Route, Routes, useNavigate } from 'react-router-dom';
import EditServiceForm from './EditServiceForm';
import NewServiceForm from './NewServiceForm';
import Profile from './Profile';
import axios from 'axios';

const AdminDashboard = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate("/admin/login")
      }

      try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`, {
          headers: { Authorization: token }
        });
      } catch (err) {
        localStorage.removeItem('token');
        navigate("/admin/login")
      }
    };

    verifyAdmin()

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 1024) {
        setIsSideBarVisible(false);
      } else {
        setIsSideBarVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeSideBar = () => {
    if (isMenuOpen)
      setIsMenuOpen(!isMenuOpen);

    if (window.innerWidth <= 1024)
      setIsSideBarVisible(false);
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="flex bg-white text-black w-full h-screen dark:bg-black dark">
      <SideBar isSideBarVisible={isSideBarVisible} isMenuOpen={isMenuOpen} />
      <div className="main w-full" onClick={closeSideBar}>
        <NavBar windowWidth={windowWidth} isMenuOpen={isMenuOpen} handleOpenUserMenu={handleOpenUserMenu} handleCloseUserMenu={handleCloseUserMenu} anchorElUser={anchorElUser} handleMenu={handleMenu} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/services" element={<Services />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/edit/:id" element={<EditServiceForm />} />
          <Route path="/new" element={<NewServiceForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
