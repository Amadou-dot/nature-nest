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
        className='rounded-full h-full w-12 max-w-1/3'
        alt={`Avatar of ${fullName}`}
        style={{ objectFit: 'cover' }}
      />
      <Text className='font-semibold'>{fullName}</Text>
    </Box>
  );
}