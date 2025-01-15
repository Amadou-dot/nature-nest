import { Box, NumberFormatter, Text } from '@mantine/core';
import { BookingProp } from '../../types/database.types';

export default function PayBreakdown({ booking }: BookingProp) {
  const { totalPrice, extrasPrice, isPaid, cabinPrice } = booking;
  return (
    <Box
      className={`mt-5 flex items-center justify-between rounded-lg p-5 ${isPaid ? 'bg-green-300' : 'bg-yellow-300'}`}
    >
      <Text className=''>
        {`Total price: `}
        {
          <NumberFormatter
            prefix='$'
            value={totalPrice ?? NaN}
            thousandSeparator
          />
        }{' '}
        (
        {
          <NumberFormatter
            value={cabinPrice ?? NaN}
            prefix='$'
            thousandSeparator
          />
        }{' '}
        cabin + <NumberFormatter prefix='$' value={extrasPrice ?? NaN} />{' '}
        breakfast)
      </Text>
      <Text className='text-sm uppercase'>
        {isPaid ? 'Paid' : 'Will pay at property'}
      </Text>
    </Box>
  );
}
