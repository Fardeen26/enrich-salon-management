import { useState, useEffect } from 'react'
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Profile = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [password2, setPassword2] = useState('')
    const [profileUrl, setProfileUrl] = useState('')
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)
    const [isPasswordHidden2, setIsPasswordHidden2] = useState(true)

    useEffect(() => {
        const fetchProfileUrl = async () => {
            try {
                setIsLoading(true);
                const responce = await axios.get('/api/admin/profile-url');
                if (responce.data) {
                    setUsername(responce.data.username)
                    setPassword(responce.data.password)
                    setProfileUrl(responce.data.profilePic)
                }
            } catch (error) {
                console.error('An Error Occured:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileUrl();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let rewritedPassword = e.target[2].value;
        if (password != rewritedPassword) {
            setError('Your Password is not matched!');
            setIsLoading(false);
        }
        else {
            try {
                const responce = await axios.post('/api/admin/edit-adminprofile', { username, password });
                if (responce.data.success) {
                    setIsLoading(false);
                    toast.success('Information Updated Successfully!', {
                        className: 'p-3',
                        duration: 3000,
                    });
                }
            } catch (error) {
                console.log("An Error Occured", error);
            }
        }
    }

    return (
        <>
            <div className='flex flex-wrap p-4 justify-center'>
                <Toaster richColors position="top-center" visibleToasts={1} />
                <div className='w-96 max-sm:w-full flex max-2xl:justify-start max-lg:justify-center max-sm:justify-center'>
                    <div className="z-20">
                        <img src={profileUrl} alt="" className='w-72 h-72' />
                    </div>
                </div>
                <div className='w-96 max-sm:w-full'>
                    <form className='flex flex-col' onSubmit={handleSubmit}>
                        <div className='py-2'>
                            <label htmlFor='username' className='block mb-2 text-sm font-medium dark:text-white text-black'>Username</label>
                            <input type="text" name='username' value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)} className='bg-black text-white p-2 border rounded w-full' />
                        </div>
                        <div className='py-2'>
                            <label htmlFor='password' className='block mb-2 text-sm font-medium dark:text-white text-black'>Password</label>
                            <div className="relative">
                                <input type={`${isPasswordHidden ? 'password' : 'text'}`} name='password' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} className='bg-black text-white p-2 border rounded w-full' required />
                                <span className='absolute text-white right-4 top-2' onClick={() => setIsPasswordHidden(!isPasswordHidden)}>{isPasswordHidden ? <VisibilityIcon sx={{ fontSize: '20px' }} /> : <VisibilityOffIcon sx={{ fontSize: '20px' }} />}</span>
                            </div>
                        </div>
                        <div className='py-2'>
                            <label htmlFor='password2' className='block mb-2 text-sm font-medium dark:text-white text-black'>Enter Again</label>
                            <div className="relative">
                                <input type={`${isPasswordHidden2 ? 'password' : 'text'}`} name='password2' placeholder="Enter password Again" onChange={(e) => setPassword2(e.target.value)} className='bg-black text-white p-2 border rounded w-full' required />
                                <span className='absolute text-white right-4 top-2' onClick={() => setIsPasswordHidden2(!isPasswordHidden2)}>{isPasswordHidden2 ? <VisibilityIcon sx={{ fontSize: '20px' }} /> : <VisibilityOffIcon sx={{ fontSize: '20px' }} />}</span>
                            </div>
                        </div>
                        {error && (<p className='text-red-500 text-sm'>{error}</p>)}
                        <button type="submit" className='bg-blue-500 text-white p-2 mt-3 rounded w-full'>{isLoading ? 'Loading...' : 'Edit'}</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Profile