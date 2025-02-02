import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../services/apiCabins';

export const useCabins = () => {
  return useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });
};
