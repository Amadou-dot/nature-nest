import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { COLORS } from '../helpers/constants';
import { updateBooking } from '../services/apiBookings';

export function useCheckOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      notifications.show({
        title: 'Booking checked out',
        message: `The booking ${data.id} has been successfully checked out`,
        color: COLORS.success,
      });
    },

    onError: (error) =>
      notifications.show({
        title: 'Error',
        message: error.message,
        color: COLORS.danger,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ type: 'active' });
    },
  });
}
