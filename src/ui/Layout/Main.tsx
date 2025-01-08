export default function Main({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={`${className} w-full h-full overflow-auto`}>
      {children}
    </main>
  );
}
