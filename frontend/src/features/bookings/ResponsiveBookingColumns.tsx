import { Badge, NumberFormatter } from '@mantine/core';
import {
  CellContext,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import {
  formatDistanceFromNow,
  getBadgeColor,
  subtractDates,
} from '../../helpers/utilFunctions';
import { BookingsData } from '../../types/bookings.types';

const columnHelper = createColumnHelper<BookingsData>();

export const desktopBookingColumns: ColumnDef<BookingsData, never>[] = [
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
      >,
    ) => (
      <>
        <span className='text-grey-800 dark:text-dark-grey-700'>
          {props.getValue()?.fullName}
        </span>{' '}
        <br />
        <span className='text-sm text-grey-800 dark:text-dark-grey-500'>
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
        <div className='flex flex-col text-grey-800 dark:text-dark-grey-700'>
          <span className='font-semibold'>{`${formatDistanceFromNow(
            startDate!,
          )} ${'\u2192'} ${subtractDates(
            endDate!,
            startDate!,
          )} night stay`}</span>
          <span className='text-grey-800 dark:text-dark-grey-500'>
            {`${format(parseISO(endDate!), 'MMM dd yyyy')} ${'\u2014'} ${format(
              parseISO(endDate!),
              'MMM dd yyyy',
            )}`}
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (props: CellContext<BookingsData, string | null>) => (
      <Badge className={getBadgeColor(props.getValue())}>
        {props.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor('totalPrice', {
    header: 'Price',
    cell: (props: CellContext<BookingsData, number | null>) => (
      <NumberFormatter
        prefix='$'
        value={props.getValue() || NaN}
        thousandSeparator
      />
    ),
  }),
];

export const mobileBookingColumns: ColumnDef<BookingsData, never>[] = [
  columnHelper.accessor('guests', {
    header: 'Guest',
    cell: (
      props: CellContext<
        BookingsData,
        { fullName: string; email: string } | null
      >,
    ) => (
      <>
        <span>{props.getValue()?.fullName}</span> <br />
        <span className='text-grey-800 dark:text-dark-grey-500'>
          {props.getValue()?.email}
        </span>
      </>
    ),
  }),
  columnHelper.accessor('totalPrice', {
    header: 'Price',
    cell: (props: CellContext<BookingsData, number | null>) => (
      <NumberFormatter
        prefix='$'
        value={props.getValue() || NaN}
        thousandSeparator
      />
    ),
  }),
];

export const tabletBookingColumns: ColumnDef<BookingsData, never>[] = [
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
      >,
    ) => (
      <>
        <span>{props.getValue()?.fullName}</span> <br />
        <span className='text-grey-800 dark:text-dark-grey-500'>
          {props.getValue()?.email}
        </span>
      </>
    ),
  }),
  columnHelper.accessor('totalPrice', {
    header: 'Price',
    cell: (props: CellContext<BookingsData, number | null>) => (
      <NumberFormatter
        prefix='$'
        value={props.getValue() || NaN}
        thousandSeparator
      />
    ),
  }),
];

export const largeTabletBookingColumns: ColumnDef<BookingsData, never>[] = [
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
      >,
    ) => (
      <>
        <span>{props.getValue()?.fullName}</span> <br />
        <span className='text-grey-800 dark:text-dark-grey-500'>
          {props.getValue()?.email}{' '}
        </span>
      </>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (props: CellContext<BookingsData, string | null>) => (
      <Badge className={getBadgeColor(props.getValue())}>
        {props.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor('totalPrice', {
    header: 'Price',
    cell: (props: CellContext<BookingsData, number | null>) => (
      <NumberFormatter
        prefix='$'
        value={props.getValue() || NaN}
        thousandSeparator
      />
    ),
  }),
];
