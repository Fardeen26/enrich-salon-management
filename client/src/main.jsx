import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import BookingForm from './components/BookingForm.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Admin from './Admin/Admin.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }
  ,
  {
    path: "/book",
    element: <BookingForm />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
