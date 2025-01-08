import { Outlet } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';

export default function AppLayout() {
  return (
    <div className='relative md:grid md:grid-rows-[auto_1fr] md:grid-cols-[auto_1fr] h-screen w-screen'>
      <Sidebar className='md:row-span-2 absolute md:relative' />
      <Header className='md:col-start-2' />
      <Main className='md:col-start-2 md:row-start-2'>
        <Outlet />
      </Main>
    </div>
  );
}
