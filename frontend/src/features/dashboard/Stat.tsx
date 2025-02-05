import { Box, Paper, Text } from '@mantine/core';
import { createElement } from 'react';
import { IconType } from 'react-icons/lib';
interface StatProps {
  icon: IconType;
  title: string;
  value: number | string;
  color?: string;
}
export default function Stat({ icon, title, value, color }: StatProps) {
  return (
    <Paper shadow='md'
      className='bg-white transition-color flex w-40 items-center space-x-4 bg-grey-200 p-4 duration-300 dark:bg-dark-grey-100 md:w-auto'
      radius='md'
    >
      <Box className='w-fit'>{createElement(icon, { size: 26, color })}</Box>
      <Box className='flex flex-col'>
        <Text className='text-sm uppercase tracking-widest text-grey-800 dark:text-dark-grey-700'>
          {title}
        </Text>
        <Text className='text-lg font-bold'>{value}</Text>
      </Box>
    </Paper>
  );
}
