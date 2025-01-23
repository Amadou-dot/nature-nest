export const PREFERS_DARK_SCHEME =
  localStorage.getItem('mantine-color-scheme-value') === ('dark' as const);
// Color constants used throughout the app
export const COLORS = {
  primary: PREFERS_DARK_SCHEME ? '#3730a3' : '#e0e7ff',
  success: PREFERS_DARK_SCHEME ? '#166534' : '#dcfce7',
  danger: PREFERS_DARK_SCHEME ? '#b91c1c' : '#fee2e2',
  gray: '#9ca3af',
} as const;
/**Max width the app considers a mobile device*/
export const MOBILE_MAX_WIDTH = 550 as const;
/**Max width the app considers a tablet*/
export const TABLET_MAX_WIDTH = 768 as const;
/**Max width the app considers a large tablet. Right below a laptop*/
export const LARGE_TABLET_MAX_WIDTH = 1024 as const;

/** Booking status options */
export const BOOKING_STATUS = {
  unconfirmed: 'unconfirmed',
  checkedIn: 'checked-in',
  checkedOut: 'checked-out',
} as const;

/** Default page sizes for table */
export const PAGE_SIZES = {
  xs: 5,
  sm: 7,
  md: 10,
  lg: 20,
} as const;

/** API error messages */
export const ERROR_MESSAGES = {
  fetchBookings: 'Error fetching bookings',
  fetchCabins: 'Error fetching cabins',
  updateBooking: 'Error updating booking',
  deleteBooking: 'Error deleting booking',
} as const;

/** Form validation messages */
export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be less than ${max} characters`,
} as const;
