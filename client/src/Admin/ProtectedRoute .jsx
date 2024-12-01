/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api';

const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                await API.get('/protected-data'); // Protected route
                setIsAuthorized(true);
            } catch {
                localStorage.removeItem('token');
                navigate('/admin/login');
            } finally {
                setLoading(false);
            }
        };
        verifyAuth();
    }, []);

    if (loading) return <div>Loading...</div>;
    return isAuthorized ? children : null;
};

export default ProtectedRoute;
