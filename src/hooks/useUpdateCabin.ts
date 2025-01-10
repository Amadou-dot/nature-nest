import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModal } from '../context/ModalContext';
import { updateCabin } from '../services/apiCabins';
import { Database } from '../types/database.types';
type FormCabin = Database['public']['Tables']['cabins']['Form'];
export const useUpdateCabin = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

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
        position: 'top-center',
      });
      closeModal();
    },
    onError: error =>
      notifications.show({
        message:
          error instanceof Error ? error.message : 'Error updating cabin',
        color: 'red',
        position: 'top-center',
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cabins'] }),
  });

  return { updateCabinMutation, updateError, isUpdating };
};
