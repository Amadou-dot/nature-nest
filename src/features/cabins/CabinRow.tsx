import { Cell, CellContext, flexRender, Header } from '@tanstack/react-table';
import { Database } from '../../interfaces/database.types';
import ContextMenu from '../../ui/ContextMenu';
type Cabin = Database['public']['Tables']['cabins']['Row'];
type HeaderType = Header<Cabin, unknown>;
type CellType = Cell<Cabin, unknown>;

type HeaderRowProps = {
  data: HeaderType[];
  rowType: 'header';
};

type DataRowProps = {
  data: CellType[];
  rowType: 'data';
  cabinId: number;
};

type CabinRowProps = HeaderRowProps | DataRowProps;

export default function CabinRow(props: CabinRowProps) {
  return (
    <tr className='border-b border-gray-200 hover:bg-gray-100'>
      {props.rowType === 'header' &&
        props.data?.map(row => (
          <th className='bg-gray-100 px-4 py-2 text-left' key={row.id}>
            {row.column.columnDef.header?.toString()}
          </th>
        ))}
      {props.rowType === 'data' && (
        <>
          {props.data?.map(cell => (
            <td className='px-4 py-2' key={cell.id}>
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext() as CellContext<Cabin, unknown>
              )}
            </td>
          ))}
          <td>
            <ContextMenu cabinId={props.cabinId} />
          </td>
        </>
      )}
    </tr>
  );
}
