import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../services/apiSettings';

export const useSettings = () => {
  return useQuery({ queryKey: ['settings'], queryFn: getSettings });
};
