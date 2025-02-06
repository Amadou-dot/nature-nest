import { Box, Button, FileButton, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { updateUserSchema } from '../helpers/validators';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useUser } from '../hooks/useUser';
import { User } from '../types/user.types';

export default function UpdateUserDataForm() {
  const { mutate: updateUser, isPending } = useUpdateUser();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { user } = useUser();
  const { email, fullName } = (user as User).user_metadata;
  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      email: email,
      fullName: fullName,
      avatar: null as File | null,
    },
    onSubmit: async ({ value }) => {
      updateUser(value);
      setProfileImage(null);
    },
    validators: { onSubmit: updateUserSchema },
  });

  return (
    <form
      className='flex flex-col gap-4 rounded-lg border-grey-200 p-4 shadow-md dark:bg-dark-grey-100/80'
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      onReset={() => reset()}
    >
      <Text className='text-xl font-bold'>Update user data</Text>
      <Box className='flex flex-col gap-4'>
        <Field
          name='email'
          children={() => (
            <TextInput
              label='Email'
              aria-label='Email'
              disabled
              value={email}
            />
          )}
        />
        <Field
          name='fullName'
          children={(field) => (
            <TextInput
              label='Full Name'
              aria-label='Full Name'
              value={field.state.value}
              onChange={({ target: { value } }) => field.handleChange(value)}
              disabled={isPending}
              error={field.state.meta.errors[0]}
            />
          )}
        />
        <Field
          name='avatar'
          children={(field) => (
            <Box className='flex items-center gap-4'>
              <Group>
                <FileButton
                  aria-label='Full Name'
                  onChange={(file) => {
                    setProfileImage(file);
                    field.handleChange(file);
                  }}
                  accept='image/*'
                  children={(props) => <Button {...props}>Upload image</Button>}
                  disabled={isPending}
                />
              </Group>
              {profileImage && (
                <Text size='sm'>Chosen file: {profileImage.name}</Text>
              )}
              {!profileImage && <Text size='sm'>No chosen file</Text>}
            </Box>
          )}
        />
        <Subscribe>
          {(fields) => (
            <Box className='flex justify-center gap-4 md:justify-end'>
              <Button
                type='reset'
                w={100}
                disabled={!fields.canSubmit || isPending || fields.isSubmitting}
                children='Reset'
                loading={isPending || fields.isSubmitting}
                className='bg-dark-grey-300 hover:bg-dark-grey-400'
              />
              <Button
                type='submit'
                w={100}
                disabled={!fields.canSubmit || isPending || fields.isSubmitting}
                children='Update'
                loading={isPending || fields.isSubmitting}
              />
            </Box>
          )}
        </Subscribe>
      </Box>
    </form>
  );
}
