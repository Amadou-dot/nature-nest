import { Badge, NumberFormatter } from "@mantine/core";
import { CellContext, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { formatDistanceFromNow, subtractDates, getBadgeColor } from "../../helpers/utilFunctions";
import { BookingsData } from "../../types/bookings.types";

const columnHelper = createColumnHelper<BookingsData>();

export const desktopColumns: ColumnDef<BookingsData, never>[] = [
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
        <span className='text-sm text-slate-400'>
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
            startDate!,
          )} ${'\u2192'} ${subtractDates(
            endDate!,
            startDate!,
          )} night stay`}</span>
          <span className='text-slate-500'>
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
      <Badge color={getBadgeColor(props.getValue())}>{props.getValue()}</Badge>
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

export const mobileColumns: ColumnDef<BookingsData, never>[] = [
  columnHelper.accessor('guests', {
    header: 'Guest',
    cell: (props: CellContext<BookingsData, { fullName: string; email: string } | null>) => (
      <>
        <span>{props.getValue()?.fullName}</span> <br />
        <span className='text-sm text-slate-400'>{props.getValue()?.email}</span>
      </>
    ),
  }),
  columnHelper.accessor('totalPrice', {
    header: 'Price',
    cell: (props: CellContext<BookingsData, number | null>) => (
      <NumberFormatter prefix='$' value={props.getValue() || NaN} thousandSeparator />
    ),
  }),
];

export const tabletColumns: ColumnDef<BookingsData, never>[] = [
  columnHelper.accessor('cabins.name', {
    header: 'Cabin',
    cell: (props: CellContext<BookingsData, string | null>) => props.getValue(),
  }),
  columnHelper.accessor('guests', {
    header: 'Guest',
    cell: (props: CellContext<BookingsData, { fullName: string; email: string } | null>) => (
      <>
        <span>{props.getValue()?.fullName}</span> <br />
        <span className='text-sm text-slate-400'>{props.getValue()?.email}</span>
      </>
    ),
  }),
  columnHelper.accessor('totalPrice', {
    header: 'Price',
    cell: (props: CellContext<BookingsData, number | null>) => (
      <NumberFormatter prefix='$' value={props.getValue() || NaN} thousandSeparator />
    ),
  }),
];

export const largeTabletColumns: ColumnDef<BookingsData, never>[] = [
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
        <span className='text-sm text-slate-400'>
          {props.getValue()?.email}{' '}
        </span>
      </>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (props: CellContext<BookingsData, string | null>) => (
      <Badge color={getBadgeColor(props.getValue())}>{props.getValue()}</Badge>
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