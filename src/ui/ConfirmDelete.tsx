import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

export default function ConfirmDelete({
  resourceName,
  onConfirm,
  onCancel,
  noButton = false,
}: {
  resourceName: string;
  onConfirm: () => void;
  onCancel?: () => void;
  noButton?: boolean;
}) {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `Delete this ${resourceName} `,
      centered: true,
      children: (
        <Text size='sm'>
          Are you sure you want to delete this {resourceName}?
        </Text>
      ),
      labels: {
        confirm: `Delete ${resourceName}`,
        cancel: "No don't delete it",
      },
      confirmProps: { style: { backgroundColor: 'red', color: 'white' } },
      onCancel,
      onConfirm,
    });
  if (noButton) return openDeleteModal();
  return (
    <Button onClick={openDeleteModal} className='bg-red-700 hover:bg-red-800'>
      Delete {resourceName}
    </Button>
  );
}
