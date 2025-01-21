import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { COLORS, NOTIFICATION_POSITION } from '../helpers/constants';
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
        position: NOTIFICATION_POSITION,
      });
    },

    onError: (error) =>
      notifications.show({
        title: 'Error',
        message: error.message,
        color: COLORS.danger,
        position: NOTIFICATION_POSITION,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ type: 'active' });
    },
  });
}
