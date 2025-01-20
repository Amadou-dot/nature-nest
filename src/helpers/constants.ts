export const PREFERS_DARK_SCHEME = window.matchMedia('(prefers-color-scheme: dark)').matches;
// Color constants used throughout the app
export const COLORS = {
  primary: PREFERS_DARK_SCHEME ? '#3730a3': '#e0e7ff',
  success: PREFERS_DARK_SCHEME ? '#166534' : '#dcfce7',
  danger: PREFERS_DARK_SCHEME ? '#b91c1c' : '#fee2e2',
  gray: '#9ca3af',
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