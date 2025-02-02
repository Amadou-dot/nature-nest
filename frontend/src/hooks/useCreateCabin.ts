import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../services/apiCabins';

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
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
      });
      modals.close('add-cabin');
    },
    onError: (error) =>
      notifications.show({
        message:
          error instanceof Error ? error.message : 'Error creating cabin',
        color: 'red',
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cabins'] }),
  });

  return { createCabinMutation, createError, isCreating };
};
