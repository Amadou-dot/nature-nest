import { Select } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';

export default function SortBy({
  options,
}: {
  options: { label: string; value: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const handleChange = (value: string | null) => {
    searchParams.set('sortBy', value || '');
    setSearchParams(searchParams);
  };
  return (
    <Select
      searchable
      aria-label='Sort'
      placeholder='Sort value'
      data={options}
      onChange={handleChange}
      allowDeselect={false}
      value={sortBy}
      defaultValue={sortBy}
    />
  );
}
