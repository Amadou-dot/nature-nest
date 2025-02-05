import { LineChart } from '@mantine/charts';
import { Box, Text, useMantineColorScheme } from '@mantine/core';
import { eachDayOfInterval, formatDate, isSameDay, subDays } from 'date-fns';
import { BookingAfterDate } from '../../types/bookings.types';
import { ChartTooltip } from '../../ui/ChartToolTip';
interface SalesChartProps {
  bookings: BookingAfterDate[] | [];
  numDays: number;
}

export default function SalesChart({ bookings, numDays }: SalesChartProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const series = [
    { name: 'totalSales', color: isDarkMode ? 'indigo.2' : 'indigo.6' },
    { name: 'extraSales', color: isDarkMode ? '#22c55e' : '#16a34a' },
  ];
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays),
    end: new Date(),
  });
  const data = allDates.map((date) => {
    return {
      date: formatDate(date, 'MMM dd'),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, booking) => acc + booking.totalPrice, 0),
      extraSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, booking) => acc + booking.extrasPrice, 0),
    };
  });

  return (
    <Box>
      <Text component='h2' className='text-lg font-semibold'>
        Sales from {formatDate(subDays(new Date(), numDays), 'MMM dd yyyy')}{' '}
        &mdash; {formatDate(new Date(), 'MMM dd yyyy')}
      </Text>
      <LineChart
        h={350}
        // connectNulls={false}
        data={data}
        dataKey='date'
        series={series}
        curveType='monotone'
        tickLine='x'
        withLegend
        xAxisLabel='Date'
        yAxisLabel='Sales'
        valueFormatter={(value) => `$${value}`}
        tooltipAnimationDuration={100}
        tooltipProps={{
          content: ({ label, payload }) => (
            <ChartTooltip label={label} payload={payload} />
          ),
        }}
        // referenceLines={[{ y: 380, label: 'Average sales', color: '#16a34a' }]}
      />
    </Box>
  );
}
