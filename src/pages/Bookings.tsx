import { Box, Text } from '@mantine/core';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../ui/BookingTableOperations';

export default function Bookings() {
  return (
    <Box className='max-w-[1400px] mx-auto px-4 md:px-0'>
      <Box className='flex justify-between items-center mb-5 flex-col md:flex-row gap-5'>
        <Text component='h1' className='text-lg text-center md:text-left md:text-3xl hidden md:block'>
          All Bookings
        </Text>
        <BookingTableOperations />
      </Box>

      <BookingTable />
    </Box>
  );
}
