import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../services/apiBookings';

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get('last')) || 7;

  const computedDate = subDays(new Date(), numDays).toISOString();

  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryFn: () => getBookingsAfterDate(computedDate),
    queryKey: ['bookings', numDays],
  });

  return { isPending, bookings, error, numDays };
};
