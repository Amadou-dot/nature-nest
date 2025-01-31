import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../services/apiAuth';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      notifications.show({
        title: 'User updated',
        message: 'User data has been updated',
      });
    },
    onError: (error) => {
      notifications.show({
        title: 'User update failed',
        message:
          error instanceof Error
            ? error.message
            : 'There was an error updating the user data',
        color: 'red',
        autoClose: false,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
