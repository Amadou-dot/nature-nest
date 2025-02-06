import { Box } from '@mantine/core';
import CabinTable from '../features/cabins/CabinTable';
import CabinTableOperations from '../ui/CabinTableOperations';
import PageHeading from '../ui/PageHeading';

export default function Cabins() {
  return (
    <Box className={`mx-auto w-10/12 max-w-[1800px] px-4 md:px-0 mb-40 md:mb-20 lg:mb-0`}>
      <Box className='mb-5 flex flex-col items-center justify-between gap-5 lg:flex-row'>
        <PageHeading text='Cabins' />
        <CabinTableOperations />
      </Box>
      <CabinTable />
    </Box>
  );
}
