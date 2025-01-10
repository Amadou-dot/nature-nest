import { Tabs } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
export default function TabsFilter({tabs, param}: {tabs:{label: string, value: string}[], param: string}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleFilterChange = (value: string | null) => {
    searchParams.set(param, value || 'all');
    setSearchParams(searchParams);
  };
  return (
    <Tabs
      defaultValue='all'
      value={searchParams.get(param) || 'all'}
      onChange={handleFilterChange}
      className='bg-gray-100'>
      <Tabs.List grow justify='space-between'>
        {tabs.map(tab => (
          <Tabs.Tab color='#4338ca' value={tab.value} key={tab.value}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
