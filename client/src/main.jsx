import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import BookingForm from './components/BookingForm.jsx';
import AdminLogin from './Admin/AdminLogin.jsx';
import AdminDashboard from './Admin/AdminDashboard.jsx';
import Loader from './Admin/Loader.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import './index.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AdminRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/check-auth`);
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (err) {
        console.error('Error checking authentication status', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <Loader />;
  return isLoggedIn ? <AdminDashboard /> : <Navigate to="/admin/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/book",
    element: <BookingForm />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard/*",
    element: <AdminRoute />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
