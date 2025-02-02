import { NumberFormatter } from "@mantine/core";
import { CellContext, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Cabin } from "../../types/database.types";

const columnHelper = createColumnHelper<Cabin>();
export const desktopCabinColumns: ColumnDef<Cabin, never>[] = [
  columnHelper.accessor('image', {
    header: 'Image',
    cell: (props: CellContext<Cabin, string>) => (
      <img
        src={props?.getValue()}
        alt='Cabin'
        className='h-16 w-24 object-cover'
      />
    ),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (props) => <>{props.getValue()}</>,
  }),
  columnHelper.accessor('maxCapacity', {
    header: 'Capacity',
    cell: (props) => <NumberFormatter value={props.getValue()} />,
  }),
  columnHelper.accessor('regularPrice', {
    header: 'Price',
    cell: (props) => (
      <NumberFormatter
        prefix='$'
        value={props.getValue() || NaN}
        thousandSeparator
      />
    ),
  }),
  columnHelper.accessor('discount', {
    header: 'Discount',
    cell: (props) => (
      <>
        {!props.getValue() || props.getValue() === 0 ? (
          '\u2014'
        ) : (
          <span className='text-green-600'>{`${props.getValue()}%`}</span>
        )}
      </>
    ),
  }),
];

export const mobileCabinColumns: ColumnDef<Cabin, never>[] = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (props) => <>{props.getValue()}</>,
  }),
  columnHelper.accessor('maxCapacity', {
    header: 'Capacity',
    cell: (props) => <NumberFormatter value={props.getValue()} />,
  }),
  columnHelper.accessor('regularPrice', {
    header: 'Price',
    cell: (props) => (
      <NumberFormatter
        prefix='$'
        value={props.getValue() || NaN}
        thousandSeparator
      />
    ),
  }),
];