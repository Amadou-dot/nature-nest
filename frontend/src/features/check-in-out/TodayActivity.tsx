import { Box, Loader, Text } from '@mantine/core';
import { useTodayActivity } from '../../hooks/useTodayActivity';
import TodayItem from '../dashboard/TodayItem';

export default function TodayActivity() {
  const { activities, isPending } = useTodayActivity();
  return (
    <Box className='flex flex-col rounded-lg bg-grey-200 p-8 dark:bg-dark-grey-100/40'>
      <Text className='font-semibold'>Today's activity</Text>
      {isPending && <Loader />}
      {((!isPending && !activities) ||
        (!isPending && activities && activities.length === 0)) && (
        <Text className='text-center'>No activity today...</Text>
      )}
      <Box className='mt-4 grid grid-cols-1 gap-4 divide-y divide-grey-300 dark:divide-dark-grey-300'>
        {activities &&
          activities.length > 0 &&
          activities.map((activity) => (
            <TodayItem activity={activity} key={activity.id} />
          ))}
      </Box>
    </Box>
  );
}
