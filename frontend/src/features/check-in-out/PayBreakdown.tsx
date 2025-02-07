import { Box, NumberFormatter, Text } from '@mantine/core';
import { BookingProp } from '../../types/database.types';

export default function PayBreakdown({ booking }: BookingProp) {
  const { totalPrice, extrasPrice, isPaid, cabinPrice } = booking;
  return (
    <Box
      className={`mt-5 flex flex-col items-center gap-2 rounded-lg p-5 md:flex-row md:justify-between md:gap-0 ${isPaid ? 'bg-green-700 dark:bg-dark-green-100' : 'bg-yellow-700 dark:bg-dark-yellow-100'}`}
    >
      <Text className='text-sm font-semibold text-grey-200 dark:text-dark-grey-700 md:text-base md:font-normal'>
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
      <Text className='text-sm uppercase text-grey-200 dark:text-dark-grey-700'>
        {isPaid ? 'Paid' : 'Will pay at property'}
      </Text>
    </Box>
  );
}
