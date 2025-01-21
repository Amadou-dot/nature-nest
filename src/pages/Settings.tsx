import { Box } from '@mantine/core';
import SettingsForm from '../features/settings/SettingsForm';
import DarkModeToggle from '../ui/DarkModeToggle';

export default function Settings() {
  return (
    <Box className='space-y-5'>
      <DarkModeToggle />
      <SettingsForm />
    </Box>
  );
}
