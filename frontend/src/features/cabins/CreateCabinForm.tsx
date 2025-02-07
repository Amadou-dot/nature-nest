import { Button, FileInput, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@tanstack/react-form';
import { cabinSchema } from '../../helpers/validators';
import { useCreateCabin } from '../../hooks/useCreateCabin';

export default function CreateCabinForm() {
  const { isCreating, createCabinMutation, createError } = useCreateCabin();
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      maxCapacity: 1,
      regularPrice: 0,
      discount: 0,
      description: '',
      image: null as File | null,
    },
    onSubmit: async ({ value: cabinData }) => {
      const dataToSubmit = {
        ...cabinData,
        discount: cabinData.discount ?? null,
      };
      createCabinMutation(dataToSubmit);
    },
    validators: {
      onSubmit: cabinSchema,
    },
  });

  if (createError) {
    return notifications.show({
      message:
        createError.message ||
        'Action could not be completed. Please try again',
      color: 'red',
      autoClose: false,
    });
  }

  return (
    <form
      className='mx-auto flex flex-col items-center gap-3 p-5 *:w-full md:*:w-10/12'
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Field name='name'>
        {(field) => (
          <TextInput
            label='Name'
            id={field.name}
            name={field.name}
            value={field.state.value || ''}
            type='text'
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors[0]}
            disabled={isCreating}
            onBlur={field.handleBlur}
          />
        )}
      </Field>
      <Field name='maxCapacity'>
        {(field) => (
          <TextInput
            label='Max capacity'
            value={field.state.value || 0}
            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
            onBlur={field.handleBlur}
            placeholder='Max capacity'
            type='number'
            error={field.state.meta.errors[0]}
            disabled={isCreating}
          />
        )}
      </Field>
      <Field name='regularPrice'>
        {(field) => (
          <TextInput
            label='Regular price'
            value={field.state.value || 0}
            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
            onBlur={field.handleBlur}
            placeholder='Regular price'
            type='number'
            error={field.state.meta.errors[0]}
            disabled={isCreating}
          />
        )}
      </Field>
      <Field name='discount'>
        {(field) => (
          <TextInput
            label='Discount'
            value={field.state.value || 0}
            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
            onBlur={field.handleBlur}
            placeholder='Discount'
            type='number'
            error={field.state.meta.errors[0]}
            disabled={isCreating}
          />
        )}
      </Field>
      <Field name='description'>
        {(field) => (
          <Textarea
            label='Description'
            value={field.state.value || ''}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder='Cabin description'
            error={field.state.meta.errors[0]}
            disabled={isCreating}
          />
        )}
      </Field>
      <Field name='image'>
        {(field) => (
          <FileInput
            label='Upload an image'
            accept='image/*'
            onChange={field.handleChange}
            placeholder='Upload an image'
            error={field.state.meta.errors[0]}
            disabled={isCreating}
            withAsterisk
          />
        )}
      </Field>
      <Button
        variant='filled'
        type='submit'
        disabled={isCreating}
        loading={isCreating}
      >
        Submit
      </Button>
    </form>
  );
}
