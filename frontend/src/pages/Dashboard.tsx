import { Box, Text } from '@mantine/core';
import DashboardLayout from '../features/dashboard/DashboardLayout';
import DashboardFilter from '../features/dashboard/DashboardFilter';

export default function Dashboard() {
  return (
    <Box className='text-grey-800 dark:text-dark-grey-700'>
      <Box className='flex justify-between items-center'>
        <Text component='h1' className='text-2xl font-bold'>Dashboard</Text>
        <DashboardFilter />
      </Box>
      <DashboardLayout />
    </Box>
  );
}
