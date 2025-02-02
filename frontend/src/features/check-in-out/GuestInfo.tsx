import { Box, Image, Text } from '@mantine/core';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { BookingProp } from '../../types/database.types';

export default function GuestInfo({ booking }: BookingProp) {
  const { cabins, guests, hasBreakfast, userNotes } = booking;
  const { maxCapacity } = cabins;
  const { fullName, email, nationalID, countryFlag, nationality } = guests;

  return (
    <Box>
      {/*//? Guest info */}
      <Box className='flex flex-col items-center gap-2 md:flex-row'>
        <Text
          component='span'
          className='flex items-center gap-2 font-semibold'
        >
          {countryFlag && (
            <Image
              src={countryFlag}
              alt={`${nationality} flag`}
              className='h-6 w-6'
            />
          )}
          {`${fullName} ${maxCapacity && maxCapacity > 1 ? `+ ${maxCapacity - 1} guests` : ''}`}
        </Text>

        <Text
          component='span'
          className='text-grey-500 dark:text-dark-grey-500 flex gap-2'
        >
          <Text className='hidden md:block'>&bull;</Text> <Text>{email}</Text>
        </Text>

        <Text
          component='span'
          className='text-grey-500 dark:text-dark-grey-500 flex gap-2'
        >
          <Text className='hidden md:block'>&bull;</Text>{' '}
          <Text> National ID: {nationalID}</Text>
        </Text>
      </Box>

      {/*//? user notes */}
      {userNotes && (
        <Text className='mt-5 flex flex-col items-center gap-2 md:flex-row'>
          <Text
            component='span'
            className='flex items-center gap-2 font-semibold'
          >
            <HiOutlineChatBubbleBottomCenterText className='dark:text-dark-yellow-100' />
            User Note
          </Text>
          <Text component='span' className='text-center'>{userNotes}</Text>
        </Text>
      )}

      {/*//? Breakfast included */}
      <Text className='mt-5 flex items-center gap-2 font-semibold justify-center md:justify-start'>
        {hasBreakfast ? (
          <HiOutlineCheckCircle
            size={20}
            className='dark:text-dark-yellow-100'
          />
        ) : (
          <HiOutlineXMark size={20} className='dark:text-dark-yellow-100' />
        )}
        Breakfast included?
        <Text component='span'>{hasBreakfast ? 'Yes' : 'No'}</Text>
      </Text>
    </Box>
  );
}
