import { differenceInDays, formatDistance, parseISO } from 'date-fns';
import { BOOKING_STATUS, COLORS } from './constants';

//Should work for both Date objects and strings (which come from Supabase)
export const subtractDates = (
  dateStr1: string | Date,
  dateStr2: string | Date
): number =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

interface FormatDistanceOptions {
  addSuffix: boolean;
}

export const formatDistanceFromNow = (dateStr: string): string =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  } as FormatDistanceOptions)
    .replace('about ', '')
    .replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options: { end?: boolean } = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );

export const formatDate = (date: string, time?: boolean) => {
  if (time)
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getBadgeColor = (status: string | null) => {
  if (!status) return COLORS.gray;
  if (status === BOOKING_STATUS.checkedIn) return COLORS.success; // teal-500
  if (status === BOOKING_STATUS.unconfirmed) return COLORS.primary; // indigo-700
  return COLORS.gray;
};
