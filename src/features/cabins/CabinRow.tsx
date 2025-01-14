import Row from '../../ui/Row';
import ContextMenu from '../../ui/ContextMenu';
import { RowProps } from '../../types/table.types';
import { Database } from '../../types/database.types';

type Cabin = Database['public']['Tables']['cabins']['Row'];

export default function CabinRow(props: RowProps<Cabin>) {
  return props.rowType === 'header' ? (
    <Row<Cabin> {...props} />
  ) : (
    <Row<Cabin>
      {...props}
      contextMenu={<ContextMenu itemId={Number(props.data[0].row.id)} />}
    />
  );
}
