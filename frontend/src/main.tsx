import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';

import App from './App.tsx';
import ErrorFallback from './ui/ErrorFallback.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={() => (
        <ErrorFallback onReset={() => window.location.replace('/')} />
      )}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
