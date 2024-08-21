import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('/api/admin/login', { username, password });
            if (response.data.success) {
                navigate('/admin/dashboard');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError(err.message);
            console.log("An Error Occured", err)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen container flex justify-center items-center px-4">
            <form onSubmit={handleSubmit} className=''>
                <h2 className='text-center text-2xl font-bold mb-3'>Login as Admin</h2>
                {error && <p className="text-red-600 text-center mb-2">{error}</p>}
                <div className='py-2'>
                    <label htmlFor='username' className='block mb-2 text-sm font-medium dark:text-white text-black'>Username</label>
                    <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} className='bg-black text-white p-2 w-72 border rounded' />
                </div>
                <div className='py-2'>
                    <label htmlFor='password' className='block mb-2 text-sm font-medium dark:text-white text-black'>Password</label>
                    <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='bg-black text-white p-2 w-72 rounded' />
                </div>
                <button type="submit" className='bg-blue-500 text-white p-2 mt-3 rounded w-full'>{isLoading ? 'Loading...' : 'Login'}</button>

            </form>
        </div>

    );
};

export default AdminLogin;
