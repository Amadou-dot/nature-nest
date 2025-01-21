import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ERROR_MESSAGES, NOTIFICATION_POSITION } from '../helpers/constants';
import { deleteBooking } from '../services/apiBookings';

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate, error } = useMutation({
    mutationFn: (id: number) => deleteBooking(id),
    onSuccess: () => {
      notifications.show({
        message: 'Booking deleted',
        color: 'blue',
        position: NOTIFICATION_POSITION,
      });
    },
    onError: () => {
      notifications.show({
        message: ERROR_MESSAGES.deleteBooking,
        color: 'red',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ type: 'active' });
    },
  });
  if (error) throw new Error(ERROR_MESSAGES.deleteBooking);
  return { isPending, deleteBooking: mutate };
};
