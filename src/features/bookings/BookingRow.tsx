import { HiArrowDownOnSquare, HiEye } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { BookingsData } from '../../types/bookings.types';
import { RowProps } from '../../types/table.types';
import Row from '../../ui/Row';

export default function BookingRow(props: RowProps<BookingsData>) {
  const navigate = useNavigate();

  const menuActions = [
    {
      key: 'see-details',
      icon: <HiEye size={16} />,
      label: 'See Details',
      onClick: () =>
        props.rowType === 'data' && navigate(`/bookings/${props.itemId}`),
    },
    {
      key: 'check-in',
      color: 'red',
      icon: <HiArrowDownOnSquare size={16} />,
      label: 'Check in',
      onClick: () =>
        props.rowType === 'data' && navigate(`/check-in/${props.itemId}`),
    },
  ];
  return <Row<BookingsData> {...props} menuActions={menuActions} />;
}

//TODO: prevent check-in from showing if booking is already checked in or checked out 