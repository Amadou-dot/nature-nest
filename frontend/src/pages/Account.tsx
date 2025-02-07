import { Box } from '@mantine/core';
import UpdatePasswordForm from '../ui/UpdatePasswordForm';
import UpdateUserDataForm from '../ui/UpdateUserDataForm';

export default function Account() {
  return (
    <Box className='mx-auto mb-40 flex w-10/12 max-w-[1800px] flex-col gap-10 md:mb-20 lg:mb-0'>
      <UpdateUserDataForm />
      <UpdatePasswordForm />
    </Box>
  );
}
