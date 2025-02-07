import { LoadingOverlay, useComputedColorScheme } from '@mantine/core';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AppLayout from './ui/Layout/AppLayout';
import Account from './pages/Account';

const Bookings = lazy(() => import('./pages/Bookings'));
const Cabins = lazy(() => import('./pages/Cabins'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Settings = lazy(() => import('./pages/Settings'));
const Users = lazy(() => import('./pages/Users'));
const BookingDetails = lazy(() => import('./pages/BookingDetails'));
const CheckIn = lazy(() => import('./pages/CheckIn'));

export default function App() {
  const colorScheme = useComputedColorScheme();
  if (colorScheme === 'dark') document.documentElement.classList.add('dark');
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOverlay visible />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/bookings' element={<Bookings />} />
            <Route path='/bookings/:bookingId' element={<BookingDetails />} />
            <Route path='/check-in/:bookingId' element={<CheckIn />} />
            <Route path='/cabins' element={<Cabins />} />
            <Route path='/users' element={<Users />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/account' element={<Account />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
