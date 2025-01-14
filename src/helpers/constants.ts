// Color constants used throughout the app
export const COLORS = {
  primary: '#4338ca', // indigo-700
  success: '#14b8a6', // teal-500
  danger: '#ef4444',  // red-500
  gray: '#6b7280',    // gray-500
} as const;

// Status options for bookings
export const BOOKING_STATUS = {
  unconfirmed: 'unconfirmed',
  checkedIn: 'checked-in',
  checkedOut: 'checked-out',
} as const;

// Default table page sizes 
export const PAGE_SIZES = {
  small: 5,
  medium: 10,
  large: 20,
} as const;

// API error messages
export const ERROR_MESSAGES = {
  fetchBookings: 'Error fetching bookings',
  fetchCabins: 'Error fetching cabins',
  updateBooking: 'Error updating booking',
  deleteBooking: 'Error deleting booking',
} as const;

// Form validation messages
export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be less than ${max} characters`,
} as const;