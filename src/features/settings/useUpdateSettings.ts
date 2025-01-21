import { notifications } from '@mantine/notifications';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateSettings } from '../../services/apiSettings';
import { NOTIFICATION_POSITION } from '../../helpers/constants';

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () =>
      notifications.show({
        message: 'Settings updated',
        color: 'blue',
        position: NOTIFICATION_POSITION,
      }),

    onError: error =>
      notifications.show({
        message:
          error instanceof Error ? error.message : 'Error updating settings',
        color: 'red',
        position: NOTIFICATION_POSITION,
      }),

    onSettled: () => queryClient.invalidateQueries({ queryKey: ['settings'] }),
  });
}
