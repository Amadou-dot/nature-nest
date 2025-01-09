import { Button, LoadingOverlay } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { Database } from '../../interfaces/database.types';
import { getCabins } from './apiCabins';
import CabinForm from './CabinForm';
import CabinRow from './CabinRow';

type Cabin = Database['public']['Tables']['cabins']['Row'];
type FilterValue = 'all' | 'discounts' | 'no_discounts' | null;
type SortValue =
  | 'name-asc'
  | 'name-desc'
  | 'regularPrice-asc'
  | 'regularPrice-desc'
  | 'maxCapacity-asc'
  | 'maxCapacity-desc'
  | null;
type SortKey = keyof Cabin;
type SortDirection = 'asc' | 'desc';
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

export default function CabinTable() {
  const { openModal } = useModal();
  const [searchParams] = useSearchParams();

  const {
    data: cabins,
    error,
    isPending,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: () => getCabins(),
  });
  if (error) throw new Error('Error fetching cabins');

  // Filter cabins based on the filter value
  const filterValue = searchParams.get('filter') as FilterValue;
  const filteredCabins = useMemo(
    () =>
      cabins?.filter(cabin => {
        if (filterValue === 'all') return true;
        if (filterValue === 'discounts')
          return cabin.discount && cabin.discount > 0;
        if (filterValue === 'no_discounts')
          return !cabin.discount || cabin.discount === 0;
        return true;
      }),
    [cabins, filterValue]
  );

  // Sort cabins based on the sort value
  const sortValue = searchParams.get('sortBy') as SortValue;
  const [sortKey, sortDirection] =
    (sortValue?.split('-') as [SortKey, SortDirection]) || [];
  const modifier = sortDirection === 'asc' ? 1 : -1;
  const sortedCabins = useMemo(() => {
    if (!filteredCabins || !sortKey) return filteredCabins;

    return [...filteredCabins].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return modifier * aValue.localeCompare(bValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return modifier * (aValue - bValue);
      }

      return 0;
    });
  }, [filteredCabins, modifier, sortKey]);

  const table = useReactTable({
    data: sortedCabins || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) return <LoadingOverlay visible />;
  return (
    <div className='w-full overflow-x-auto px-4'>
      <table className='w-full max-w-[1400px] mx-auto'>
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
              cabinId={row.original.id}
            />
          ))}
        </tbody>
      </table>
      <Button
        variant='filled'
        color='#4338ca'
        size='md'
        onClick={() => openModal(<CabinForm mode='create' />)}>
        Add Cabin
      </Button>
    </div>
  );
}
