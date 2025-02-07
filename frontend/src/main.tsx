import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';

import App from './App.tsx';
import ErrorFallback from './ui/ErrorFallback.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { customTheme } from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={() => (
        <ErrorFallback onReset={() => window.location.replace('/')} />
      )}
    >
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={{ ...customTheme }} defaultColorScheme='auto'>
          <Notifications position='top-center' />
          <ModalsProvider>
            <App />
          </ModalsProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </MantineProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
