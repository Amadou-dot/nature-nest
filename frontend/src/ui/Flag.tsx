import { Image } from '@mantine/core';

export default function Flag({
  countryFlag,
  alt,
}: {
  countryFlag: string;
  alt: string;
}) {
  return <Image src={countryFlag} alt={alt} className='h-6 w-6' />;
}
