import { Badge, Box, Button, LoadingOverlay, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { getBadgeColor } from '../../helpers/utilFunctions';
import { useBooking } from '../../hooks/useBooking';
import { COLORS } from '../../helpers/constants';
import BookingDataBox from './BookingDataBox';

export default function BookingDetail() {
  const navigate = useNavigate();
  const { data: booking, isPending, error } = useBooking();
  if (error) return <Text>Error: {error.message}</Text>;
  if (isPending) return <LoadingOverlay visible />;
  const { status, id:bookingId } = booking;
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
          <Button
            color={COLORS.primary}
            variant='transparent'
            onClick={() => navigate(-1)}>
            &#x2190; Back
          </Button>
        </Box>
      </Box>
      <BookingDataBox booking={booking} />
    </Box>
  );
}
