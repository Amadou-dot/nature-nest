import { Box, useComputedColorScheme } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';

export default function AppLayout() {
  const computedColorScheme = useComputedColorScheme();
  if (computedColorScheme === 'dark')
    document.documentElement.classList.add('dark');

  return (
    <Box className='dark:bg-dark-grey-50 bg-grey-50 relative h-screen w-screen overflow-hidden md:grid md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr]'>
      <Sidebar className='absolute md:relative md:row-span-2' />
      <Header className='md:col-start-2' />
      <Main className={`mx-auto overflow-auto md:col-start-2 md:row-start-2`}>
        <Outlet />
      </Main>
    </Box>
  );
}
