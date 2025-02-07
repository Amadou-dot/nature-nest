import { Box } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';

export default function AppLayout() {
  return (
    <ProtectedRoute>
      <Box className='relative h-dvh w-dvw overflow-hidden bg-grey-50 dark:bg-dark-grey-50 md:grid md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr]'>
        <Sidebar />
        <Header />
        <Main>
          <Outlet />
        </Main>
      </Box>
    </ProtectedRoute>
  );
}
