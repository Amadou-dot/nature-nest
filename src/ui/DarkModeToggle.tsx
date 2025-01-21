import {
  Button,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';

export default function DarkModeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
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
    <Button onClick={toggleDarkMode}>
      {colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
}
