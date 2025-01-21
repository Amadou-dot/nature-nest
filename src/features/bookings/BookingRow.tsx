import { LoadingOverlay } from '@mantine/core';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useCheckOut } from '../../hooks/useCheckOut';
import { useDeleteBooking } from '../../hooks/useDeleteBooking';
import { BookingsData } from '../../types/bookings.types';
import { RowProps } from '../../types/table.types';
import Row from '../../ui/Row';

export default function BookingRow(props: RowProps<BookingsData>) {
  const navigate = useNavigate();
  const { mutate: checkOut, isPending } = useCheckOut();
  const { isPending: isDeleting, deleteBooking } = useDeleteBooking();
  if (props.rowType === 'header') return <Row<BookingsData> {...props} />;
  if (isPending || isDeleting) return <LoadingOverlay visible />;

  const { status, id: bookingId } = props.data[0].row.original;
  interface MenuAction {
    color?: string;
    key: string;
    icon: JSX.Element;
    label: string;
    onClick: () => void;
  }
  const menuActions: MenuAction[] = [
    {
      color: '',
      key: 'see-details',
      icon: <HiEye size={16} />,
      label: 'See Details',
      onClick: () => navigate(`/bookings/${props.itemId}`),
    },
    {
      color: 'red',
      key: 'delete',
      icon: <HiTrash size={16} />,
      label: 'Delete',
      onClick: () => deleteBooking(bookingId),
    },
  ];

  if (status === 'unconfirmed')
    menuActions.push({
      key: 'check-in',
      color: '',
      icon: <HiArrowDownOnSquare size={16} />,
      label: 'Check in',
      onClick: () => navigate(`/check-in/${props.itemId}`),
    });

  if (status === 'checked-in')
    menuActions.push({
      key: 'check-out',
      color: '',
      icon: <HiArrowUpOnSquare size={16} />,
      label: 'Check out',
      onClick: () => checkOut(bookingId),
    });
  return <Row<BookingsData> {...props} menuActions={menuActions} />;
}
