import { Box, Text } from '@mantine/core';

export default function PageNotFound() {
  return (
    <Box className='text-grey-800 dark:text-dark-grey-500 flex h-screen flex-col justify-around px-10'>
      <Text className='text-7xl font-semibold' component='h1'>
        /not
      </Text>
      <Text className='text-right text-7xl font-semibold' component='h1'>
        found
      </Text>
      <Box>
        <Text className='ml-24 text-lg'>This page does not exist</Text>
        <Text className='text-lg'>Or does it? It does not!</Text>
      </Box>
    </Box>
  );
}
