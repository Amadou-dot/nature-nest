export default function Main({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`${className} bg-grey-100 dark:bg-dark-grey-50 border-grey-200 dark:border-dark-grey-100 h-full w-full overflow-auto p-4`}
    >
      {children}
    </main>
  );
}
