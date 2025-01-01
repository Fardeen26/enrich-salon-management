import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';

const NewServiceForm = () => {
    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const axiosClient = apiClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosClient.post(`/api/admin/create-service`, { serviceName, price });
            if (response.data)
                navigate('/admin/dashboard/services')
        } catch (error) {
            console.error("An Error Occurred", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-[80vh] container flex justify-center items-center px-4 overflow-hidden">
            <form onSubmit={handleSubmit} className=''>
                <h2 className='text-center text-2xl font-bold mb-3'>Add New Service</h2>
                <div className='py-2'>
                    <label htmlFor='service' className='block mb-2 text-sm font-medium dark:text-white text-black'>Enter Service Name</label>
                    <input
                        type="text"
                        name='service'
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        className='bg-black text-white p-2 w-72 border rounded' />
                </div>
                <div className='py-2'>
                    <label htmlFor='price' className='block mb-2 text-sm font-medium dark:text-white text-black'>Enter Price</label>
                    <input
                        type='number'
                        name='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className='bg-black text-white p-2 w-72 rounded' />
                </div>
                <button type="submit" className='bg-blue-500 text-white p-2 mt-3 rounded w-full'>{isLoading ? 'Loading...' : 'Add'}</button>
            </form>
        </div>
    )
}

export default NewServiceForm