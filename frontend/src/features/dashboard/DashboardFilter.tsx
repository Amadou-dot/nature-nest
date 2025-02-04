import TabsFilter from '../../ui/TabsFilter';

export default function DashboardFilter() {
  const tabs = [
    { label: 'Last 7 days', value: '7' },
    { label: 'Last 30 days', value: '30' },
    { label: 'Last 90 days', value: '90' },
  ];
  return <TabsFilter tabs={tabs} param='last' />;
}
