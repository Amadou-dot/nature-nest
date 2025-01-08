import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';
import AppLayout from './ui/Layout/AppLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60, // Garbage collection every hour
    },
  },
});
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to='/dashboard' />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/bookings' element={<Bookings />} />
              <Route path='/cabins' element={<Cabins />} />
              <Route path='/users' element={<Users />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='*' element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
