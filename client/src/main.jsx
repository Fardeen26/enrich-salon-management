import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import BookingForm from './components/BookingForm.jsx';

import {
  createBrowserRouter,
  RouterProvider,
  useLocation
} from "react-router-dom";
import './index.css'

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
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
