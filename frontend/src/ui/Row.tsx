import { ActionIcon, Menu } from '@mantine/core';
import { CellContext, flexRender } from '@tanstack/react-table';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { RowProps } from '../types/table.types';

export default function Row<T extends { id: number }>(props: RowProps<T>) {
  return (
    <tr className='border-b border-grey-200 last:border-b-0 hover:bg-grey-200 dark:border-dark-grey-200 dark:hover:bg-dark-grey-100'>
      {props.rowType === 'header' &&
        props.data?.map((row) => (
          <th className='px-4 py-2 text-left' key={row.id}>
            {row.column.columnDef.header?.toString()}
          </th>
        ))}
      {props.rowType === 'data' && (
        <>
          {props.data?.map((cell) => (
            <td className='px-4 py-2' key={cell.id}>
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext() as CellContext<T, unknown>,
              )}
            </td>
          ))}
          {props.menuActions && (
            <td className='px-4 py-2'>
              <Menu position='bottom-end' withArrow>
                <Menu.Target>
                  <ActionIcon variant='subtle'>
                    <HiEllipsisVertical size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  {props.menuActions.map((action) => (
                    <Menu.Item
                      key={action.label}
                      leftSection={action.icon}
                      onClick={action.onClick}
                      color={action.color}
                    >
                      {action.label}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            </td>
          )}
        </>
      )}
    </tr>
  );
}
