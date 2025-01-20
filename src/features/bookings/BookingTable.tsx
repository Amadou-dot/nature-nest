import { Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import { useBookings } from '../../hooks/useBookings';
import { BookingsData } from '../../types/bookings.types';
import Table from '../../ui/Table';
import BookingRow from './BookingRow';
import {
  desktopColumns,
  largeTabletColumns,
  mobileColumns,
  tabletColumns,
} from './ResponsiveColumns';

const sortKeyMap = {
  id: 'id',
  startDate: 'startDate',
} as const;

export default function BookingTable() {
  const isMobile = useMediaQuery('(max-width: 550px)');
  const isTablet = useMediaQuery('(max-width: 768px)');
  const isLargeTablet = useMediaQuery('(max-width: 1024px)');
  const columns = isMobile
    ? mobileColumns
    : isTablet
      ? tabletColumns
      : isLargeTablet
        ? largeTabletColumns
        : desktopColumns;
  const { data: bookings, error, isPending } = useBookings();

  if (error) throw new Error('Error fetching bookings');

  return (
    <Box className='w-full overflow-x-auto px-4'>
      <Table<BookingsData>
        data={bookings}
        columns={columns as ColumnDef<BookingsData>[]}
        sortKeyMap={sortKeyMap}
        isLoading={isPending}
        RowComponent={BookingRow}
      />
    </Box>
  );
}
