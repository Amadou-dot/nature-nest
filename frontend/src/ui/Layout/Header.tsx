import { Box } from '@mantine/core';
import HeaderMenu from '../HeaderMenu';
import UserAvatar from '../UserAvatar';

export default function Header() {
  return (
    <Box
      component='header'
      className='flex items-center justify-between border-b border-grey-200 bg-grey-100 p-4 pl-10 text-center dark:border-dark-grey-100 dark:bg-dark-grey-50'
    >
      <UserAvatar />
      <HeaderMenu />
    </Box>
  );
}
