import SortBy from './SortBy';
import TabsFilter from './TabsFilter';
const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Checked Out', value: 'checked-out' },
  { label: 'Checked In', value: 'checked-in' },
  { label: 'Unconfirmed', value: 'unconfirmed' },
];
const options = [
  { label: 'Sort by most recent', value: 'startDate-desc' },
  { label: 'Sort by oldest', value: 'startDate-asc' },
  { label: 'Sort by Price (High to Low)', value: 'totalPrice-desc' },
  { label: 'Sort by Price (Low to High)', value: 'totalPrice-asc' },
];
export default function BookingTableOperations() {
  return (
    <>
      <TabsFilter tabs={tabs} param='status' />
      <SortBy options={options} />
    </>
  );
}
