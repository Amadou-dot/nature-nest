import { Box } from '@mantine/core';
import SettingsForm from '../features/settings/SettingsForm';

export default function Settings() {
  return (
    <Box className='mx-auto mb-40 max-w-[1800px] px-4 md:mb-20 md:px-0 lg:mb-0'>
      <SettingsForm />
    </Box>
  );
}
