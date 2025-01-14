import { HiOutlineHome, HiOutlineUsers } from 'react-icons/hi';
import { HiOutlineAdjustmentsVertical, HiOutlineCalendarDays, HiOutlineHomeModern } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo-light.png';
import MobileMenu from './MobileMenu';
import Uploader from '../../data/Uploader';
import { Box } from '@mantine/core';

export default function Sidebar({ className }: { className: string }) {

  const links = [
    { to: '/dashboard', icon: <HiOutlineHome />, label: 'Home' },
    { to: '/bookings', icon: <HiOutlineCalendarDays />, label: 'Bookings' },
    { to: '/cabins', icon: <HiOutlineHomeModern />, label: 'Cabins' },
    { to: '/users', icon: <HiOutlineUsers />, label: 'Users' },
    { to: '/settings', icon: <HiOutlineAdjustmentsVertical />, label: 'Settings' },
  ];

  return (
    <Box component='aside' className={`${className} md:bg-gray-50 md:w-44`}>
      <MobileMenu links={links} />
      {/* desktop nav */}
      <Box component='nav' className='hidden md:block fixed md:relative top-0 left-0 h-full bg-gray-100 z-50 border-r border-gray-200'>
        <Box className='flex text-left w-36 flex-col text-gray-800 items-start gap-5 p-4'>
          <Box component='img' src={logo} alt='logo' className='w-24 mb-5 mt-5' />
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 text-lg ${isActive ? 'text-indigo-700' : ''}`
              }
            >
              {link.icon} <span className='w-6 xl:text-xl'>{link.label}</span>
            </NavLink>
          ))}
        </Box>
      <Uploader />
      </Box>
    </Box>
  );
}