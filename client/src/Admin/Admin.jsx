import React from 'react'
import './Admin.css';
import Avatar from '@mui/material/Avatar';
import avatar4 from '../assets/avatar-4.avif'

const Admin = () => {
  return (
    <div className="flex bg-white text-black w-full h-screen">
      <div className="sidebar bg-orange-400 h-full max-md:hidden ">
        <h2 className='text-2xl ps-7'>Fardeen</h2>
        <ul className='ps-7'>
          <li className='list-none py-4'>Home</li>
          <li className='list-none py-4'>Service</li>
          <li className='list-none py-4'>Customer</li>
          <li className='list-none py-4'>Revenue</li>
          <li className='list-none py-4'>Profile</li>
        </ul>
      </div>
      <div className="main w-full">
        <div className="nav bg-white h-[10vh] w-full">
          <div className="flex justify-end items-center nav-items">
            <Avatar alt="Remy Sharp" src={avatar4} className='mx-auto h-10 w-10 rounded-full text-end' />
          </div>
        </div>
        <div className="content bg-green-600 h-full">M</div>
      </div>
    </div>
  )
}

export default Admin