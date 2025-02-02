import {
  Box,
  Button,
  Image,
  PasswordInput,
  Text,
  TextInput,
  useComputedColorScheme,
} from '@mantine/core';
import { useForm } from '@tanstack/react-form';
import logoDark from '../assets/logo-dark.png';
import logoLight from '../assets/logo-light.png';
import { emailSchema, loginPasswordSchema } from '../helpers/validators';
import { useLogin } from '../hooks/useLogin';

export default function LoginForm() {
  const computedColorScheme = useComputedColorScheme();
  const { mutate: login, isPending } = useLogin();
  const logo = computedColorScheme === 'dark' ? logoDark : logoLight;
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      email: 'yzel@gmail.com',
      password: '12345678Aa#',
    },
    onSubmit: async ({ value: credentials }) => {
      if (!credentials.email || !credentials.password) return;
      login(credentials);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className='mx-auto flex h-dvh max-w-[500px] flex-col items-center justify-center'
    >
      <Box className='flex w-full flex-col items-center justify-center gap-4 *:w-10/12'>
        <Box className='flex flex-col items-center justify-center gap-4'>
          <Image src={logo} alt='logo' w={120} />
          <Text component='h3' className='text-center text-xl font-bold'>
            Log in to your admin account
          </Text>
        </Box>
        <Field
          name='email'
          validators={{ onSubmit: emailSchema }}
          children={(field) => (
            <TextInput
              aria-label='Email'
              label='Email'
              type='email'
              placeholder='your@email.com'
              value={field.state.value}
              onChange={({ target: { value } }) => field.handleChange(value)}
              error={field.state.meta.errors[0]}
              autoComplete='email'
              disabled={isPending}
            />
          )}
        />
        <Field
          name='password'
          validators={{ onSubmit: loginPasswordSchema }}
          children={(field) => (
            <PasswordInput
              aria-label='Password'
              label='Password'
              type='password'
              value={field.state.value}
              onChange={({ target: { value } }) => field.handleChange(value)}
              error={field.state.meta.errors[0]}
              autoComplete='current-password'
              disabled={isPending}
            />
          )}
        />
        <Button type='submit' disabled={isPending} loading={isPending}>
          Log in
        </Button>
      </Box>
    </form>
  );
}
