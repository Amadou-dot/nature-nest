import { Box, Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { HiExclamationCircle } from 'react-icons/hi2';
import {
    validateEmail,
    validatePassword,
    validateUserName,
} from '../helpers/validators';

export default function SignUp() {
  const [confirmError, setConfirmError] = useState(false);
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirm: '',
    },
    onSubmit: async ({ value }) => {
      // confirm passwords match
      if (value.password !== value.confirm) {
        setConfirmError(true);
        return;
      }
      console.log(value);
    },
  });
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
          validators={{ onSubmit: ({ value }) => validateUserName(value) }}
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
          validators={{ onSubmit: ({ value }) => validateEmail(value) }}
          children={(field) => (
            <TextInput
              aria-label='Email'
              label='Email'
              placeholder='email@example.com'
              autoComplete='email'
              type='email'
              value={field.state.value}
              onChange={({ target: { value } }) => field.handleChange(value)}
              error={field.state.meta.errors[0]}
            />
          )}
        />
        <Field
          name='password'
          validators={{ onSubmit: ({ value }) => validatePassword(value) }}
          children={(field) => (
            <PasswordInput
              aria-label='Password'
              label='Password'
              description='8 characters minimum'
              placeholder='Enter password'
              autoComplete='new-password'
              type='password'
              withErrorStyles={false}
              rightSectionPointerEvents='none'
              rightSection={
                field.state.meta.errors[0] && (
                  <HiExclamationCircle
                    size={20}
                    color='var(--mantine-color-error)'
                  />
                )
              }
              value={field.state.value}
              onChange={({ target: { value } }) => {
                setConfirmError(false);
                field.handleChange(value);
              }}
              error={
                (confirmError && 'Passwords must match') ||
                field.state.meta.errors[0]
              }
            />
          )}
        />
        <Field
          name='confirm'
          validators={{ onSubmit: ({ value }) => validatePassword(value) }}
          children={(field) => (
            <PasswordInput
              aria-label='Repeat Password'
              label='Repeat Password'
              placeholder='Repeat password'
              autoComplete='new-password'
              type='password'
              value={field.state.value}
              onChange={({ target: { value } }) => {
                setConfirmError(false);
                field.handleChange(value);
              }}
              error={
                (confirmError && 'Passwords must match') ||
                field.state.meta.errors[0]
              }
            />
          )}
        />

        <Button type='submit'>Create new user</Button>
      </Box>
    </form>
  );
}
