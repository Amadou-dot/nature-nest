import { Badge, Box, Button, LoadingOverlay, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../helpers/constants';
import { getBadgeColor } from '../../helpers/utilFunctions';
import { useBooking } from '../../hooks/useBooking';
import { useCheckOut } from '../../hooks/useCheckOut';
import BackButton from '../../ui/BackButton';
import BookingDataBox from './BookingDataBox';

export default function BookingDetail() {
  const { data: booking, isPending, error } = useBooking();
  const navigate = useNavigate();
  const { mutate: checkOut, isPending: isCheckingOut } = useCheckOut();

  if (error) return <Text>Error: {error.message}</Text>;
  if (isPending || isCheckingOut) return <LoadingOverlay visible />;
  if (!booking) return <Text>No booking found</Text>;
  const { status, id: bookingId } = booking;
  return (
    <Box>
      <Box className='flex items-center justify-between'>
        <Box className='flex items-center gap-5'>
          <Text component='h1' className='text-2xl font-bold text-slate-700'>
            Booking #{bookingId}
          </Text>
          <Badge component='span' color={getBadgeColor(status)} variant='light'>
            {status}
          </Badge>
        </Box>
        <Box>
          <BackButton />
        </Box>
      </Box>
      <BookingDataBox booking={booking} />
      <Box className='flex justify-end'>
        {status === 'unconfirmed' && (
          <Button
            color={COLORS.primary}
            onClick={() => navigate(`/check-in/${booking.id}`)}
          >
            Check in
          </Button>
        )}
        {status === 'checked-in' && (
          <Button color={COLORS.primary} onClick={() => checkOut(bookingId)}>
            Check out
          </Button>
        )}
      </Box>
    </Box>
  );
}
