import {
  Button,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { HiOutlineMoon } from 'react-icons/hi2';

export default function DarkModeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark');
  const toggleDarkMode = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
    if (computedColorScheme === 'dark') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <Button onClick={toggleDarkMode} variant='transparent'>
      <HiOutlineMoon className='h-6 w-8 hover:cursor-pointer' />
    </Button>
  );
}
