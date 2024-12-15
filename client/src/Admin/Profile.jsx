import { useState, useEffect } from 'react'
import axios from 'axios';
import { Toaster, toast } from 'sonner';

const Profile = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [id, setId] = useState(null)
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProfileUrl = async () => {
            const token = localStorage.getItem('token');
            try {
                setIsLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/admin-profile`, {
                    headers: { Authorization: token }
                });
                if (response.data) {
                    console.log(response.data)
                    setUsername(response.data.username)
                    setEmail(response.data.email)
                    setProfilePic(response.data.profilePic)
                    setId(response.data._id)
                }
            } catch (error) {
                console.error('An Error Occurred:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileUrl();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/edit-adminprofile`, { id, username, email, profilePic });
            if (response.data.success) {
                toast.success('Information Updated Successfully!', {
                    className: 'p-3',
                    duration: 3000,
                });
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className='flex flex-wrap p-4 justify-center items-center'>
                <Toaster richColors position="top-center" visibleToasts={1} />
                <div className='w-96 max-sm:w-full flex max-2xl:justify-start max-lg:justify-center max-sm:justify-center'>
                    <div className="z-20">
                        <img src={profilePic} alt="profile-url" className='w-72 h-72 rounded-lg' />
                    </div>
                </div>
                <div className='w-96 max-sm:w-full'>
                    <form className='flex flex-col' onSubmit={handleSubmit}>
                        <div className='py-2'>
                            <label htmlFor='username' className='block mb-2 text-sm font-medium dark:text-white text-black'>Username</label>
                            <input
                                type="text"
                                name='username'
                                value={username}
                                placeholder="username"
                                onChange={(e) => setUsername(e.target.value)}
                                className='bg-black text-white p-2 border rounded w-full' />
                        </div>
                        <div className='py-2'>
                            <label htmlFor='password' className='block mb-2 text-sm font-medium dark:text-white text-black'>Email</label>
                            <div className="relative">
                                <input
                                    name='email'
                                    value={email}
                                    placeholder="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='bg-black text-white p-2 border rounded w-full'
                                    required />
                            </div>
                        </div>
                        <div className='py-2'>
                            <label htmlFor='password' className='block mb-2 text-sm font-medium dark:text-white text-black'>Profile Picture</label>
                            <div className="relative">
                                <input
                                    name='profilePic'
                                    value={profilePic}
                                    placeholder="email"
                                    onChange={(e) => setProfilePic(e.target.value)}
                                    className='bg-black text-white p-2 border rounded w-full'
                                    required />
                            </div>
                        </div>
                        {error && (<p className='text-red-500 text-sm'>{error}</p>)}
                        <button type="submit" className='bg-blue-500 text-white p-2 mt-3 rounded w-full'>{isLoading ? 'Loading...' : 'Edit Details'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile