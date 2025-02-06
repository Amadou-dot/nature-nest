import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
      });
    },
    onError: (error) => {
      notifications.show({
        title: 'Cabin not deleted',
        message:
          error instanceof Error ? error.message : 'Error deleting cabin',
        color: 'red',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
  });
  return { isPending, deleteCabinMutation };
};
