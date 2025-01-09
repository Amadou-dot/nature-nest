  export const validateName = (value: string | null) => {
    if (!value) return 'Name is required';
    if (value.length < 3) return 'Name must be at least 3 characters';
    if (value.length > 50) return 'Name must be less than 50 characters';
    if (!/^[a-zA-Z0-9]+$/.test(value))
      return 'Name must only contain letters and numbers';
    return undefined;
  };

  export const validateMaxCapacity = (value: number | null) => {
    if (!value) return 'Capacity is required';
    if (isNaN(value)) return 'Must be a number';
    if (value < 1) return 'Capacity must be at least 1';
    if (value > 10) return 'Capacity cannot exceed 10';
    return undefined;
  };

  export const validateRegularPrice = (value: number | null) => {
    if (!value) return 'Price is required';
    if (isNaN(value)) return 'Must be a number';
    if (value < 1) return 'Price must be at least 1';
    return undefined;
  };

  export const validateDiscount = (value: number | null) => {
    if (!value) return undefined;
    if (isNaN(value)) return 'Must be a number';
    if (value > 100) return 'Discount cannot exceed 100%';
    if (value < 0) return 'Discount cannot be negative';
    if (value < 0) return 'Discount cannot be negative';
    return undefined;
  };
