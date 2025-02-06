import { DonutChart } from '@mantine/charts';
import { Box, Text, useMantineColorScheme } from '@mantine/core';
import { subDays } from 'date-fns';
import { StayAfterDate } from '../../types/bookings.types';
interface DurationChartProps {
  confirmedStays: StayAfterDate[] | undefined;
}
interface DurationData {
  name: string;
  value: number;
  color: string;
}

export default function DurationChart({ confirmedStays }: DurationChartProps) {
  if (!confirmedStays) return null;
  const {colorScheme} = useMantineColorScheme()
  const isDarkMode = colorScheme === 'dark';
  const data: DurationData[] = [
    { name: '1 night', value: 0, color: `${isDarkMode ? '#b91c1c': '#ef4444'}` },
    { name: '2-3 nights', value: 0, color: `${isDarkMode ? '#c2410c' : '#f97316'}` },
    { name: '4-5 nights', value: 0, color: `${isDarkMode ? '#a16207': '#eab308'}` },
    { name: '6-7 nights', value: 0, color: `${isDarkMode ? '#4d7c0f': '#84cc16'}` },
    { name: '8+ nights', value: 0, color: `${isDarkMode ? '#15803d': '#22c55e'}` },
  ];

  confirmedStays.forEach((stay) => {
    const duration = subDays(
      new Date(stay.endDate),
      new Date(stay.startDate).getDate(),
    ).getDate();
    // 1 night
    if (duration === 1) {
      const oneNight = data.find((item) => item.name === '1 night');
      if (oneNight) oneNight.value += 1;
      // 2-3 nights
    } else if (duration <= 3) {
      const twoThreeNights = data.find((item) => item.name === '2-3 nights');
      if (twoThreeNights) twoThreeNights.value += 1;
      // 4-5 nights
    } else if (duration <= 5) {
      const fourFiveNights = data.find((item) => item.name === '4-5 nights');
      if (fourFiveNights) fourFiveNights.value += 1;
      // 6-7 nights
    } else if (duration <= 7) {
      const sixSevenNights = data.find((item) => item.name === '6-7 nights');
      if (sixSevenNights) sixSevenNights.value += 1;
      // 8+ nights
    } else {
      const eightPlusNights = data.find((item) => item.name === '8+ nights');
      if (eightPlusNights) eightPlusNights.value += 1;
    }
  },[{}]);
  return (
    <Box className={`flex lg:flex-col lg:items-center 2xl:flex-row rounded-lg bg-grey-200 p-8 dark:bg-dark-grey-100/40`}>
      <DonutChart
        data={data}
        withTooltip
        tooltipDataSource='segment'
        mx='auto'
        chartLabel={'Duration'}
        paddingAngle={3}
        h={300}
      />
      <Box className='flex flex-col justify-center space-y-2'>
        {data.map((item) => (
          <Text c={item.color} key={item.name}>
            {item.name}
          </Text>
        ))}
      </Box>
    </Box>
  );
}
