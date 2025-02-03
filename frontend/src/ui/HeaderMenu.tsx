import DarkModeToggle from './DarkModeToggle';
import Logout from './Logout';

export default function HeaderMenu() {
  return (
    <ul className='flex w-full justify-end gap-4 items-center'>
      <li>
        <Logout />
      </li>
      <li>
        <DarkModeToggle />
      </li>
    </ul>
  );
}
