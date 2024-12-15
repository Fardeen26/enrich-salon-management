import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import BookingForm from './components/BookingForm.jsx';
import AdminLogin from './Admin/AdminLogin.jsx';
import AdminDashboard from './Admin/AdminDashboard.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';

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
    element: <AdminDashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);