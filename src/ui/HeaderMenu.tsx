import { Button } from '@mantine/core';
import Logout from './Logout';
import { HiOutlineUser } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function HeaderMenu() {
    const navigate = useNavigate();
  return (
    <ul className='flex w-full justify-end gap-4'>
      <li>
        <Button className='rounded-full' onClick={() => navigate('/account')} variant='link'>
          <HiOutlineUser />
        </Button>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}
