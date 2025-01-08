import CabinTable from '../features/cabins/CabinTable';

export default function Cabins() {
  return (
    <>
      <div className='flex justify-between items-center max-w-[1400px] mx-auto px-4 md:px-0'>
        <h1 className='mb-5 text-lg text-center md:text-left md:text-3xl'>
          All Cabins
        </h1>
        Filter
      </div>
      <CabinTable />
    </>
  );
}
