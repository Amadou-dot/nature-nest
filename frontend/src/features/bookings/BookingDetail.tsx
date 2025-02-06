import {
  Badge,
  Box,
  Button,
  LoadingOverlay,
  Text
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { getBadgeColor } from '../../helpers/utilFunctions';
import { useBooking } from '../../hooks/useBooking';
import { useCheckOut } from '../../hooks/useCheckOut';
import { useDeleteBooking } from '../../hooks/useDeleteBooking';
import BackButton from '../../ui/BackButton';
import ConfirmDelete from '../../ui/ConfirmDelete';
import PageHeading from '../../ui/PageHeading';
import BookingDataBox from './BookingDataBox';

export default function BookingDetail() {
  const { deleteBooking } = useDeleteBooking();
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
        <Box className='flex flex-col items-center gap-5 md:flex-row'>
          <PageHeading text={`Booking #${bookingId}`} />
          <Badge component='span' className={getBadgeColor(status)}>
            {status}
          </Badge>
        </Box>
        <Box>
          <BackButton />
        </Box>
      </Box>
      <BookingDataBox booking={booking} />
      <Box className='flex justify-end gap-5'>
        <Box className='flex gap-5 mt-5'>
          {status === 'unconfirmed' && (
            <Button onClick={() => navigate(`/check-in/${booking.id}`)}>
              Check in
            </Button>
          )}
          {status === 'checked-in' && (
            <Button onClick={() => checkOut(bookingId)}>Check out</Button>
          )}

          <ConfirmDelete
            onConfirm={() => {
              deleteBooking(bookingId);
              navigate(-1);
            }}
            resourceName='booking'
          />
        </Box>
      </Box>
    </Box>
  );
}
