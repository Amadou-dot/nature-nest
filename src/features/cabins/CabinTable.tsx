import { useState } from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import CabinRow from './CabinRow';
import { data } from './data';

type Cabin = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
};

const columnHelper = createColumnHelper<Cabin>();

const columns = [
  columnHelper.accessor('image', {
    header: 'Image',
    cell: props => <img src={props.getValue()} alt="Cabin" className="w-24 h-16 object-cover" />,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: props => <>{props.getValue()}</>,
  }),
  columnHelper.accessor('maxCapacity', {
    header: 'Capacity',
    cell: props => <>{props.getValue().toString()}</>,
  }),
  columnHelper.accessor('regularPrice', {
    header: 'Price',
    cell: props => <>${props.getValue().toString()}</>,
  }),
  columnHelper.accessor('discount', {
    header: 'Discount',
    cell: props => <>{props.getValue() === 0 ? '\u2014' : `${props.getValue()}%`}</>,
  }),
];

export default function CabinTable() {
  const [cabins] = useState<Cabin[]>(data);
  const table = useReactTable({
    data: cabins,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className='max-w-[1400px] mx-auto w-full table-auto md:table-fixed'>
      <thead>
        <CabinRow data={table.getHeaderGroups()[0].headers} rowType='header' />
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <CabinRow data={row.getVisibleCells()} rowType='data' key={row.id} />
        ))}
      </tbody>
    </table>
  );
}