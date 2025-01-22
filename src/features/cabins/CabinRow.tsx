import { modals } from '@mantine/modals';
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi2';
import { useDeleteCabin } from '../../hooks/useDeleteCabin';
import { getCabinById } from '../../services/apiCabins';
import { Cabin } from '../../types/database.types';
import { RowProps } from '../../types/table.types';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Row from '../../ui/Row';
import CabinDetails from './CabinDetails';
import CabinForm from './CabinForm';

export default function CabinRow(props: RowProps<Cabin>) {
  const { deleteCabinMutation } = useDeleteCabin();

  if (props.rowType === 'header') {
    return <Row<Cabin> {...props} />;
  }

  const cabinId = props.itemId;
  const menuActions = [
    {
      icon: <HiPencil size={16} />,
      label: 'Edit',
      onClick: async () => {
        const cabinData = await getCabinById(cabinId);
        modals.open({
          title: 'Edit Cabin',
          children: (
            <CabinForm
              mode='edit'
              cabinData={cabinData || ({} as Cabin)}
              cabinId={cabinId}
            />
          ),
          modalId: 'edit-cabin',
          size: 'lg',
        });
      },
    },
    {
      icon: <HiEye size={16} />,
      label: 'View Details',
      onClick: () =>
        modals.open({
          title: 'Cabin Details',
          children: <CabinDetails cabinId={cabinId} />,
          modalId: 'cabin-details',
          size: 'lg',
        }),
    },
    {
      icon: <HiTrash size={16} />,
      label: 'Delete',
      color: 'red',
      onClick: () =>
        ConfirmDelete({
          resourceName: 'cabin',
          onConfirm: () => deleteCabinMutation(cabinId),
          noButton: true,
        }),
    },
  ];

  return <Row<Cabin> {...props} menuActions={menuActions} />;
}
