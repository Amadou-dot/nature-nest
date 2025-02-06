import { Badge, Box, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { TodayActivityReturn } from '../../types/bookings.types';
import Flag from '../../ui/Flag';
interface TodayItemProps {
  activity: TodayActivityReturn;
}
export default function TodayItem({ activity }: TodayItemProps) {
  const { id, status, guests, numNights } = activity;
  return (
    <Box className='flex flex-col items-center gap-2 p-2 md:flex-row md:justify-around md:gap-4 md:p-3'>
      <Box>
        {status === 'unconfirmed' && (
          <Badge className='bg-green-700 dark:bg-dark-green-100 md:w-24'>
            Arriving
          </Badge>
        )}
        {status === 'checked-in' && (
          <Badge className='bg-blue-700 dark:bg-dark-blue-100 md:w-24'>
            Departing
          </Badge>
        )}
      </Box>
      {guests.countryFlag && (
        <Flag
          countryFlag={guests.countryFlag}
          alt={`${guests.nationality} flag`}
        />
      )}
      <Text className='md:w-full md:max-w-40'>{guests.fullName}</Text>
      <Text>{numNights} nights</Text>

      {status === 'unconfirmed' && (
        <Link
          className='mt-4 w-24 rounded-lg bg-brand-500 p-2 text-center dark:bg-brand-700 md:mt-0'
          to={`/check-in/${id}`}
        >
          Check in
        </Link>
      )}
      {status === 'checked-in' && (
        <Link
          className='mt-4 w-24 rounded-lg bg-brand-500 p-2 text-center dark:bg-brand-700 md:mt-0'
          to={`/bookings/${id}`}
        >
          Check out
        </Link>
      )}
    </Box>
  );
}
