import { useQuery } from '@tanstack/react-query';
import { CellContext, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Database } from '../../interfaces/database.types';
import { getCabins } from './apiCabins';
import CabinRow from './CabinRow';
import { Button, LoadingOverlay } from '@mantine/core';
import { useModal } from '../../context/ModalContext';
import CabinForm from './CabinForm';

type Cabin = Database['public']['Tables']['cabins']['Row'];
const columnHelper = createColumnHelper<Cabin>();

const columns = [
  columnHelper.accessor('image', {
    header: 'Image',
    cell: (props: CellContext<Cabin, string>) => (
      <img src={props?.getValue()} alt="Cabin" className="w-24 h-16 object-cover" />
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
      <>{!props.getValue() || props.getValue() === 0 ? '\u2014' : `${props.getValue()}%`}</>
    ),
  }),
];

export default function CabinTable() {
  const {openModal} = useModal();
  const { data: cabins, error, isPending } = useQuery({ queryKey: ['cabins'], queryFn: getCabins });
  if (error) throw new Error(error.message);
  const table = useReactTable({
    data: cabins || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) return <LoadingOverlay visible />;
  return (
    <div className="w-full overflow-x-auto px-4">
      <table className='w-full max-w-[1400px] mx-auto'>
        <thead>
          <CabinRow data={table.getHeaderGroups()[0].headers} rowType='header' />
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <CabinRow
              data={row.getVisibleCells()}
              rowType='data'
              key={row.id}
              cabinId={row.original.id}
            />
          ))}
        </tbody>
      </table>
      <Button variant="filled" color="#4338ca" size='md'onClick={() => openModal(<CabinForm mode='create' />)}>Add Cabin</Button>
    </div>
  );
}