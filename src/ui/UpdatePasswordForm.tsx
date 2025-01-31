import { Box, Button, PasswordInput, Text } from '@mantine/core';
import { useForm } from '@tanstack/react-form';
import { updatePasswordSchema } from '../helpers/validators';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { PasswordField } from './PasswordField';

export default function UpdatePasswordForm() {
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: ({ value }) => {
      //TODO: compare current password with the one in the database
      updateUser({ password: value.newPassword });
    },
    validators: { onSubmit: updatePasswordSchema },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      onReset={() => reset()}
      className='flex flex-col gap-4 rounded-lg p-4 shadow-lg dark:bg-dark-grey-100/80'
    >
      <Text className='text-xl font-bold'>Update password</Text>
      <Box className='flex flex-col gap-4'>
        <Field
          name='currentPassword'
          children={(field) => (
            <PasswordInput
              label='Current Password'
              aria-label='Current Password'
              value={field.state.value}
              onChange={({ target: { value } }) => field.handleChange(value)}
              error={field.state.meta.errors[0]}
              disabled={isPending}
            />
          )}
        />
        <Field
          name='newPassword'
          children={(field) => (
            <PasswordField
              label='New Password'
              aria-label='New Password'
              value={field.state.value}
              onChange={({ target: { value } }) => field.handleChange(value)}
              error={field.state.meta.errors[0]}
              disabled={isPending}
            />
          )}
        />
        <Field
          name='confirmPassword'
          children={(field) => (
            <PasswordField
              label='Confirm Password'
              aria-label='Confirm Password'
              value={field.state.value}
              onChange={({ target: { value } }) => field.handleChange(value)}
              error={field.state.meta.errors[0]}
              disabled={isPending}
            />
          )}
        />
        <Subscribe>
          {(fields) => (
            <Box className='flex justify-center gap-4 md:justify-end'>
              <Button
                type='submit'
                disabled={!fields.canSubmit || isPending || fields.isSubmitting}
                children='Update password'
                loading={isPending || fields.isSubmitting}
              />
            </Box>
          )}
        </Subscribe>
      </Box>
    </form>
  );
}
