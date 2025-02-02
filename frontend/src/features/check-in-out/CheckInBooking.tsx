import { Box, Button, Checkbox, LoadingOverlay, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../helpers/constants';
import { formatCurrency } from '../../helpers/utilFunctions';
import { useBooking } from '../../hooks/useBooking';
import { useCheckIn } from '../../hooks/useCheckIn';
import { useSettings } from '../../hooks/useSettings';
import { Booking } from '../../types/database.types';
import PageHeading from '../bookings/PageHeading';
import BookingDataBox from '../bookings/BookingDataBox';

export default function CheckInBooking() {
  const navigate = useNavigate();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [includeBreakfast, setIncludeBreakfast] = useState(false);
  const { data: booking, isPending, error } = useBooking();
  const { mutate: checkIn, isPending: isCheckingIn } = useCheckIn();
  const { data: settings, isPending: isLoadingSettings } = useSettings();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);
  const isBusy = isPending || isCheckingIn || isLoadingSettings;
  if (isBusy) return <LoadingOverlay visible />;
  if (error)
    return <Text className='text-red-500'>Error: {error.message}</Text>;
  if (!settings?.breakfastPrice)
    return (
      <Text className='text-red-500'>Error: Error retrieving settings</Text>
    );
  const {
    id: bookingId,
    totalPrice,
    isPaid,
    status,
    numGuests,
    numNights,
    hasBreakfast,
  } = booking;
  const optionalBreakfastPrice =
    settings?.breakfastPrice * numGuests! * numNights!;
  const handleCheckIn = () => {
    if (!confirmPaid) return;

    if (includeBreakfast) {
      const bookingObj = {
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: totalPrice! + optionalBreakfastPrice,
      } as Partial<Booking>;
      checkIn({ bookingId, bookingObj });
    } else checkIn({ bookingId });
  };
  return (
    <Box>
      <PageHeading text={`Check in booking #${bookingId}`} />
      <BookingDataBox booking={booking} />
      {!hasBreakfast && status === 'unconfirmed' && (
        <Checkbox
          label={`Include Breakfast for ${formatCurrency(optionalBreakfastPrice)}`}
          checked={includeBreakfast}
          onChange={(e) => {
            setIncludeBreakfast(e.currentTarget.checked);
            setConfirmPaid(false);
          }}
        />
      )}

      <Checkbox
        className='mt-4'
        label={`Confirm that the booking has been paid in full (${formatCurrency(includeBreakfast ? totalPrice! + optionalBreakfastPrice : totalPrice!)})`}
        checked={confirmPaid}
        onChange={(e) => setConfirmPaid(isPaid || e.currentTarget.checked)}
        disabled={isCheckingIn || confirmPaid || false}
      />
      {status === 'unconfirmed' && (
        <Box className='mt-4 flex justify-end gap-2'>
          <Button
            className=''
            color={COLORS.primary}
            disabled={!confirmPaid || isCheckingIn}
            onClick={handleCheckIn}
          >
            Check in booking #{bookingId}
          </Button>

          <Button className='' color={COLORS.gray} onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Box>
      )}
      {status === 'checked-in' && (
        <Text className='text-right font-semibold text-green-700'>
          Booking already checked in
        </Text>
      )}
      {status === 'checked-out' && (
        <Text className='text-right font-semibold text-gray-500'>
          Booking already checked out
        </Text>
      )}
    </Box>
  );
}
