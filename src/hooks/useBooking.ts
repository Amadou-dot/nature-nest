import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBookingById } from '../services/apiBookings';

export function useBooking() {
  const { bookingId } = useParams();
  const id = parseInt(bookingId || '', 10);
  return useQuery({
    queryKey: ['booking'],
    queryFn: () => getBookingById(id),
    retry: false,
  });
}
