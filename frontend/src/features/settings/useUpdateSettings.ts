import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettings } from '../../services/apiSettings';

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () =>
      notifications.show({
        message: 'Settings updated',
        color: 'blue',
      }),

    onError: (error) =>
      notifications.show({
        message:
          error instanceof Error ? error.message : 'Error updating settings',
        color: 'red',
      }),

    onSettled: () => queryClient.invalidateQueries({ queryKey: ['settings'] }),
  });
}
