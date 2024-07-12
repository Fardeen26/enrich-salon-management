import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notificationShown, setNotificationShown] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.style.backgroundColor = 'white';
    } else if (location.pathname === '/book') {
      document.body.style.backgroundColor = 'black';
    }

    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get('paymentStatus');

    const notificationShownFromStorage = localStorage.getItem('notificationShown');

    if (paymentStatus && notificationShownFromStorage !== 'true') {
      if (paymentStatus === 'success') {
        toast.success('Payment Successful!', {
          className: 'p-3',
          duration: 3000,
        });
      } else if (paymentStatus === 'failure') {
        toast.error('Payment failed! Please try again.', {
          className: 'p-3',
          duration: 3000,
        });
      }
      localStorage.setItem('notificationShown', 'true');
      setNotificationShown(true);

      navigate(location.pathname, { replace: true });
    }

    return () => {
      localStorage.removeItem('notificationShown');
    };
  }, [location.search, notificationShown, navigate]);

  return (
    <>
      <NavBar />
      <Main />
      <Footer />
      <Toaster richColors position="top-center" visibleToasts={1} />
    </>
  );
}

export default App;
