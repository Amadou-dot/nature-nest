import { notifications } from '@mantine/notifications';
import { getToday } from '../helpers/utilFunctions';
import { supabase } from '../supabase';
import { BookingsData } from '../types/bookings.types';
import { Database } from '../types/database.types';
import { ERROR_MESSAGES } from '../helpers/constants';
type Booking = Database['public']['Tables']['bookings']['Row'];
type Cabin = Database['public']['Tables']['cabins']['Row'];
type Guest = Database['public']['Tables']['guests']['Row'];
export const getBookings = async ({
  filter,
  sortBy,
}: {
  filter: { field: keyof Booking; value: string } | null;
  sortBy: { field: keyof Booking; direction: 'asc' | 'desc' };
}) => {
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName,email)');

  // filter
  if (filter) query = query.eq(filter.field, filter.value);
  // sort
  if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' });

  const { data, error } = await query;

  if (error) {
    notifications.show({
      message: ERROR_MESSAGES.fetchBookings,
      color: 'red',
      position: 'top-center',
    });
    throw new Error(ERROR_MESSAGES.fetchBookings);
  }
  return data as unknown as BookingsData[];
};

export async function getBookingById(id: number) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data as Booking & { cabins: Cabin; guests: Guest };
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days
interface BookingAfterDate {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
}

export async function getBookingsAfterDate(
  date: string
): Promise<BookingAfterDate[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data as BookingAfterDate[];
}

// Returns all STAYS that are were created after the given date
interface StayAfterDate {
  id: number;
  startDate: string;
  endDate: string;
  status: string;
  guests: {
    fullName: string;
  }[];
}

export async function getStaysAfterDate(
  date: string
): Promise<StayAfterDate[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data as StayAfterDate[];
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function updateBooking(id: number, obj: Partial<Booking>) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(ERROR_MESSAGES.updateBooking);
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error(ERROR_MESSAGES.deleteBooking);
  }
  return data;
}
