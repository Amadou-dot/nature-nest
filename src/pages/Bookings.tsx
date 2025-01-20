import { Box, Text } from '@mantine/core';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../ui/BookingTableOperations';

export default function Bookings() {
  return (
    <Box className='max-w-[1400px] mx-auto px-4 md:px-0'>
      <Box className='flex justify-between items-center mb-5 flex-col md:flex-row gap-5'>
        <Text component='h1' className='text-center md:text-left lg:text-3xl md:text-2xl text-xl text-light-gray-800 dark:text-dark-gray-800'>
          All Bookings
        </Text>
        <BookingTableOperations />
      </Box>

      <BookingTable />
    </Box>
  );
}
