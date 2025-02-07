import DarkModeToggle from './DarkModeToggle';
import Logout from './Logout';

export default function HeaderMenu() {
  return (
    <ul className='flex w-full items-center justify-end gap-4'>
      <li>
        <Logout />
      </li>
      <li>
        <DarkModeToggle />
      </li>
    </ul>
  );
}
