export const validateCabinName = (name: string | null) => {
  if (!name) return 'Name is required';
  if (name.length < 3) return 'Name must be at least 3 characters';
  if (name.length > 50) return 'Name must be less than 50 characters';
  if (!/^[a-zA-Z0-9]+$/.test(name))
    return 'Name must only contain letters and numbers';
  return undefined;
};

export const validateMaxCapacity = (capacity: number | null) => {
  if (!capacity) return 'Capacity is required';
  if (isNaN(capacity)) return 'Must be a number';
  if (capacity < 1) return 'Capacity must be at least 1';
  if (capacity > 10) return 'Capacity cannot exceed 10';
  return undefined;
};

export const validateRegularPrice = (price: number | null) => {
  if (!price) return 'Price is required';
  if (isNaN(price)) return 'Must be a number';
  if (price < 1) return 'Price must be at least 1';
  return undefined;
};

export const validateDiscount = (discount: number | null) => {
  if (!discount) return undefined;
  if (isNaN(discount)) return 'Must be a number';
  if (discount > 100) return 'Discount cannot exceed 100%';
  if (discount < 0) return 'Discount cannot be negative';
  if (discount < 0) return 'Discount cannot be negative';
  return undefined;
};

export const validateEmail = (email: string | null) => {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email';
  return undefined;
};

export const validatePassword = (password: string | null) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return undefined;
};

export const validateUserName = (name: string | null) => {
  if (!name) return 'A name is required'
  if (name.length < 3) return 'Name must be at least 3 characters';
  if (name.length > 50) return 'Name must be less than 50 characters';
  if (!/^[a-zA-Z0-9 ]+$/.test(name)) return 'Name must only contain letters, numbers, and spaces'
}