import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModal } from '../context/ModalContext';
import { deleteCabin } from '../features/cabins/apiCabins';

export default function ConfirmDelete({ cabinId }: { cabinId: number }) {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const { isPending, mutate: deleteCabinMutation } = useMutation({
    mutationFn: () => deleteCabin(cabinId),
    onSuccess: () => {
      notifications.show({
        title: 'Cabin deleted',
        message: 'The cabin has been successfully deleted 🌟',
        color: 'indigo',
        position: 'top-center',
      });
    },
    onError: error => {
      notifications.show({
        title: 'Cabin deleted',
        message:
          error instanceof Error ? error.message : 'Error deleting cabin',
        color: 'red',
        position: 'top-center',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      closeModal();
    },
  });

  return (
    <div className='text-center p-6'>
      <div className='mb-4'>
        <svg
          className='mx-auto h-12 w-12 text-red-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
          />
        </svg>
      </div>

      <h1 className='text-xl font-semibold mb-2 text-gray-900'>
        Are you sure you want to delete this cabin?
      </h1>
      <p className='mb-6 text-gray-600'>This action cannot be undone!</p>

      <div className='flex justify-center gap-4 mt-6'>
        <Button
          variant='filled'
          color='red'
          onClick={() => deleteCabinMutation()}
          loading={isPending}
          className='px-6'>
          Delete
        </Button>
        <Button variant='filled' color='gray' className='px-6'>
          Cancel
        </Button>
      </div>
    </div>
  );
}
