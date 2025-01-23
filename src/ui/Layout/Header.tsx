import Logout from '../Logout';

export default function Header({ className }: { className: string }) {
  return (
    <header
      className={`${className} justify-between border-b border-grey-200 bg-grey-100 p-4 text-center dark:border-dark-grey-100 dark:bg-dark-grey-50 md:flex md:text-left`}
    >
      <h2 className='text-lg'>Header</h2>
      {/* <DarkModeToggle /> */}
      <Logout />
    </header>
  );
}
