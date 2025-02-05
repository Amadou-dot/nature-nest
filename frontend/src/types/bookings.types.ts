import { Database } from './database.types';

type Booking = Database['public']['Tables']['bookings']['Row'];
export type BookingsData = Booking & {
  cabins: { name: string };
  guests: { fullName: string; email: string };
};

export interface BookingAfterDate {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
}


export interface StayAfterDate {
  id: number;
  startDate: string;
  endDate: string;
  status: string;
  numNights: number;
  guests: {
    fullName: string;
  }[];
}