import { HiEye } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { BookingsData } from '../../types/bookings.types';
import { RowProps } from '../../types/table.types';
import Row from '../../ui/Row';

export default function BookingRow(props: RowProps<BookingsData>) {
  const navigate = useNavigate();
  const menuActions = [
    {
      icon: <HiEye size={16} />,
      label: 'See Details',
      onClick: () =>
        props.rowType === 'data' && navigate(`/bookings/${props.itemId}`),
    },
  ];
  return <Row<BookingsData> {...props} menuActions={menuActions} />

}
