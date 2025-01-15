import { Box, Text } from '@mantine/core';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { formatDate, formatDistanceFromNow } from '../../helpers/utilFunctions';
import { BookingProp } from '../../types/database.types';

export default function BookingHeader({ booking }: BookingProp) {
  const { startDate, endDate, cabins, numNights } = booking;
  const { name: cabinName } = cabins;
  return (
    <Box className='flex items-center justify-between rounded-lg bg-indigo-600 p-4 text-slate-100'>
      <Text className='flex items-center gap-2 text-lg font-semibold'>
        <HiOutlineHomeModern size={24} /> {numNights} nights in Cabin{' '}
        {cabinName}
      </Text>
      <Text className='text-lg'>
        {`${startDate && formatDate(startDate)} (${startDate && formatDistanceFromNow(startDate)}) - 
    ${endDate && formatDate(endDate)}`}
      </Text>
    </Box>
  );
}
