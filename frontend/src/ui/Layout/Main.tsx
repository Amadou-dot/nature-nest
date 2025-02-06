export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={`mx-auto h-full w-full overflow-auto border-grey-200 bg-grey-100 p-4 dark:border-dark-grey-100 dark:bg-dark-grey-50 md:col-start-2 md:row-start-2`}
    >
      {children}
    </main>
  );
}
