import { Box, Text } from '@mantine/core';
import BackButton from '../../ui/BackButton';

export default function PageHeading({ text }: { text: string }) {
  return (
    <Box className='flex items-center justify-between'>
      <Text component='h1' className='text-slate-700 text-2xl font-bold'>
        {text}
      </Text>
      <BackButton />
    </Box>
  );
}
