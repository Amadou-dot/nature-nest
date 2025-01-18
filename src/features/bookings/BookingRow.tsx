import { LoadingOverlay } from '@mantine/core';
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../helpers/constants';
import { useCheckOut } from '../../hooks/useCheckout';
import { BookingsData } from '../../types/bookings.types';
import { RowProps } from '../../types/table.types';
import Row from '../../ui/Row';

export default function BookingRow(props: RowProps<BookingsData>) {
  const navigate = useNavigate();
  const { mutate: checkOut, isPending } = useCheckOut();
  if (props.rowType === 'header') return <Row<BookingsData> {...props} />;
  if (isPending) return <LoadingOverlay visible />;

  const { status, id: bookingId } = props.data[0].row.original;
  const menuActions = [
    {
      color: '',
      key: 'see-details',
      icon: <HiEye size={16} />,
      label: 'See Details',
      onClick: () => navigate(`/bookings/${props.itemId}`),
    },
  ];

  if (status === 'unconfirmed')
    menuActions.push({
      key: 'check-in',
      color: COLORS.success,
      icon: <HiArrowDownOnSquare size={16} />,
      label: 'Check in',
      onClick: () => navigate(`/check-in/${props.itemId}`),
    });

  if (status === 'checked-in')
    menuActions.push({
      key: 'check-out',
      color: COLORS.danger,
      icon: <HiArrowUpOnSquare size={16} />,
      label: 'Check out',
      onClick: () => checkOut(bookingId),
    });
  return <Row<BookingsData> {...props} menuActions={menuActions} />;
}
