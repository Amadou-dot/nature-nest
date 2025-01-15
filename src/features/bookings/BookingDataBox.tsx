import { Box } from '@mantine/core';
import { BookingWithDetails } from '../../types/database.types';
import BookingFooter from '../check-in-out/BookingFooter';
import BookingHeader from '../check-in-out/BookingHeader';
import GuestInfo from '../check-in-out/GuestInfo';
import PayBreakdown from '../check-in-out/PayBreakdown';

type BookingProp = { booking: BookingWithDetails };

export default function BookingDataBox({ booking }: BookingProp) {
  const { cabins } = booking;
  const { created_at } = cabins;
  return (
    <Box className='space-y-10 rounded-lg py-5 shadow-sm'>
      <BookingHeader booking={booking} />
      <GuestInfo booking={booking} />
      <PayBreakdown booking={booking} />
      <BookingFooter created_at={created_at} />
    </Box>
  );
}
