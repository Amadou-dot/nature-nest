import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../helpers/constants';

export default function BackButton({
  variant = 'transparent',
}: {
  variant?: 'transparent' | 'filled';
}) {
  const navigate = useNavigate();
  return (
    <Button
      color={COLORS.primary}
      variant={variant}
      onClick={() => navigate(-1)}
    >
      &#x2190; Back
    </Button>
  );
}
