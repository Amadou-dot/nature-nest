import { Button, LoadingOverlay, NumberInput } from '@mantine/core';
import { useForm } from '@tanstack/react-form';
import { COLORS, VALIDATION_MESSAGES } from '../../helpers/constants';
import { useSettings } from '../../hooks/useSettings';
import { useUpdateSettings } from './useUpdateSettings';

export default function SettingsForm() {
  const {
    mutate: updateSettingsMutation,
    error: updateError,
    isPending: isUpdating,
  } = useUpdateSettings();
  const { data: settings, isPending, error } = useSettings();

  if (updateError) new Error(error?.message);
  if (error) throw new Error('Error fetching settings');

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      minBookingLength: settings?.minBookingLength || 1,
      maxBookingLength: settings?.maxBookingLength || 10,
      maxGuestsPerBooking: settings?.maxGuestsPerBooking || 1,
      breakfastPrice: settings?.breakfastPrice || 15,
    },
    onSubmit: async ({ value: settings }) => {
      updateSettingsMutation(settings);
    },
  });

  if (isUpdating || isPending) return <LoadingOverlay visible />;
  return (
    <form
      className='space-y-4'
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Field
        name='minBookingLength'
        validators={{
          onChange: ({ value }) => {
            if (!value) return VALIDATION_MESSAGES.required;
            if (value < 1) return 'Must be at least 1 night';
            return undefined;
          },
        }}
        children={(field) => (
          <NumberInput
            label='Minimum Booking Length'
            value={field.state.value}
            onChange={(value) => field.handleChange(Number(value))}
            error={field.state.meta.errors[0]}
          />
        )}
      />

      <Field
        name='maxBookingLength'
        validators={{
          onChange: ({ value }) => {
            if (!value) return VALIDATION_MESSAGES.required;
            if (value < 1) return 'Must be at least 1 night';
            return undefined;
          },
        }}
        children={(field) => (
          <NumberInput
            label='Maximum Booking Length'
            value={field.state.value}
            onChange={(value) => field.handleChange(Number(value))}
            error={field.state.meta.errors[0]}
          />
        )}
      />

      <Field
        name='maxGuestsPerBooking'
        validators={{
          onChange: ({ value }) => {
            if (!value) return VALIDATION_MESSAGES.required;
            if (value < 1) return 'Must allow at least 1 guest';
            return undefined;
          },
        }}
        children={(field) => (
          <NumberInput
            label='Maximum Guests Per Booking'
            value={field.state.value}
            onChange={(value) => field.handleChange(Number(value))}
            error={field.state.meta.errors[0]}
          />
        )}
      />

      <Field
        name='breakfastPrice'
        validators={{
          onChange: ({ value }) => {
            if (value < 0) return 'Price must be a positive number';
            if (!value) return VALIDATION_MESSAGES.required;
            return undefined;
          },
        }}
        children={(field) => (
          <NumberInput
            label='Breakfast Price'
            value={field.state.value}
            onChange={(value) => field.handleChange(Number(value))}
            error={field.state.meta.errors[0]}
          />
        )}
      />
      <Button type='submit' color={COLORS.primary}>
        Save
      </Button>
    </form>
  );
}
