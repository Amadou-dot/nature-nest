import { Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from 'react-router-dom';
interface MobileMenuProps {
  links: { to: string; icon: JSX.Element; label: string }[];
}
export default function MobileMenu({ links }: MobileMenuProps) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <nav className='absolute left-0 top-0 md:hidden'>
      <Burger
        lineSize={1}
        opened={opened}
        onClick={toggle}
        aria-label='Toggle navigation'
      />

      {opened && (
        <div
          className='fixed inset-0 z-40 bg-brand-200/60 bg-opacity-50 text-grey-800 backdrop-blur-sm dark:bg-grey-700/70 dark:text-dark-grey-700'
          onClick={toggle}
        >
          <div className='fixed inset-y-0 left-0 z-50 flex w-full flex-col items-center justify-center gap-4 p-4 text-left text-lg'>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? 'text-indigo-700' : ''}`
                }
              >
                {link.icon} <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
