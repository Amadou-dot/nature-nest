import { LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRecentBookings } from '../../hooks/useRecentBookings';
import { useRecentStays } from '../../hooks/useRecentStays';

export default function DashboardLayout() {
  const { isPending, bookings, error } = useRecentBookings();
  const { isPending:isPending2, stays, confirmedStays, error:error2} = useRecentStays();
  const isBusy = isPending || isPending2;
  if (isBusy ) return <LoadingOverlay visible />;
  if (error || error2) {
    notifications.show({
      message: 'Error fetching bookings',
      color: 'red',
      autoClose: false,
    });
    return null
  }
  return <div>DashboardLayout</div>;
}
