import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PieChartIcon from '@mui/icons-material/PieChart';
import PeopleIcon from '@mui/icons-material/People';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import Person4Icon from '@mui/icons-material/Person4';
import { Typography, Divider, Stack } from '@mui/material';

import './Admin.css';

// eslint-disable-next-line react/prop-types
const SideBar = ({ isSideBarVisible, isMenuOpen }) => {
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState('');
    const [isSelectedItem, setIsSelectedItem] = useState(false)

    useEffect(() => {
        if (location.pathname != '/admin/dashboard') {
            setIsSelectedItem(true)
            setSelectedItem(location.pathname);
        }
    }, [])

    const handleItemClick = (path) => {
        setSelectedItem(path);
        setIsSelectedItem(true)
    };

    return (
        <div className={`sidebar bg-black text-white py-3 ${isSideBarVisible || isMenuOpen ? 'open' : 'closed'}`}>
            <Typography
                variant="p"
                href="#app-bar-with-responsive-menu"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontSize: '26px',
                    color: 'white',
                    textDecoration: 'none',
                    marginLeft: '35px',
                    marginTop: '-3px'
                }}
                className='pageLogo'
            >
                <Link to={'/admin/dashboard/'}>Enrich Hair Salon</Link>
            </Typography>

            <Divider className='text-white bg-white' style={{ marginTop: '14px' }} />
            <ul className='p-4 mt-2'>
                <Stack spacing={2}>
                    <Link to="/admin/dashboard/" onClick={() => handleItemClick("/admin/dashboard/")}>
                        <div className={`${!isSelectedItem ? 'selected' : ''} side-item p-2 flex items-center text-center rounded-lg ${selectedItem === "/admin/dashboard/" ? 'selected' : ''}`}>
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
