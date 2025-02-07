import { Box, Button, ButtonGroup, LoadingOverlay, Text } from '@mantine/core';
import {
  Cell,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  Header,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { COLORS, PAGE_SIZES } from '../helpers/constants';
import Empty from './Empty';
type HeaderRowProps<T> = {
  data: Header<T, unknown>[];
  rowType: 'header';
};

type DataRowProps<T> = {
  data: Cell<T, unknown>[];
  rowType: 'data';
  itemId: number;
};
interface TableProps<T> {
  data: T[] | undefined;
  columns: ColumnDef<T, unknown>[];
  filterValue?: string | null;
  filterFn?: (item: T) => boolean;
  sortValue?: string | null;
  sortKeyMap?: Record<string, keyof T>;
  isLoading?: boolean;
  pageSize?: number;
  RowComponent: React.FC<HeaderRowProps<T> | DataRowProps<T>>;
}

export default function Table<T extends { id: number }>({
  data,
  columns,
  filterValue,
  filterFn,
  sortValue,
  sortKeyMap,
  isLoading,
  RowComponent,
  pageSize = PAGE_SIZES.md,
}: TableProps<T>) {
  const [pageIndex, setPageIndex] = useState(0);
  // Filter data
  const filteredData = useMemo(() => {
    if (!data || !filterValue || !filterFn) return data;
    return data.filter(filterFn);
  }, [data, filterValue, filterFn]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!filteredData || !sortValue || !sortKeyMap) return filteredData;

    const [sortKey, sortDirection] = sortValue.split('-');
    const modifier = sortDirection === 'asc' ? 1 : -1;
    const key = sortKeyMap[sortKey] as keyof T;

    return [...filteredData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return modifier * aValue.localeCompare(bValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return modifier * (aValue - bValue);
      }
      return 0;
    });
  }, [filteredData, sortValue, sortKeyMap]);

  const table = useReactTable({
    data: sortedData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
      }
    },
    state: {
      pagination: {
        pageSize,
        pageIndex,
      },
    },
  });

  if (isLoading) return <LoadingOverlay visible color={COLORS.primary} />;
  if (!data || data.length === 0) return <Empty resourceName='items' />;
  return (
    <>
      <table className={`mx-auto h-full w-full max-w-[1800px]`}>
        <thead className='text-grey-800 dark:text-dark-grey-700 md:text-xl'>
          <RowComponent
            data={table.getHeaderGroups()[0].headers}
            rowType='header'
          />
        </thead>
        <tbody className='text-grey-800 dark:text-dark-grey-500'>
          {table.getPaginationRowModel().rows.map((row) => (
            <RowComponent
              key={row.id}
              data={row.getVisibleCells()}
              rowType='data'
              itemId={row.original.id}
            />
          ))}
        </tbody>
      </table>

      {table.getPageCount() > 1 && (
        <Box
          component='footer'
          className={`mx-auto mt-4 flex items-center gap-2`}
        >
          <Text className='text-grey-800 dark:text-dark-grey-700'>{`Page ${
            table.getState().pagination.pageIndex + 1
          } of ${table.getPageCount()}`}</Text>
          <ButtonGroup>
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className='disabled:cursor-not-allowed disabled:opacity-50 dark:bg-brand-600 dark:text-dark-grey-700'
            >
              {'<'}
            </Button>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className='disabled:cursor-not-allowed disabled:opacity-50 dark:bg-brand-600 dark:text-dark-grey-700'
            >
              {'>'}
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </>
  );
}
