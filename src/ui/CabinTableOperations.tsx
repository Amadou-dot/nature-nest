import SortBy from './SortBy';
import TabsFilter from './TabsFilter';

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
export default function CabinTableOperations() {
  return (
    <>
      <TabsFilter tabs={tabs} param='filter'/>
      <SortBy options={sortOptions} />
    </>
  );
}
