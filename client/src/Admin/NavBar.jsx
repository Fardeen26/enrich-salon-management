import { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Stack from '@mui/material/Stack';
import './Admin.css'
import { Badge, Divider, Popover } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const NavBar = ({ windowWidth, isMenuOpen, handleOpenUserMenu, handleCloseUserMenu, anchorElUser, handleMenu }) => {
    const [popAnchorEl, setPopAnchorEl] = useState(null);
    const [invisible, setInvisible] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notificationSeen, setNotificationSeen] = useState(false);
    const [profileUrl, setProfileUrl] = useState('')

    const navigate = useNavigate();

    const handleClick = (event) => {
        setPopAnchorEl(event.currentTarget);
        setNotificationSeen(true);
        setInvisible(true);
        setNotificationSeen(true)
    };

    const handleClose = () => {
        setPopAnchorEl(null);
    };

    const open = Boolean(popAnchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        const recentBookings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/recent-bookings`);
                if (response.data) {
                    setNotifications(response.data);
                }
            } catch (error) {
                console.error("An Error Occurred", error);
            }
        }

        const fetchProfileUrl = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/profile-url`);
                if (response.data) {
                    setProfileUrl(response.data.profilePic)
                }
            } catch (error) {
                console.error("An Error Occurred", error);
            }
        }

        recentBookings();
        fetchProfileUrl();
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem('token');
        navigate('/admin/login')
    }

    return (
        <div className="nav-con sticky top-0 z-10">
            <div className="nav bg-white h-[9vh] w-full flex justify-between items-center px-4 dark:bg-black">
                <div className="nav-items">
                    {windowWidth <= 1024 && !isMenuOpen && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </div>


                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                    <div className="notification">
                        {
                            notificationSeen ?
                                <Badge color="warning" variant="dot" invisible={invisible} className='cursor-pointer'>
                                    <NotificationsNoneIcon aria-describedby={id} variant="contained" onClick={handleClick} className='notification-icon' />
                                </Badge> :
                                <Badge color="warning" variant="dot" invisible={invisible} className='cursor-pointer'>
                                    <NotificationsNoneIcon aria-describedby={id} variant="contained" onClick={handleClick} className='notification-icon' />
                                </Badge>
                        }

                        <Popover
                            id={id}
                            open={open}
                            anchorEl={popAnchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            className='cursor-pointer'
                        >
                            {
                                notifications.map((item, idx) => (
                                    <div className="" key={idx}>
                                        <Typography sx={{ paddingBottom: 1.7, paddingTop: 1.7, paddingLeft: 1, paddingRight: 1 }} className='hover:bg-slate-200'> <span className='text-base font-medium'> <CheckBoxIcon className='text-green-600' /> {item.name} booked a {item.service}</span></Typography>
                                        <Divider className='text-black font-bold' />
                                    </div>
                                ))
                            }
                        </Popover>
                    </div>

                    <div className="profile">
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={profileUrl} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center"><Link to='/admin/dashboard/account'>Account</Link> </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center"><Link to='/admin/dashboard/'>Dashboard</Link> </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </div>
                </Stack>
            </div>
            <Divider className='bg-black' />
        </div>
    )
}

export default NavBar