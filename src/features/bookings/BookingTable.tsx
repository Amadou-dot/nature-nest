import { Badge, NumberFormatter } from '@mantine/core';
import {
  CellContext,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import {
  formatDistanceFromNow,
  subtractDates,
} from '../../helpers/utilFunctions';
import { useBookings } from '../../hooks/useBookings';
import { BookingsData } from '../../types/bookings.types';
import Table from '../../ui/Table';
import BookingRow from './BookingRow';
const getBadgeColor = (status: string | null) => {
  const colors = { text: 'white', badge: 'gray' };
  if (!status) return colors;
  if (status === 'checked-in') colors.badge = 'teal';
  if (status === 'unconfirmed') colors.badge = 'blue';
  return colors;
};
const columnHelper = createColumnHelper<BookingsData>();
const columns: ColumnDef<BookingsData, never>[] = [
  columnHelper.accessor('cabins.name', {
    header: 'Cabin',
    cell: (props: CellContext<BookingsData, string | null>) => props.getValue(),
  }),
  columnHelper.accessor('guests', {
    header: 'Guest',
    cell: (
      props: CellContext<
        BookingsData,
        { fullName: string; email: string } | null
      >
    ) => (
      <>
        <span>{props.getValue()?.fullName}</span> <br />
        <span className='text-slate-400 text-sm'>
          {props.getValue()?.email}{' '}
        </span>
      </>
    ),
  }),
  columnHelper.accessor('startDate', {
    header: 'Dates',
    cell: (props: CellContext<BookingsData, string | null>) => {
      const { startDate, endDate } = props.row.original;
      return (
        <div className='flex flex-col'>
          <span className='font-semibold'>{`${formatDistanceFromNow(
            startDate!
          )} ${'\u2192'} ${subtractDates(
            endDate!,
            startDate!
          )} night stay`}</span>
          <span className='text-slate-500'>
            {`${format(parseISO(endDate!), 'MMM dd yyyy')} ${'\u2014'} ${format(
              parseISO(endDate!),
              'MMM dd yyyy'
            )}`}
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (props: CellContext<BookingsData, string | null>) => (
      <Badge color={getBadgeColor(props.getValue()).badge}>
        {props.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor('totalPrice', {
    header: 'Total Price',
    cell: (props: CellContext<BookingsData, number | null>) => (
      <NumberFormatter
        prefix='$'
        value={props.getValue() || NaN}
        thousandSeparator
      />
    ),
  }),
];

const sortKeyMap = {
  id: 'id',
  startDate: 'startDate',
  // Add more sort keys...
} as const;

export default function BookingTable() {
  const { data: bookings, error, isPending } = useBookings();

  if (error) throw new Error('Error fetching bookings');

  return (
    <div className='w-full overflow-x-auto px-4'>
      <Table<BookingsData>
        data={bookings}
        columns={columns as ColumnDef<BookingsData, unknown>[]}
        sortKeyMap={sortKeyMap}
        isLoading={isPending}
        RowComponent={BookingRow}
      />
    </div>
  );
}
