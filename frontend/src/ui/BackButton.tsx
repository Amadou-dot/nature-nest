import { Button, useComputedColorScheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();
  const computedColorScheme = useComputedColorScheme();
  const computedVariant =
    computedColorScheme === 'dark' ? 'filled' : 'transparent';
  return (
    <Button variant={computedVariant} onClick={() => navigate(-1)}>
      &#x2190; Back
    </Button>
  );
}
