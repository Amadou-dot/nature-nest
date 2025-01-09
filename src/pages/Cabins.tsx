import { Button } from '@mantine/core';
import CabinTable from '../features/cabins/CabinTable';

export default function Cabins() {
  return (
    <div className='max-w-[1400px] mx-auto px-4 md:px-0'>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='text-lg text-center md:text-left md:text-3xl'>
          All Cabins
        </h1>
        <Button variant="filled" color="#4338ca " size='md'>Filter</Button>
      </div>
      <CabinTable />
      <div className='flex justify-end mt-5'>
      </div>
    </div>
  );
}