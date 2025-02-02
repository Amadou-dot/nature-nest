export default function PageHeading({ text }: { text: string }) {
  return (
    <h1 className='text-grey-800 dark:text-dark-grey-700 text-center md:text-left md:text-2xl lg:text-3xl'>
      {text}
    </h1>
  );
}
