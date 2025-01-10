import { notifications } from '@mantine/notifications';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateSettings } from '../../services/apiSettings';

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () =>
      notifications.show({
        message: 'Settings updated',
        color: 'blue',
        position: 'top-center',
      }),

    onError: error =>
      notifications.show({
        message:
          error instanceof Error ? error.message : 'Error updating settings',
        color: 'red',
        position: 'top-center',
      }),

    onSettled: () => queryClient.invalidateQueries({ queryKey: ['settings'] }),
  });
}
