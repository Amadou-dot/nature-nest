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
      styles={{
        input: {
          '&:focus': {
            borderColor: '#4338ca',
            boxShadow: '0 0 0 1px #4338ca',
          },
        },
        dropdown: {
          borderColor: '#4338ca',
        },
      }}
      classNames={{
        input:
          'border border-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-700 focus:border-none',
      }}
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
