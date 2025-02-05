import { Box, Text } from '@mantine/core';
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
    <Box className='flex flex-col items-center'>
      <Box className='flex items-center gap-2'>
        {createElement(icon, { size: 26, color })}
        <Text className='text-center font-semibold dark:text-dark-grey-400'>
          {title}
        </Text>
      </Box>
      <Text className='text-center text-2xl font-bold'>{value}</Text>
    </Box>
  );
}
