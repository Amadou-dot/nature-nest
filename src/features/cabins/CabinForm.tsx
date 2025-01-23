import { Button, FileInput, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@tanstack/react-form';
import { VALIDATION_MESSAGES } from '../../helpers/constants';
import {
  validateDiscount,
  validateMaxCapacity,
  validateName,
  validateRegularPrice,
} from '../../helpers/validators';
import { useCreateCabin } from '../../hooks/useCreateCabin';
import { useUpdateCabin } from '../../hooks/useUpdateCabin';
import { Cabin } from '../../types/database.types';

type CabinFormProps =
  | { mode: 'create' }
  | { mode: 'edit'; cabinData: Cabin; cabinId: number };

export default function CabinForm(props: CabinFormProps) {
  
  const {isUpdating, updateCabinMutation, updateError} = useUpdateCabin();
  const {isCreating, createCabinMutation, createError} = useCreateCabin();
  const isEditMode = props.mode === 'edit';
  const isBusy = isCreating || isUpdating;
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      name: isEditMode ? props.cabinData.name : '',
      maxCapacity: isEditMode ? props.cabinData.maxCapacity : 1,
      regularPrice: isEditMode ? props.cabinData.regularPrice : 0,
      discount: isEditMode ? props.cabinData.discount : 0,
      description: isEditMode ? props.cabinData.description : '',
      image: null as File | null,
    },
    onSubmit: async ({ value: cabinData }) => {
      const dataToSubmit = { ...cabinData };
      if (isEditMode)
        updateCabinMutation({ cabinData: dataToSubmit, id: props.cabinId });
      else createCabinMutation(dataToSubmit);
    },
  });

  if (updateError || createError) {
    let message = '';
    if (updateError instanceof Error) message = updateError.message;
    else if (createError instanceof Error) message = createError.message;
    else message = 'Action could not be completed. Please try again';
    notifications.show({
      message,
      color: 'red',
    });
  }

  return (
    <form
      className='md:*:w-10/12 *:w-full  mx-auto p-5 flex flex-col items-center gap-3'
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}>
      <Field
        name='name'
        validators={{
          onChange: ({ value }) => validateName(value),
        }}>
        {field => (
          <TextInput
            label='Name'
            id={field.name}
            name={field.name}
            value={field.state.value || ''}
            type='text'
            onChange={e => field.handleChange(e.target.value)}
            error={field.state.meta.errors[0]}
            disabled={isBusy}
            onBlur={field.handleBlur}
          />
        )}
      </Field>
      <Field
        name='maxCapacity'
        validators={{
          onChange: ({ value }) => validateMaxCapacity(value),
        }}>
        {field => (
          <TextInput
            label='Max capacity'
            value={field.state.value || 0}
            onChange={e => field.handleChange(e.target.valueAsNumber)}
            onBlur={field.handleBlur}
            placeholder='Max capacity'
            type='number'
            error={field.state.meta.errors[0]}
            disabled={isBusy}
          />
        )}
      </Field>
      <Field
        name='regularPrice'
        validators={{
          onChange: ({ value }) => validateRegularPrice(value),
        }}
        children={({ state, handleChange, handleBlur }) => (
          <TextInput
            label='Regular price'
            value={state.value || 0}
            onChange={e => handleChange(Number(e.target.value))}
            onBlur={handleBlur}
            placeholder='Regular price'
            type='number'
            error={state.meta.errors[0]}
            disabled={isBusy}
          />
        )}
      />
      <Field
        name='discount'
        validators={{
          onChange: ({ value }) => validateDiscount(value),
        }}
        children={({ state, handleChange, handleBlur }) => (
          <TextInput
            label='Discount'
            value={state.value || 0}
            onChange={e => handleChange(Number(e.target.value))}
            onBlur={handleBlur}
            placeholder='Discount'
            type='number'
            error={state.meta.errors[0]}
            disabled={isBusy}
          />
        )}
      />
      <Field
        name='description'
        validators={{
          onChange: ({ value }) => {
            if (!value) return VALIDATION_MESSAGES.required;
            if (value.length > 500)
              return 'Description is too long (max 500 characters)';
            return undefined;
          },
        }}
        children={({ state, handleChange, handleBlur }) => (
          <Textarea
            label='Description'
            value={state.value || ''}
            onChange={e => handleChange(e.target.value)}
            onBlur={handleBlur}
            placeholder='Cabin description'
            error={state.meta.errors[0]}
            disabled={isBusy}
          />
        )}
      />
      <Field
        name='image'
        children={field => (
          <FileInput
            label='Upload an image'
            accept='image/*'
            onChange={field.handleChange}
            placeholder='Upload an image'
            error={field.state.meta.errors[0]}
            disabled={isBusy}
            withAsterisk
          />
        )}
      />
      <Button variant='filled' type='submit' disabled={isBusy} loading={isBusy}>
        Submit
      </Button>
    </form>
  );
}
