import { LoadingOverlay, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { customTheme } from './theme';
import AppLayout from './ui/Layout/AppLayout';
import Login from './pages/Login';
import ProtectedRoute from './ui/ProtectedRoute';

const Bookings = lazy(() => import('./pages/Bookings'));
const Cabins = lazy(() => import('./pages/Cabins'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Settings = lazy(() => import('./pages/Settings'));
const Users = lazy(() => import('./pages/Users'));
const BookingDetails = lazy(() => import('./pages/BookingDetails'));
const CheckIn = lazy(() => import('./pages/CheckIn'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60, // Garbage collection every hour
    },
  },
});
// mantine-color-scheme-value
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={{ ...customTheme }} defaultColorScheme='auto'>
        <Notifications position='top-center' />
        <ModalsProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingOverlay visible />}>
              <Routes>
                <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                  <Route index element={<Navigate replace to='/dashboard' />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/bookings' element={<Bookings />} />
                  <Route
                    path='/bookings/:bookingId'
                    element={<BookingDetails />}
                  />
                  <Route path='/check-in/:bookingId' element={<CheckIn />} />
                  <Route path='/cabins' element={<Cabins />} />
                  <Route path='/users' element={<Users />} />
                  <Route path='/settings' element={<Settings />} />
                  <Route path='*' element={<PageNotFound />} />
                </Route>
                <Route path='/login' element={<Login />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
