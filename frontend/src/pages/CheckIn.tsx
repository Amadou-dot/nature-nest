import { Box } from '@mantine/core';
import CheckInBooking from '../features/check-in-out/CheckInBooking';

export default function CheckIn() {
  return (
    <Box className='mb-40 md:mb-20 lg:mb-0'>
      <CheckInBooking />;
    </Box>
  );
}
