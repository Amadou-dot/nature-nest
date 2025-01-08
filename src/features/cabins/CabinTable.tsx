import { useQuery } from '@tanstack/react-query';
import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Database } from '../../interfaces/database.types';
import { getCabins } from './apiCabins';
import CabinRow from './CabinRow';
import { LoadingOverlay } from '@mantine/core';
import Button from '../../ui/Button';
type Cabin = Database['public']['Tables']['cabins']['Row'];
const columnHelper = createColumnHelper<Cabin>();

const columns = [
  columnHelper.accessor('image', {
    header: 'Image',
    cell: (props: CellContext<Cabin, string>) => (
      <img
        src={props?.getValue()}
        alt='Cabin'
        className='w-24 h-16 object-cover'
      />
    ),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: props => <>{props.getValue()}</>,
  }),
  columnHelper.accessor('maxCapacity', {
    header: 'Capacity',
    cell: props => <>{props.getValue()?.toString()}</>,
  }),
  columnHelper.accessor('regularPrice', {
    header: 'Price',
    cell: props => <>${props.getValue()?.toString()}</>,
  }),
  columnHelper.accessor('discount', {
    header: 'Discount',
    cell: props => (
      <>{props.getValue() === 0 ? '\u2014' : `${props.getValue()}%`}</>
    ),
  }),
];

export default function CabinTable() {
  const {
    data: cabins,
    error,
    isPending,
  } = useQuery({ queryKey: ['cabins'], queryFn: getCabins });
  if (error) throw new Error(error.message);
  const table = useReactTable({
    data: cabins || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) return <LoadingOverlay visible />;
  return (
    <>
      <table className='max-w-[1400px] mx-auto w-full table-auto md:table-fixed'>
        <thead>
          <CabinRow
            data={table.getHeaderGroups()[0].headers}
            rowType='header'
          />
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <CabinRow
              data={row.getVisibleCells()}
              rowType='data'
              key={row.id}
            />
          ))}
        </tbody>
      </table>
      <Button className='mt-2 ml-4' size='large'>Add Cabin</Button>
    </>
  );
}
