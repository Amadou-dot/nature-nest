import { Box, Image, useComputedColorScheme } from '@mantine/core';
import { HiOutlineHome, HiOutlineUser, HiOutlineUsers } from 'react-icons/hi';
import {
  HiOutlineAdjustmentsVertical,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import logoDark from '../../assets/logo-dark.png';
import logoLight from '../../assets/logo-light.png';
import MobileMenu from './MobileMenu';
export default function Sidebar() {
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
    { to: '/account', icon: <HiOutlineUser />, label: 'Account' },
  ];

  return (
    <Box
      component='aside'
      className='absolute md:relative md:row-span-2 md:w-44 md:bg-grey-50'
    >
      <MobileMenu links={links} />
      {/* desktop nav */}
      <Box
        component='nav'
        className='fixed left-0 top-0 z-50 hidden h-full border-r border-grey-200 bg-grey-100 dark:border-dark-grey-100 dark:bg-dark-grey-50 md:relative md:flex md:flex-col md:justify-between'
      >
        <Box className='flex w-36 flex-col items-start gap-5 p-4 text-left text-grey-800 dark:text-dark-grey-700'>
          <Image
            src={computedColorScheme === 'dark' ? logoDark : logoLight}
            alt='logo'
            className='my-5'
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
      </Box>
    </Box>
  );
}
