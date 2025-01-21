import { Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from 'react-router-dom';
interface MobileMenuProps {
  links: { to: string; icon: JSX.Element; label: string }[];
}
export default function MobileMenu({links }: MobileMenuProps) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <nav className='md:hidden absolute top-0 left-0'>
       <Burger lineSize={1} opened={opened} onClick={toggle} aria-label="Toggle navigation" />
       
      {opened && (
        <div
          className='fixed inset-0 bg-brand-200/60 dark:bg-grey-700/70 bg-opacity-50 z-40 backdrop-blur-sm text-grey-800 dark:text-dark-grey-700'
          onClick={toggle}>
          <div className='fixed inset-y-0 left-0 w-full z-50 flex flex-col gap-4 p-4 items-center justify-center text-lg text-left'>
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? 'text-indigo-700' : ''}`
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
