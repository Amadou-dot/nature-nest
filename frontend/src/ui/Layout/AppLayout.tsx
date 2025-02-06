import { Box, useComputedColorScheme } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';

export default function AppLayout() {
  const computedColorScheme = useComputedColorScheme();
  if (computedColorScheme === 'dark')
    document.documentElement.classList.add('dark');

  return (
    <ProtectedRoute>
      <Box className='relative h-dvh w-dvw overflow-hidden bg-grey-50 dark:bg-dark-grey-50 md:grid md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr]'>
        <Sidebar className='absolute md:relative md:row-span-2' />
        <Header className='md:col-start-2' />
        <Main className={`mx-auto overflow-auto md:col-start-2 md:row-start-2`}>
          <Outlet />
        </Main>
      </Box>
    </ProtectedRoute>
  );
}
