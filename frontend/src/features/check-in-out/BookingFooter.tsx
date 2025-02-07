import { Text } from '@mantine/core';
import { formatDate } from '../../helpers/utilFunctions';
export default function BookingFooter({ created_at }: { created_at: string }) {
  return (
    <Text className='text-slate-700 text-right text-sm'>
      Booked {formatDate(created_at, true)}
    </Text>
  );
}
