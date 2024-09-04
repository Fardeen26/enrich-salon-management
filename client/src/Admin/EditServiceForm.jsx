import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditServiceForm = () => {
    const [serviceName, setServiceName] = useState("");
    const [servicePrice, setServicePrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        try {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/service-formdata/${id}`).then(res => {
                setServiceName(res.data.serviceName);
                setServicePrice(res.data.price);
            })
        } catch (error) {
            console.error("An Error Occurred", error);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/edit-service/${id}`, { serviceName, servicePrice });
            if (response.data.success) {
                navigate('/admin/dashboard/services');
            }
        } catch (error) {
            console.error("An Error Occurred", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-[80vh] container flex justify-center items-center px-4 overflow-hidden">
            <form onSubmit={handleSubmit}>
                <h2 className='text-center text-2xl font-bold mb-3'>Edit Your Service</h2>
                <div className='py-2'>
                    <label htmlFor='service' className='block mb-2 text-sm font-medium dark:text-white text-black'>Service</label>
                    <input
                        type="text"
                        name='service'
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        className='bg-black text-white p-2 w-72 border rounded' />
                </div>
                <div className='py-2'>
                    <label htmlFor='price' className='block mb-2 text-sm font-medium dark:text-white text-black'>Price</label>
                    <input
                        type='number'
                        name='price'
                        value={servicePrice}
                        onChange={(e) => setServicePrice(e.target.value)}
                        className='bg-black text-white p-2 w-72 rounded' />
                </div>
                <button type="submit" className='bg-blue-500 text-white p-2 mt-3 rounded w-full'>{isLoading ? 'Loading...' : 'Edit'}</button>

            </form>
        </div>
    )
}

export default EditServiceForm