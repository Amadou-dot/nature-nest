import { Box, LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRecentBookings } from '../../hooks/useRecentBookings';
import { useRecentStays } from '../../hooks/useRecentStays';
import Stats from './Stats';
import { useCabins } from '../../hooks/useCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';

export default function DashboardLayout() {
  const { isPending, bookings, error, numDays } = useRecentBookings();
  const {
    isPending: isPending2,
    confirmedStays,
    error: error2,
  } = useRecentStays();
  const { data: cabins, isPending: isPending3, error: error3 } = useCabins();
  const isBusy = isPending || isPending2 || isPending3;
  const hasError = error || error2 || error3;

  if (isBusy) return <LoadingOverlay visible />;
  if (hasError) {
    notifications.show({
      message: 'Error fetching bookings',
      color: 'red',
      autoClose: false,
    });
    return null;
  }

  return (
    <Box className='mt-8 space-y-8'>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <SalesChart bookings={bookings || []} numDays={numDays} />
      <DurationChart />
    </Box>
  );
}
