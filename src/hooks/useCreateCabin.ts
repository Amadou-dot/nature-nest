import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModal } from '../context/ModalContext';
import { createCabin } from '../services/apiCabins';

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const {
    mutate: createCabinMutation,
    error: createError,
    isPending: isCreating,
  } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      notifications.show({
        message: 'Cabin created successfully',
        color: 'green',
        position: 'top-center',
      });
      closeModal();
    },
    onError: error =>
      notifications.show({
        message:
          error instanceof Error ? error.message : 'Error creating cabin',
        color: 'red',
        position: 'top-center',
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cabins'] }),
  });

  return { createCabinMutation, createError, isCreating };
};
