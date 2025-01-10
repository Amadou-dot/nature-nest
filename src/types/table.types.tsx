import { Cell, Header } from '@tanstack/react-table';

export type HeaderRowProps<T> = {
  data: Header<T, unknown>[];
  rowType: 'header';
};

export type DataRowProps<T> = {
  data: Cell<T, unknown>[];
  rowType: 'data';
  itemId: number;
  contextMenu?: React.ReactNode;
};

export type RowProps<T> = HeaderRowProps<T> | DataRowProps<T>;
