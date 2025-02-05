import { Box } from '@mantine/core';
import HeaderMenu from '../HeaderMenu';
import UserAvatar from '../UserAvatar';

export default function Header({ className }: { className: string }) {
  return (
    <Box
      component='header' className={`${className} flex justify-between items-center border-b border-grey-200 bg-grey-100 p-4 text-center dark:border-dark-grey-100 dark:bg-dark-grey-50 md:flex md:text-left`}
    >
      <UserAvatar />
      <HeaderMenu />
    </Box>
  );
}
