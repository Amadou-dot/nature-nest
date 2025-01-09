import { HiOutlineHome, HiOutlineUsers } from 'react-icons/hi';
import { HiOutlineAdjustmentsVertical, HiOutlineCalendarDays, HiOutlineHomeModern } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo-light.png';
import MobileMenu from './MobileMenu';

export default function Sidebar({ className }: { className: string }) {

  const links = [
    { to: '/dashboard', icon: <HiOutlineHome className='w-6' />, label: 'Home' },
    { to: '/bookings', icon: <HiOutlineCalendarDays className='w-6' />, label: 'Bookings' },
    { to: '/cabins', icon: <HiOutlineHomeModern className='w-6' />, label: 'Cabins' },
    { to: '/users', icon: <HiOutlineUsers className='w-6' />, label: 'Users' },
    { to: '/settings', icon: <HiOutlineAdjustmentsVertical className='w-6' />, label: 'Settings' },
  ];

  return (
    <aside className={`${className} md:bg-gray-50 md:w-44`}>
      <MobileMenu links={links} />
      {/* desktop nav */}
      <nav className='hidden md:block fixed md:relative top-0 left-0 h-full bg-gray-50 z-50'>
        <div className='flex text-left w-36 flex-col text-gray-800 items-start gap-5 p-4'>
          <img src={logo} alt='logo' className='w-24 mb-5 mt-5' />
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 text-lg ${isActive ? 'text-indigo-700' : ''}`
              }
            >
              {link.icon} <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
}