import { Button, NumberFormatter } from '@mantine/core';
import {
  CellContext,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { COLORS } from '../../helpers/constants';
import { useCabins } from '../../hooks/useCabins';
import { Cabin } from '../../types/database.types';
import Table from '../../ui/Table';
import CabinForm from './CabinForm';
import CabinRow from './CabinRow';


const columnHelper = createColumnHelper<Cabin>();
const columns: ColumnDef<Cabin, never>[] = [
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
    cell: props => <NumberFormatter value={props.getValue()} />,
  }),
  columnHelper.accessor('regularPrice', {
    header: 'Price',
    cell: props => (
      <NumberFormatter
        prefix='$'
        value={props.getValue() || NaN}
        thousandSeparator
      />
    ),
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

const sortKeyMap = {
  name: 'name',
  regularPrice: 'regularPrice',
  maxCapacity: 'maxCapacity',
} as const;

export default function CabinTable() {
  const { openModal } = useModal();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('filter');
  const sortValue = searchParams.get('sortBy');

  const { data: cabins, error, isPending } = useCabins();
  if (error) throw new Error('Error fetching cabins');

  const filterFn = (cabin: Cabin): boolean => {
    if (filterValue === 'all') return true;
    if (filterValue === 'discounts')
      return typeof cabin.discount === 'number' && cabin.discount > 0;
    if (filterValue === 'no_discounts')
      return !cabin.discount || cabin.discount === 0;
    return true;
  };

  return (
    <div className='w-full overflow-x-auto px-4'>
      <Table<Cabin>
        data={cabins}
        columns={columns as ColumnDef<Cabin, unknown>[]}
        filterValue={filterValue}
        filterFn={filterFn}
        sortValue={sortValue}
        sortKeyMap={sortKeyMap}
        isLoading={isPending}
        RowComponent={CabinRow}
      />
      <Button
        variant='filled'
        color={COLORS.primary}
        size='md'
        onClick={() => openModal(<CabinForm mode='create' />)}>
        Add Cabin
      </Button>
    </div>
  );
}
