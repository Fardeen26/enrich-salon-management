import { useEffect, useState } from 'react'
import ServiceBox from './utils-components/ServiceBox';
import { Link, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

const Services = () => {
    const [services, setServices] = useState([]);
    const [sonner, setSonner] = useState(false);
    const [pathKey, setPathKey] = useState("11111111");
    const location = useLocation();


    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('/api/admin/all-services');
                if (response.data) {
                    setServices(response.data)
                }
            } catch (error) {
                console.error("An Error Occured", error);
            } finally {
                setSonner(false)
            }
        }

        if (location.key == "default" && pathKey != "default") {
            setSonner(true)
            setPathKey(location.key)
            toast.error('Service Deleted successfully!', {
                className: 'p-3',
                duration: 3000,
            });
        }
        else if (location.key != pathKey) {
            setSonner(true)
            toast.success('Service Created Successfully!', {
                className: 'p-3',
                duration: 3000,
            });

            setPathKey(location.key)
        }

        fetchServices();
    }, []);

    return (

        <div className="p-4">
            {sonner && <Toaster richColors position="top-center" visibleToasts={1} />}

            <div className="text-right">
                <button className='py-2 px-3 bg-blue-500 rounded-lg text-white font-medium hover:bg-blue-600'><Link to={`/admin/dashboard/new`}><AddIcon />Add New Service</Link></button>
            </div>

            <div className="content flex flex-wrap max-lg:justify-center">
                {services.map((item, idx) => (
                    <div className="border rounded-2xl w-[23vw] h-[200px] max-lg:w-[40vw] max-sm:w-screen  min-w-[170px] max-lg:mr-4 max-sm:mr-0 max-2xl:mr-4 mr-4 shadow mt-4" key={idx}>
                        <ServiceBox icon={<Grid3x3Icon className='text-white' />} serviceName={item.serviceName} price={item.price} iconBGColor="#4ded53" _id={item._id} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Services