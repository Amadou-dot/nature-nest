import Hamburger from 'hamburger-react';
import { NavLink } from 'react-router-dom';
interface MobileMenuProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  links: { to: string; icon: JSX.Element; label: string }[];
}
export default function MobileMenu({ isOpen, setOpen, links }: MobileMenuProps) {
  return (
    <nav className='md:hidden absolute top-0 left-0'>
      <Hamburger
        size={24}
        toggled={isOpen}
        toggle={setOpen}
        label='mobile nav icon'
      />
      {isOpen && (
        <div
          className='fixed inset-0 bg-indigo-200 bg-opacity-50 z-40 backdrop-blur-sm'
          onClick={() => setOpen(false)}>
          <div className='fixed inset-y-0 left-0 w-full z-50 flex flex-col gap-4 p-4 items-center justify-center text-lg text-left'>
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? 'text-indigo-400' : ''}`
                }>
                {link.icon} <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
