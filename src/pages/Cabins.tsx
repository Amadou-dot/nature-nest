import { Box } from '@mantine/core';
import CabinTable from '../features/cabins/CabinTable';
import { MAX_WIDTH } from '../helpers/constants';
import CabinTableOperations from '../ui/CabinTableOperations';
import PageHeading from '../ui/PageHeading';

export default function Cabins() {
  return (
    <Box className={`max-w-[${MAX_WIDTH}px] mx-auto px-4 md:px-0`}>
      <Box className='flex justify-between items-center mb-5 flex-col md:flex-row gap-5'>
        <PageHeading text='Cabins' />
        <CabinTableOperations />
      </Box>
      <CabinTable />
    </Box>
  );
}
