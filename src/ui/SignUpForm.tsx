import { Box, Button, LoadingOverlay, TextInput } from '@mantine/core';
import { useForm } from '@tanstack/react-form';
import { registerUserSchema } from '../helpers/validators';
import { useSignUp } from '../hooks/useSignUp';
import { PasswordField } from '../ui/PasswordField';

export default function SignUpForm() {
  const { mutate: signUp, isPending } = useSignUp();
  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => signUp(value),
    validators: {
      onSubmit: registerUserSchema,
    },
  });
  if (isPending) return <LoadingOverlay visible />;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Box className='flex w-full flex-col items-center justify-center gap-4 *:w-10/12'>
        <Field
          name='fullName'
          children={(field) => (
            <TextInput
              aria-label='Full name'
              label='Full name'
              placeholder='Full name'
              autoComplete='name'
              value={field.state.value}
              onChange={({ target: { value } }) => field.handleChange(value)}
              error={field.state.meta.errors[0]}
            />
          )}
        />
        <Field
          name='email'
          children={(field) => (
            <TextInput
              aria-label='Email'
              label='Email'
              placeholder='email@example.com'
              autoComplete='email'
              value={field.state.value}
              onChange={({ target: { value } }) => field.handleChange(value)}
              error={field.state.meta.errors[0]}
            />
          )}
        />
        <Field
          name='password'
          children={(field) => (
            <PasswordField
              aria-label='Password'
              label='Password'
              description
              placeholder='Enter password'
              autoComplete='new-password'
              type='password'
              value={field.state.value}
              onChange={({ target: { value } }) => field.handleChange(value)}
              error={field.state.meta.errors[0]}
            />
          )}
        />
        <Field
          name='confirmPassword'
          children={(field) => (
            <PasswordField
              aria-label='Repeat Password'
              label='Repeat Password'
              placeholder='Repeat password'
              autoComplete='new-password'
              type='password'
              value={field.state.value}
              onChange={({ target: { value } }) => field.handleChange(value)}
              error={field.state.meta.errors[0]}
            />
          )}
        />

        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type='submit' disabled={!canSubmit} loading={isSubmitting}>
              Create new user
            </Button>
          )}
        />
      </Box>
    </form>
  );
}
