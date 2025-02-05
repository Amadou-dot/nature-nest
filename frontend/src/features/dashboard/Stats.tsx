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
        <Box className='flex flex-col justify-around md:flex-row'>
      <Box className='flex w-full flex-wrap justify-around gap-4'>
        <Box className='w-40 h-40'>
          <Stat
            title='Bookings'
            icon={HiOutlineBriefcase}
            value={totalBookings}
            color={isDarkMode ? '#0096c7' : '#3a0ca3'}
          />
        </Box>
        <Box className='w-40 h-40'>
          <Stat
            title='Sales'
            icon={HiOutlineBanknotes}
            value={formatCurrency(totalSales)}
            color={isDarkMode ? '#52b788' : '#008000'}
          />
        </Box>
      </Box>
      <Box className='flex w-full flex-wrap justify-around gap-4'>
        <Box className='w-40 h-40'>
          <Stat
            title='Check ins'
            icon={HiOutlineCalendarDays}
            value={checkIns}
            color={isDarkMode ? '#A2B1F6' : '#b100e8'}
          />
        </Box>
        <Box className='w-40 h-40'>
          <Stat
            title='Occupancy'
            icon={HiOutlineChartBar}
            value={occupancyRate.toFixed(2) + '%'}
            color={isDarkMode ? '#e76f51' : '#792511'}
          />
        </Box>
      </Box>
    </Box>
  );
}
