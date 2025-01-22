import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NOTIFICATION_POSITION } from '../helpers/constants';
import { deleteCabin } from '../services/apiCabins';

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteCabinMutation } = useMutation({
    mutationFn: (id: number) => deleteCabin(id),
    onSuccess: () => {
      notifications.show({
        title: 'Cabin deleted',
        message: 'The cabin has been successfully deleted 🌟',
        color: 'indigo',
        position: NOTIFICATION_POSITION,
      });
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: 'Cabin not deleted',
        message:
          error instanceof Error ? error.message : 'Error deleting cabin',
        color: 'red',
        position: NOTIFICATION_POSITION,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
  });
  return { isPending, deleteCabinMutation };
};
