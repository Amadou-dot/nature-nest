import { Box, Text } from '@mantine/core';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { formatDate, formatDistanceFromNow } from '../../helpers/utilFunctions';
import { BookingProp } from '../../types/database.types';

export default function BookingHeader({ booking }: BookingProp) {
  const { startDate, endDate, cabins, numNights } = booking;
  const { name: cabinName } = cabins;
  return (
    <Box className='text-grey-200 flex flex-col items-center justify-between rounded-lg bg-indigo-700 p-4 md:flex-row'>
      <Text className='flex items-center gap-2 text-lg font-semibold'>
        <HiOutlineHomeModern size={24} className='dark:text-dark-yellow-100' />{' '}
        {numNights} nights in Cabin {cabinName}
      </Text>
      <Text className='text-grey-500 dark:text-dark-grey-500 md:text-grey-200 md:dark:text-dark-grey-700 md:text-lg'>
        {`${startDate && formatDate(startDate)} (${startDate && formatDistanceFromNow(startDate)}) - 
    ${endDate && formatDate(endDate)}`}
      </Text>
    </Box>
  );
}
