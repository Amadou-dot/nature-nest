import { Box } from '@mantine/core';
import UpdatePasswordForm from '../ui/UpdatePasswordForm';
import UpdateUserDataForm from '../ui/UpdateUserDataForm';

export default function Account() {
  return (
    <Box className='mb-40 flex flex-col gap-4 md:mb-20 lg:mb-0'>
      <UpdateUserDataForm />
      <UpdatePasswordForm />
    </Box>
  );
}
