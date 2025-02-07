import { notifications } from '@mantine/notifications';
import { ERROR_MESSAGES } from '../helpers/constants';
import { getToday } from '../helpers/utilFunctions';
import { supabase } from '../supabase';
import {
  BookingAfterDate,
  BookingsData,
  StayAfterDate,
  TodayActivityReturn,
} from '../types/bookings.types';
import { Booking, Cabin, Guest } from '../types/database.types';
interface GetBookingsProps {
  filter: { field: keyof Booking; value: string } | null;
  sortBy: { field: keyof Booking; direction: 'asc' | 'desc' };
}
/**
 * Fetches all bookings from the database
 * @param filter - Filter to apply to the query
 * @param sortBy - Sort to apply to the query
 * @returns Array of bookings
 */
export const getBookings = async ({ filter, sortBy }: GetBookingsProps) => {
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName,email)');

  // filter
  if (filter) query = query.eq(filter.field, filter.value);
  // sort
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  const { data, error } = await query;

  if (error) {
    notifications.show({
      message: ERROR_MESSAGES.fetchBookings,
      color: 'red',
    });
    throw new Error(ERROR_MESSAGES.fetchBookings);
  }
  return data as unknown as BookingsData[];
};

/**
 * Fetches a single booking from the database
 * @param id the booking id
 * @returns the booking
 */
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

/**
 * Fetches all bookings that were created after a given date
 * @param date the date after which the bookings were created
 * @returns all BOOKINGS that are were created after the given date.
 */
export async function getBookingsAfterDate(
  date: string,
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

/**
 * Fetches info about the stays that were created after a given date.
 * @param date date after which the stays were created
 * @returns all STAYS that are were created after the given date
 */
export async function getStaysAfterDate(
  date: string,
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

/** Gets bookings that were changed today i.e. checked in or checked out today */
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data as TodayActivityReturn[];
}

/**
 * Updates a booking in the database
 * @param id id of the booking to update
 * @param obj Properties to update
 * @returns The updated booking
 */
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
  return data as Booking;
}

/**
 * Deletes a booking from the database
 * @param id id of the booking to delete
 * @returns The deleted booking
 */
export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error(ERROR_MESSAGES.deleteBooking);
  }
  return data as unknown as Booking;
}
