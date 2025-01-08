import { Cell, CellContext, flexRender, Header } from '@tanstack/react-table';
import ContextMenu from '../../ui/contextMenu/ContextMenu';

type Cabin = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
};
type HeaderType = Header<Cabin, unknown>;
type CellType = Cell<Cabin, unknown>;
export default function CabinRow({
  data,
  rowType,
}: {
  data: HeaderType[] | CellType[];
  rowType: 'header' | 'data';
}) {
  return (
    <tr>
      {(rowType === 'header' &&
        data?.map(row => (
          <th className='bg-gray-100 px-4 py-2 text-left' key={row.id}>
            {row.column.columnDef.header?.toString()}
          </th>
        ))) ||
        null}
      {(rowType === 'data' &&
        data?.map(cell => (
          <td className='px-4 py-2' key={cell.id}>
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext() as CellContext<Cabin, unknown>
            )}
          </td>
        ))) ||
        null}
      {rowType === 'data' && <ContextMenu />}
    </tr>
  );
}
