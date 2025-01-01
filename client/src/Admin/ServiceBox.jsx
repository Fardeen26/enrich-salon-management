import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';

// eslint-disable-next-line react/prop-types
const ServiceBox = ({ icon, serviceName, price, iconBGColor, _id }) => {
    const navigate = useNavigate();
    const axiosClient = apiClient();
    const handleSubmit = async () => {
        try {
            const responce = await axiosClient.delete(`/api/admin/delete-service/${_id}`);
            if (responce.data.success) {
                navigate('/admin/dashboard/services')
            }
        } catch (error) {
            console.error("An Error Occurred", error);
        }
    }

    return (
        <div className="box-1 flex flex-col">
            <div className="flex items-center p-4 justify-between">
                <div className="info-text">
                    <div className="heading text-lg text-black ml-1">{serviceName}</div>
                    <div className="real-value text-4xl mt-2">{price ? <CurrencyRupeeIcon /> : ""}{price}</div>
                </div>
                <div className="icon">
                    <div className="round-box rounded-full" style={{ padding: '14px', backgroundColor: `${iconBGColor}` }}>
                        {icon}
                    </div>
                </div>
            </div>

            <div className="buttons flex p-4">
                <button className='py-2 px-4 bg-blue-500 rounded-lg mr-5 text-white font-medium hover:bg-blue-600'> <Link to={`/admin/dashboard/edit/${_id}`}>Edit</Link> </button>
                <form onSubmit={handleSubmit}>
                    <button type='submit' className='py-2 px-4 bg-blue-500 rounded-lg text-white font-medium hover:bg-blue-600'>Delete</button>
                </form>
            </div>

        </div>
    )
}

export default ServiceBox