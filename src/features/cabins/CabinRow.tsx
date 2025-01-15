import { HiEye, HiPencil, HiTrash } from 'react-icons/hi2';
import { useModal } from '../../context/ModalContext';
import { getCabinById } from '../../services/apiCabins';
import { Cabin } from '../../types/database.types';
import { RowProps } from '../../types/table.types';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Row from '../../ui/Row';
import CabinDetails from './CabinDetails';
import CabinForm from './CabinForm';


export default function CabinRow(props: RowProps<Cabin>) {
  const { openModal } = useModal();

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
        openModal(
          <CabinForm
            mode='edit'
            cabinData={cabinData || ({} as Cabin)}
            cabinId={cabinId}
          />,
        );
      },
    },
    {
      icon: <HiTrash size={16} />,
      label: 'Delete',
      onClick: () => openModal(<ConfirmDelete cabinId={cabinId} />),
      color: 'red',
    },
    {
      icon: <HiEye size={16} />,
      label: 'View Details',
      onClick: () => openModal(<CabinDetails cabinId={cabinId} />),
    },
  ];

  return <Row<Cabin> {...props} menuActions={menuActions} />;
}
