import { CellContext, flexRender } from '@tanstack/react-table';
import { useContextMenu } from 'mantine-contextmenu';
import { DataRowProps, RowProps } from '../types/table.types';

export default function Row<T extends { id: number }>(props: RowProps<T>) {
  const { showContextMenu } = useContextMenu();
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
            <td
              className='px-4 py-2'
              key={cell.id}
              onContextMenu={e => {
                if (props.menuActions) {
                  e.preventDefault();
                  showContextMenu(
                    props.menuActions.map(action => ({
                      key: action.label,
                      icon: action.icon,
                      title: action.label,
                      onClick: action.onClick,
                    }))
                  )(e);
                }
              }}>
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext() as CellContext<T, unknown>
              )}
            </td>
          ))}
          {(props as DataRowProps<T>).contextMenu && (
            <td>{(props as DataRowProps<T>).contextMenu}</td>
          )}
        </>
      )}
    </tr>
  );
}
