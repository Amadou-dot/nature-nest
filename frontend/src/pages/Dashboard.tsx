import { Box, Text } from '@mantine/core';
import DashboardFilter from '../features/dashboard/DashboardFilter';
import DashboardLayout from '../features/dashboard/DashboardLayout';

export default function Dashboard() {
  return (
    <Box className='text-grey-800 dark:text-dark-grey-700'>
      <Box className='flex flex-col items-center justify-between gap-5 md:flex-row md:gap-0'>
        <Text component='h1' className='text-2xl font-bold'>
          Dashboard
        </Text>
        <DashboardFilter />
      </Box>
      <DashboardLayout />
    </Box>
  );
}
