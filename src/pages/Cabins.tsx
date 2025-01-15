import { Box, Text } from '@mantine/core';
import CabinTable from '../features/cabins/CabinTable';
import CabinTableOperations from '../ui/CabinTableOperations';

export default function Cabins() {
  return (
    <Box className='max-w-[1400px] mx-auto px-4 md:px-0'>
      <Box className='flex justify-between items-center mb-5 flex-col md:flex-row gap-5'>
        <Text component='h1' className='text-lg text-center md:text-left md:text-3xl hidden md:block'>
          All Cabins
        </Text>
        <CabinTableOperations />
      </Box>
      <CabinTable />
    </Box>
  );
}
