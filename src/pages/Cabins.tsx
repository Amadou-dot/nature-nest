import CabinTable from '../features/cabins/CabinTable';
import SortBy from '../ui/SortBy';
import TabsFilter from '../ui/TabsFilter';

export default function Cabins() {
  const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Discounts', value: 'discounts' },
    { label: 'No Discounts', value: 'no_discounts' },
  ];
  const sortOptions = [
    { label: 'Sort by name (A-Z)', value: 'name-asc' },
    { label: 'Sort by name (Z-A)', value: 'name-desc' },
    { label: 'Sort by Price (Low to High)', value: 'regularPrice-asc' },
    { label: 'Sort by Price (High to Low)', value: 'regularPrice-desc' },
    { label: 'Sort by Capacity (High to Low)', value: 'maxCapacity-asc' },
    { label: 'Sort by Capacity (Low to High)', value: 'maxCapacity-desc' },
  ];
  return (
    <div className='max-w-[1400px] mx-auto px-4 md:px-0'>
      <div className='flex justify-between items-center mb-5 flex-col md:flex-row gap-5'>
        <h1 className='text-lg text-center md:text-left md:text-3xl hidden md:block'>
          All Cabins
        </h1>
        <TabsFilter tabs={tabs} />
        <SortBy options={sortOptions} />
      </div>
      <CabinTable />
      <div className='flex justify-end mt-5'></div>
    </div>
  );
}
