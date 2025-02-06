import { Box, Image, Text } from '@mantine/core';
import defaultUser from '../assets/default-user.png';
import { useUser } from '../hooks/useUser';
import { User } from '../types/user.types';

export default function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = (user as User).user_metadata;

  return (
    <Box className='flex items-center gap-2'>
      <Box className='flex-shrink-0'>
        <Image
          src={avatar || defaultUser}
          alt={`Avatar of ${fullName}`}
          className='h-12 w-12 rounded-full object-cover'
        />
      </Box>
      <Text className='w-60 text-left text-lg font-semibold'>{fullName}</Text>
    </Box>
  );
}
