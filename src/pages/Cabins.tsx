import CabinTable from '../features/cabins/CabinTable';
import CabinTableOperations from '../ui/CabinTableOperations';

export default function Cabins() {
  return (
    <div className='max-w-[1400px] mx-auto px-4 md:px-0'>
      <div className='flex justify-between items-center mb-5 flex-col md:flex-row gap-5'>
        <h1 className='text-lg text-center md:text-left md:text-3xl hidden md:block'>
          All Cabins
        </h1>
        <CabinTableOperations />
      </div>
      <CabinTable />
      <div className='flex justify-end mt-5'></div>
    </div>
  );
}
