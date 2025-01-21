import { Box, useComputedColorScheme } from '@mantine/core';
import { HiOutlineHome, HiOutlineUsers } from 'react-icons/hi';
import {
  HiOutlineAdjustmentsVertical,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import logoLight from '../../assets/logo-light.png';
import logoDark from '../../assets/logo-dark.png';
import MobileMenu from './MobileMenu';

export default function Sidebar({ className }: { className: string }) {
  const computedColorScheme = useComputedColorScheme('dark');

  const links = [
    { to: '/dashboard', icon: <HiOutlineHome />, label: 'Home' },
    { to: '/bookings', icon: <HiOutlineCalendarDays />, label: 'Bookings' },
    { to: '/cabins', icon: <HiOutlineHomeModern />, label: 'Cabins' },
    { to: '/users', icon: <HiOutlineUsers />, label: 'Users' },
    {
      to: '/settings',
      icon: <HiOutlineAdjustmentsVertical />,
      label: 'Settings',
    },
  ];

  return (
    <Box component='aside' className={`${className} md:bg-grey-50 md:w-44`}>
      <MobileMenu links={links} />
      {/* desktop nav */}
      <Box
        component='nav'
        className='bg-grey-100 dark:bg-dark-grey-50 border-grey-200 dark:border-dark-grey-100 fixed left-0 top-0 z-50 hidden h-full border-r md:relative md:block'
      >
        <Box className='text-grey-800 dark:text-dark-grey-700 flex w-36 flex-col items-start gap-5 p-4 text-left'>
          <Box
            component='img'
            src={computedColorScheme === 'dark' ? logoDark : logoLight}
            alt='logo'
            className='mb-5 mt-5 w-24'
          />
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
        {/* <Uploader /> */}
      </Box>
    </Box>
  );
}
