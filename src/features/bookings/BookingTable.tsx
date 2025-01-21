import { useMediaQuery } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import { useBookings } from '../../hooks/useBookings';
import { BookingsData } from '../../types/bookings.types';
import Table from '../../ui/Table';
import BookingRow from './BookingRow';
import {
  desktopBookingColumns,
  largeTabletBookingColumns,
  mobileBookingColumns,
  tabletBookingColumns,
} from './ResponsiveBookingColumns';
import { LARGE_TABLET_MAX_WIDTH, MOBILE_MAX_WIDTH, PAGE_SIZES, TABLET_MAX_WIDTH } from '../../helpers/constants';

const sortKeyMap = {
  id: 'id',
  startDate: 'startDate',
} as const;

export default function BookingTable() {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
  const isTablet = useMediaQuery(`(max-width: ${TABLET_MAX_WIDTH}px)`);
  const isLargeTablet = useMediaQuery(`(max-width: ${LARGE_TABLET_MAX_WIDTH}px)`);
  const columns = isMobile
    ? mobileBookingColumns
    : isTablet
      ? tabletBookingColumns
      : isLargeTablet
        ? largeTabletBookingColumns
        : desktopBookingColumns;

  const pageSize = isMobile
    ? PAGE_SIZES.xs
    : isTablet
      ? PAGE_SIZES.sm
      : PAGE_SIZES.md;
  const { data: bookings, error, isPending } = useBookings();

  if (error) throw new Error('Error fetching bookings');

  return (
    <Table<BookingsData>
      data={bookings}
      columns={columns as ColumnDef<BookingsData>[]}
      sortKeyMap={sortKeyMap}
      isLoading={isPending}
      RowComponent={BookingRow}
      pageSize={pageSize}
    />
  );
}
