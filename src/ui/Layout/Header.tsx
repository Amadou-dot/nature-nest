export default function Header({ className }: { className: string }) {
  return (
    <header
      className={`${className} bg-grey-100 dark:bg-dark-grey-50 border-grey-200 dark:border-dark-grey-100 justify-between border-b p-4 text-center md:flex md:text-left`}
    >
      <h2 className='text-lg'>Header</h2>
      {/* <DarkModeToggle /> */}
    </header>
  );
}
