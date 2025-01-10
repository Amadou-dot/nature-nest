import { BookingsData } from '../../types/bookings.types';
import { RowProps } from '../../types/table.types';
import ContextMenu from '../../ui/ContextMenu';
import Row from '../../ui/Row';


export default function BookingRow(props: RowProps<BookingsData>) {
  return props.rowType === 'header' ? (
    <Row<BookingsData> {...props} />
  ) : (
    <Row<BookingsData>
      {...props}
      contextMenu={<ContextMenu cabinId={Number(props.data[0].row.id)} />}
    />
  );
}
