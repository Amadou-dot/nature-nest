import { z, ZodError } from 'zod';
import { PASSWORD_REQUIREMENTS } from './constants';

//? AUTHENTICATION
export const userNameSchema = z
  .string()
  .min(3, 'Name must be at least 3 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z ]+$/, 'Name must only contain letters, and spaces')
  .nonempty('A name is required');

export const emailSchema = z
  .string()
  .nonempty('Enter your email address')
  .email('Invalid email');

export const loginPasswordSchema = z.string().nonempty('Enter your password');

export const createPasswordSchema = PASSWORD_REQUIREMENTS.reduce(
  (schema, requirement) => schema.regex(requirement.re, requirement.label),
  z.string().nonempty('A password is required'),
);

export const registerUserSchema = z
  .object({
    fullName: userNameSchema,
    email: emailSchema,
    password: createPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

//? CABINS

export const priceSchema = z.number().min(1, 'Price must be greater than 1');

export const discountSchema = z
  .number()
  .max(100, 'Discount cannot exceed 100%')
  .min(0, 'Discount cannot be negative')
  .optional()
  .nullable();

export const cabinSchema = z.object({
  name: z.string().nonempty('Enter a name for the cabin'),
  maxCapacity: z.number().min(1, 'Capacity must be at least 1'),
  description: z.string().nonempty('Enter a description for the cabin'),
  regularPrice: priceSchema,
  discount: discountSchema,
  image: z.instanceof(File).nullable(),
});
//? SETTINGS

//? VALIDATION FUNCTIONS
export const validateRegularPrice = (price: number | null) => {
  try {
    priceSchema.parse(price);
    return undefined;
  } catch (e) {
    return (e as ZodError).errors[0].message;
  }
};

export const validateDiscount = (discount: number | null) => {
  try {
    discountSchema.parse(discount);
    return undefined;
  } catch (e) {
    return (e as ZodError).errors[0].message;
  }
};

export const validateEmail = (email: string | null) => {
  try {
    emailSchema.parse(email);
    return undefined;
  } catch (e) {
    return (e as ZodError).errors[0].message;
  }
};

export const validatePassword = (password: string | null) => {
  try {
    createPasswordSchema.parse(password);
    return undefined;
  } catch (e) {
    return (e as ZodError).errors[0].message;
  }
};

export const validateUserName = (name: string | null) => {
  try {
    userNameSchema.parse(name);
    return undefined;
  } catch (e) {
    return (e as ZodError).errors[0].message;
  }
};
