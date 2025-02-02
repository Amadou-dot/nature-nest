import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCabin } from '../services/apiCabins';
import { Database } from '../types/database.types';
type FormCabin = Database['public']['Tables']['cabins']['Form'];
export const useUpdateCabin = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateCabinMutation,
    error: updateError,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: ({ cabinData, id }: { cabinData: FormCabin; id: number }) =>
      updateCabin(id, cabinData),
    onSuccess: () => {
      notifications.show({
        message: 'Cabin updated successfully',
        color: 'green',
      });
      modals.close('edit-cabin');
    },
    onError: (error) =>
      notifications.show({
        message:
          error instanceof Error ? error.message : 'Error updating cabin',
        color: 'red',
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cabins'] }),
  });

  return { updateCabinMutation, updateError, isUpdating };
};
