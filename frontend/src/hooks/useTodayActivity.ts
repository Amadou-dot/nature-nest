import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../services/apiBookings';

export const useTodayActivity = () => {
  const { data, isPending } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activity'],
  });

  return { activities: data, isPending };
};
