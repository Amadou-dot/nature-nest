import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../ui/BookingTableOperations';

export default function Bookings() {
  return (
    <div className='max-w-[1400px] mx-auto px-4 md:px-0'>
      <div className='flex justify-between items-center mb-5 flex-col md:flex-row gap-5'>
        <h1 className='text-lg text-center md:text-left md:text-3xl hidden md:block'>
          All Bookings
        </h1>
        <BookingTableOperations />
      </div>

      <BookingTable />
      <div className='flex justify-end mt-5'></div>
    </div>
  );
}
