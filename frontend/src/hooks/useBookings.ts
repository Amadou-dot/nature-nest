import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../services/apiBookings';
import { Booking } from '../types/database.types';

export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status');
  const sortValue = searchParams.get('sortBy') || 'totalPrice-desc';

  const [field, direction] = sortValue.split('-') as [
    field: keyof Booking,
    direction: 'asc' | 'desc'
  ];
  const sortBy = { field, direction };

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : ({ field: 'status', value: filterValue } as {
          field: keyof Booking;
          value: string;
        });

  return useQuery({
    queryKey: ['bookings', filterValue, sortValue],
    queryFn: () => getBookings({ filter, sortBy }),
  });
};
