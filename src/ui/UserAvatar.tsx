import { Box, Image, Text } from '@mantine/core';
import { useUser } from '../hooks/useUser';
import defaultUser from '../assets/default-user.png';
import { User } from '../types/user.types';
export default function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = (user as User).user_metadata;
  return (
    <Box className='md:w-fit-content flex w-full items-center gap-2'>
      <Image
        src={avatar || defaultUser}
        className='h-11 w-11 rounded-full object-cover'
        alt={`Avatar of ${fullName}`}
      />
      <Text>{fullName}</Text>
    </Box>
  );
}
