import { Cell, Header } from '@tanstack/react-table';
export interface MenuAction {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}
export type HeaderRowProps<T> = {
  data: Header<T, unknown>[];
  rowType: 'header';
  menuActions?: MenuAction[];
};


export type DataRowProps<T> = {
  data: Cell<T, unknown>[];
  rowType: 'data';
  itemId: number;
  contextMenu?: React.ReactNode;
  menuActions?: MenuAction[];
};

export type RowProps<T> = HeaderRowProps<T> | DataRowProps<T>;
