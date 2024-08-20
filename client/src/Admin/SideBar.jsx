import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import PieChartIcon from '@mui/icons-material/PieChart';
import PeopleIcon from '@mui/icons-material/People';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import Person4Icon from '@mui/icons-material/Person4';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

import './Admin.css';

// eslint-disable-next-line react/prop-types
const SideBar = ({ isSideBarVisible, isMenuOpen }) => {
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState('');

    useEffect(() => {
        setSelectedItem(location.pathname);
    }, [])

    const handleItemClick = (path) => {
        setSelectedItem(path);
    };

    return (
        <div className={`sidebar bg-black text-white py-3 ${isSideBarVisible || isMenuOpen ? 'open' : 'closed'}`}>
            <h2 className='text-2xl text-center'>Enrich Hair Salon</h2>
            <Divider className='text-white bg-white' style={{ marginTop: '14px' }} />
            <ul className='p-4 mt-2'>
                <Stack spacing={2}>
                    <Link to="/admin/dashboard/" onClick={() => handleItemClick("/admin/dashboard/")}>
                        <div className={`side-item p-2 flex items-center text-center rounded-lg ${selectedItem === "/admin/dashboard/" ? 'selected' : ''}`}>
                            <PieChartIcon className="mr-2" />
                            <Typography component="h1" sx={{ color: 'inherit', fontSize: '1rem', fontWeight: 500 }} >
                                Overview
                            </Typography>
                        </div>
                    </Link>
                    <Link to="/admin/dashboard/bookings" onClick={() => handleItemClick("/admin/dashboard/bookings")}>
                        <div className={`side-item p-2 flex items-center text-center rounded-lg ${selectedItem === "/admin/dashboard/bookings" ? 'selected' : ''}`}>
                            <PeopleIcon className="mr-2" />
                            <Typography component="h1" sx={{ color: 'inherit', fontSize: '1rem', fontWeight: 500 }} >
                                Bookings
                            </Typography>
                        </div>
                    </Link>
                    <Link to="/admin/dashboard/services" onClick={() => handleItemClick("/admin/dashboard/services")}>
                        <div className={`side-item p-2 flex items-center text-center rounded-lg ${selectedItem === "/admin/dashboard/services" ? 'selected' : ''}`}>
                            <ContentCutIcon className=" mr-2" />
                            <Typography component="h1" sx={{ color: 'inherit', fontSize: '1rem', fontWeight: 500 }} >
                                Services
                            </Typography>
                        </div>
                    </Link>
                    <Link to="/admin/dashboard/account" onClick={() => handleItemClick("/admin/dashboard/account")}>
                        <div className={`side-item p-2 flex items-center text-center rounded-lg ${selectedItem === "/admin/dashboard/account" ? 'selected' : ''}`}>
                            <Person4Icon className=" mr-2" />
                            <Typography component="h1" sx={{ color: 'inherit', fontSize: '1rem', fontWeight: 500 }} >
                                Account
                            </Typography>
                        </div>
                    </Link>
                </Stack>
            </ul>
        </div>
    );
};

export default SideBar;
