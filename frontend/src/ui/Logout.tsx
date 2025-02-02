import { Button } from '@mantine/core';
import { HiOutlineLogout } from 'react-icons/hi';
import { useLogout } from '../hooks/useLogout';
import { useUser } from '../hooks/useUser';

export default function Logout() {
  const { isAuthenticated } = useUser();
  const { logout, isPending } = useLogout();
  return (
    isAuthenticated && (
      <Button  onClick={() => logout()} loading={isPending} disabled={isPending} className='mb-6 flex items-center'>
        <HiOutlineLogout className='mr-2' /> Logout
      </Button>
    )
  );
}
