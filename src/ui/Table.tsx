import { LoadingOverlay } from '@mantine/core';
import {
    Cell,
    ColumnDef,
    getCoreRowModel,
    Header,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
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
}: TableProps<T>) {
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
  });

  if (isLoading) return <LoadingOverlay visible />;
  if (!data || data.length === 0) return <Empty resourceName='items' />;
  return (
    <table className='w-full max-w-[1400px] mx-auto h-full'>
      <thead>
        <RowComponent
          data={table.getHeaderGroups()[0].headers}
          rowType='header'
        />
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <RowComponent
            key={row.id}
            data={row.getVisibleCells()}
            rowType='data'
            itemId={row.original.id}
          />
        ))}
      </tbody>
    </table>
  );
}
