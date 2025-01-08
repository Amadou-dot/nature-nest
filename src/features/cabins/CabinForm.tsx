import { Button, FileInput, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';

export default function CabinForm() {
  const [image, setImage] = useState<File | null>(null);
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      maxCapacity: 0,
      regularPrice: 0,
      discount: 0,
      description: '',
      image: null,
    },
    onSubmit: async ({ value }) => {
      // get form data
      const formData = {...value, image};
      console.log(formData);
      // Handle form submission, e.g., send formData to the server
    },
  });

  return (
    <form
      className='w-96 mx-auto p-5'
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Field
        name='name'
        children={({ state, handleChange, handleBlur, name }) => (
          <div className='flex gap-5'>
            <label htmlFor={name}>Name</label>
            <TextInput
              className='w-full'
              value={state.value}
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur}
              placeholder='Cabin name'
              error={state.meta.errors[0]}
            />
          </div>
        )}
      />
      <Field
        name='maxCapacity'
        children={({ state, handleChange, handleBlur, name }) => (
          <div className='flex gap-5'>
            <label htmlFor={name}>Capacity</label>
            <TextInput
              className='w-full'
              value={state.value}
              onChange={e => handleChange(Number(e.target.value))}
              onBlur={handleBlur}
              placeholder='Max capacity'
              type='number'
              error={state.meta.errors[0]}
            />
          </div>
        )}
      />
      <Field
        name='regularPrice'
        children={({ state, handleChange, handleBlur, name }) => (
          <div className='flex gap-5'>
            <label htmlFor={name}>Price</label>
            <TextInput
              className='w-full'
              value={state.value}
              onChange={e => handleChange(Number(e.target.value))}
              onBlur={handleBlur}
              placeholder='Regular price'
              type='number'
              error={state.meta.errors[0]}
            />
          </div>
        )}
      />
      <Field
        name='discount'
        children={({ state, handleChange, handleBlur, name }) => (
          <div className='flex gap-5'>
            <label htmlFor={name}>Discount</label>
            <TextInput
              className='w-full'
              value={state.value}
              onChange={e => handleChange(Number(e.target.value))}
              onBlur={handleBlur}
              placeholder='Discount'
              type='number'
              error={state.meta.errors[0]}
            />
          </div>
        )}
      />
      <Field
        name='description'
        children={({ state, handleChange, handleBlur, name }) => (
          <div className='flex gap-5'>
            <label htmlFor={name}>Description</label>
            <Textarea
              className='w-full'
              value={state.value}
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur}
              placeholder='Cabin description'
              error={state.meta.errors[0]}
            />
          </div>
        )}
      />
      <div className='flex gap-5'>
        <label htmlFor='image'>Cabin Image</label>
        <FileInput
          id='image'
          name='image'
          accept='image/*'
          onChange={setImage}
          className='w-full'
        />
      </div>
      <Button type='submit' className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>
        Submit
      </Button>
    </form>
  );
}