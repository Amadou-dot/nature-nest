import { Box, useMantineColorScheme } from '@mantine/core';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { formatCurrency } from '../../helpers/utilFunctions';
import { BookingAfterDate, StayAfterDate } from '../../types/bookings.types';
import Stat from './Stat';

interface StatsProps {
  bookings: BookingAfterDate[] | undefined;
  confirmedStays: StayAfterDate[] | undefined;
  numDays: number;
  cabinCount: number;
}
export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: StatsProps) {
  if (!bookings || !confirmedStays) return null;
  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const totalBookings = bookings.length;
  const totalSales = bookings.reduce(
    (acc, booking) => acc + booking.totalPrice,
    0,
  );
  const checkIns = confirmedStays.length;
  const occupancyRate =
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * cabinCount)) *
    100;
  return (
    <Box className='grid grid-cols-1 items-center gap-4 divide-x-0 dark:divide-dark-grey-200 dark:bg-dark-grey-0 md:grid-cols-2 lg:grid-cols-4 lg:divide-x h-fit py-4 lg:py-8'>
      <Stat
        icon={HiOutlineBriefcase}
        title='Bookings'
        value={totalBookings}
        color={isDarkMode ? '#0096c7' : '#3a0ca3'}
      />
      <Stat
        icon={HiOutlineBanknotes}
        title='Sales'
        value={formatCurrency(totalSales)}
        color={isDarkMode ? '#52b788' : '#008000'}
      />
      <Stat
        icon={HiOutlineCalendarDays}
        title='Check ins'
        value={checkIns}
        color={isDarkMode ? '#A2B1F6' : '#b100e8'}
      />
      <Stat
        icon={HiOutlineChartBar}
        title='Occupancy rate'
        value={occupancyRate.toFixed(2) + '%'}
        color={isDarkMode ? '#e76f51' : '#792511'}
      />
    </Box>
  );
}
