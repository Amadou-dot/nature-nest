import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModal } from '../context/ModalContext';
import { createCabin } from '../services/apiCabins';
import { NOTIFICATION_POSITION } from '../helpers/constants';

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
        position: NOTIFICATION_POSITION,
      });
      closeModal();
    },
    onError: error =>
      notifications.show({
        message:
          error instanceof Error ? error.message : 'Error creating cabin',
        color: 'red',
        position: NOTIFICATION_POSITION,
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cabins'] }),
  });

  return { createCabinMutation, createError, isCreating };
};
