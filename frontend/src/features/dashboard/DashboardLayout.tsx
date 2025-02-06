import { Box, LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useCabins } from '../../hooks/useCabins';
import { useRecentBookings } from '../../hooks/useRecentBookings';
import { useRecentStays } from '../../hooks/useRecentStays';
import TodayActivity from '../check-in-out/TodayActivity';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import Stats from './Stats';

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
    <Box className='mt-8 space-y-8 md:mb-0'>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <Box className='grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto] 2xl:grid-cols-2'>
        <TodayActivity />
        <DurationChart confirmedStays={confirmedStays} />
      </Box>
      <SalesChart bookings={bookings || []} numDays={numDays} />
    </Box>
  );
}
