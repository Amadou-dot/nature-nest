export default function PageHeading({ text }: { text: string }) {
  return (
    <h1 className='text-center text-grey-800 dark:text-dark-grey-700 md:text-left md:text-2xl lg:text-3xl'>
      {text}
    </h1>
  );
}
