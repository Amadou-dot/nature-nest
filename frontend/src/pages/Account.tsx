import { Box } from '@mantine/core';
import UpdatePasswordForm from '../ui/UpdatePasswordForm';
import UpdateUserDataForm from '../ui/UpdateUserDataForm';

export default function Account() {
  return (
    <Box className='flex flex-col gap-4'>
      <UpdateUserDataForm />
      <UpdatePasswordForm />
    </Box>
  );
}
