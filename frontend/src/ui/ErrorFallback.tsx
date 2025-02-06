import { Button } from "@mantine/core";

export default function ErrorFallback({  onReset }: { onReset: () => void }) {
  return (
    <div>
      <p>Something went wrong</p>
      <Button onClick={onReset}>Try again!</Button>
    </div>
  );
}
