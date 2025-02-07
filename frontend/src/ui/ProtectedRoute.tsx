import React from 'react';
import { useUser } from '../hooks/useUser';
import { Box, LoadingOverlay } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  // logic to check if user is authenticated
  const { isPending, isAuthenticated } = useUser();
  if (isPending) return <LoadingOverlay visible />;
  // if not, redirect to login page
  if (!isAuthenticated && !isPending) navigate('/login');
  // if authenticated, render children
  if (isAuthenticated) return <Box>{children}</Box>;
  return null;
}
