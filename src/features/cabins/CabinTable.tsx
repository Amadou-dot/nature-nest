import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import {
  MOBILE_MAX_WIDTH,
  PAGE_SIZES,
  TABLET_MAX_WIDTH,
} from '../../helpers/constants';
import { useCabins } from '../../hooks/useCabins';
import { Cabin } from '../../types/database.types';
import Table from '../../ui/Table';
import CabinForm from './CabinForm';
import CabinRow from './CabinRow';
import {
  desktopCabinColumns,
  mobileCabinColumns,
} from './ResponsiveCabinColumns';

const sortKeyMap = {
  name: 'name',
  regularPrice: 'regularPrice',
  maxCapacity: 'maxCapacity',
} as const;

export default function CabinTable() {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
  const isTablet = useMediaQuery(`(max-width: ${TABLET_MAX_WIDTH}px)`);
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
  const columns = isMobile
    ? (mobileCabinColumns as ColumnDef<Cabin, unknown>[])
    : (desktopCabinColumns as ColumnDef<Cabin, unknown>[]);
  const pageSize = isMobile
    ? PAGE_SIZES.xs
    : isTablet
      ? PAGE_SIZES.sm
      : PAGE_SIZES.md;

  return (
    <>
      <Table<Cabin>
        data={cabins}
        columns={columns}
        filterValue={filterValue}
        filterFn={filterFn}
        sortValue={sortValue}
        sortKeyMap={sortKeyMap}
        isLoading={isPending}
        RowComponent={CabinRow}
        pageSize={pageSize}
      />
      <Button
        className='mt-4 dark:bg-brand-600'
        variant='filled'
        size='md'
        onClick={() => openModal(<CabinForm mode='create' />)}
      >
        Add Cabin
      </Button>
    </>
  );
}
