import { Box, Image, NumberFormatter, Text } from "@mantine/core";
import {
  formatDate,
  formatDistanceFromNow,
  subtractDates,
} from "../../helpers/utilFunctions";
import { Database } from "../../types/database.types";
import {
  HiMiniXMark,
  HiOutlineCheckCircle,
  HiOutlineHomeModern,
} from "react-icons/hi2";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type Cabin = Database["public"]["Tables"]["cabins"]["Row"];
type Guest = Database["public"]["Tables"]["guests"]["Row"];
type BookingProp = { booking: Booking & { cabins: Cabin; guests: Guest } };

export default function BookingDataBox({ booking }: BookingProp) {
  const {
    startDate,
    endDate,
    cabins,
    guests,
    totalPrice,
    hasBreakfast,
    numNights,
    extrasPrice,
    isPaid, cabinPrice
  } = booking;
  const {
    name: cabinName,
    regularPrice,
    discount,
    maxCapacity,
    created_at,
  } = cabins;
  const { fullName, email, nationalID, countryFlag, nationality } = guests;
  return (
    <Box className="space-y-10 py-5">
      <Box className="flex items-center justify-between rounded-lg bg-indigo-600 p-4 text-slate-100">
        <Text className="flex items-center gap-2 text-lg font-semibold">
          <HiOutlineHomeModern size={24} /> {numNights} nights in Cabin{" "}
          {cabinName}
        </Text>
        <Text className="text-lg">
          {`${startDate && formatDate(startDate)} (${startDate && formatDistanceFromNow(startDate)}) - 
          ${endDate && formatDate(endDate)}`}
        </Text>
      </Box>
      <Box className="guest">
        <Box className="flex items-center gap-2">
          <Text component="span" className="flex items-center gap-2">
            {countryFlag && (
              <Image
                src={countryFlag}
                alt={`${nationality} flag`}
                className="h-6 w-6"
              />
            )}
            {fullName}{" "}
            {maxCapacity && maxCapacity > 1
              ? `+ ${maxCapacity - 1} guests`
              : ""}
          </Text>
          <Text component="span" className="text-slate-500">
            {" "}
            &bull; {email}
          </Text>
          <Text component="span" className="text-slate-500">
            {" "}
            &bull; National ID: {nationalID}
          </Text>
        </Box>
        <Text className="mt-5 flex items-center gap-2">
          {hasBreakfast ? (
            <HiOutlineCheckCircle size={20} />
          ) : (
            <HiMiniXMark size={20} />
          )}{" "}
          Breakfast included?{" "}
          <Text component="span" className="text-slate-600">
            {hasBreakfast ? "Yes" : "No"}
          </Text>
        </Text>
        <Box className="mt-5 flex items-center justify-between rounded-lg bg-yellow-300 p-5">
          <Text className="">
            Total price:{" "}
            {
              <NumberFormatter
                prefix="$"
                value={totalPrice ?? NaN}
                thousandSeparator
              />
            }{" "}
            (${cabinPrice} cabin + ${extrasPrice} breakfast)
          </Text>
          <Text className="text-sm uppercase">
            {isPaid ? "Already Paid" : "Will pay at property"}
          </Text>
        </Box>
      </Box>
      <Text className="text-right text-sm text-slate-700">
        Booked {formatDate(created_at, true)}
      </Text>
    </Box>
  );
}
