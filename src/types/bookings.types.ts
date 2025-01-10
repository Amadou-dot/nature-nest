import { Database } from './database.types';

type Booking = Database['public']['Tables']['bookings']['Row'];
export type BookingsData = Booking & {
  cabins: { name: string };
  guests: { fullName: string; email: string };
};
