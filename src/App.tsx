import { LoadingOverlay, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ContextMenuProvider } from 'mantine-contextmenu';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import AppLayout from './ui/Layout/AppLayout';
import BookingDetails from './pages/BookingDetails';

const Bookings = lazy(() => import('./pages/Bookings'));
const Cabins = lazy(() => import('./pages/Cabins'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Settings = lazy(() => import('./pages/Settings'));
const Users = lazy(() => import('./pages/Users'));

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
        <Notifications />
        <ModalProvider>
          <ContextMenuProvider>
            <BrowserRouter>
              <Suspense fallback={<LoadingOverlay visible />}>
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route
                      index
                      element={<Navigate replace to='/dashboard' />}
                    />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/bookings' element={<Bookings />} />
                    <Route path='/bookings/:bookingId' element={<BookingDetails />} />
                    <Route path='/cabins' element={<Cabins />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='*' element={<PageNotFound />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ContextMenuProvider>
        </ModalProvider>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
