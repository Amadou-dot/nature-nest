import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
    onSuccess: (user) => {
      navigate('/dashboard');
      queryClient.setQueryData(['user'], user);
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        position: 'top-center',
        color: 'red',
        autoClose: 5000,
      });
    },
  });
};
