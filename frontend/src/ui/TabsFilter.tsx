import { Tabs } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { COLORS } from '../helpers/constants';
export default function TabsFilter({
  tabs,
  param,
}: {
  tabs: { label: string; value: string }[];
  param: string;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleFilterChange = (value: string | null) => {
    searchParams.set(param, value || 'all');
    setSearchParams(searchParams);
  };
  return (
    <Tabs
      className='w-full lg:w-1/2'
      defaultValue='all'
      value={searchParams.get(param) || 'all'}
      onChange={handleFilterChange}
    >
      <Tabs.List grow justify='space-between'>
        {tabs.map((tab) => (
          <Tabs.Tab color={COLORS.primary} value={tab.value} key={tab.value}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
