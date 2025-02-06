import { Box } from '@mantine/core';
import UpdatePasswordForm from '../ui/UpdatePasswordForm';
import UpdateUserDataForm from '../ui/UpdateUserDataForm';

export default function Account() {
  return (
    <Box className='mx-auto mb-40 w-10/12 max-w-[1800px] md:mb-20 lg:mb-0 gap-10 flex flex-col'>
      <UpdateUserDataForm />
      <UpdatePasswordForm />
    </Box>
  );
}
