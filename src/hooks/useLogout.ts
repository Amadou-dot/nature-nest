import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAPI } from '../services/apiAuth';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryCLient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      notifications.show({
        title: 'Logged out',
        message: 'You have been logged out',
        color: 'blue',
      });
      queryCLient.clear();
      navigate('/login', { replace: true });
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });
  return { logout, isPending };
};
