import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../helpers/constants';
import { updateBooking } from '../../services/apiBookings';
import { Booking } from '../../types/database.types';
type MutationProps = {
  bookingId: number;
  bookingObj?: Partial<Booking>;
};
export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ bookingId, bookingObj = {} }: MutationProps) =>
      updateBooking(bookingId, {
        ...bookingObj,
        status: 'checked-in',
        isPaid: true,
      }),
    onSuccess: (data) => {
      notifications.show({
        title: 'Booking checked in',
        message: `The booking ${data.id} has been successfully checked in`,
        color: COLORS.success,
        position: 'top-center',
      });
      navigate('/');
    },

    onError: (error) =>
      notifications.show({
        title: 'Error',
        message: error.message,
        color: COLORS.danger,
        position: 'top-center',
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ type: 'active' });
    },
  });
}
