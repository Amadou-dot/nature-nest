import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { signUpWithEmail } from '../services/apiAuth';

export const useSignUp = () => {
  return useMutation({
    mutationFn: ({
      fullName,
      email,
      password,
    }: {
      fullName: string;
      email: string;
      password: string;
    }) => signUpWithEmail({ fullName, email, password }),
    onSuccess: () =>
      notifications.show({
        title: 'Account Created',
        message: 'Your account has been successfully created',
      }),
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'There was an error creating your account. Try again later',
      });
    },
  });
};
