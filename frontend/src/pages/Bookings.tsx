import { Box } from '@mantine/core';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../ui/BookingTableOperations';
import PageHeading from '../ui/PageHeading';

export default function Bookings() {
  return (
    <Box className='mx-auto max-w-[1400px] px-4 md:px-0 mb-40 md:mb-20 lg:mb-0'>
      <Box className='mb-5 flex flex-col items-center justify-between gap-5 lg:flex-row'>
        <PageHeading text='Bookings' />
        <BookingTableOperations />
      </Box>
      <BookingTable />
    </Box>
  );
}
