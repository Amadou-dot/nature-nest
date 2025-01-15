import { Box, Image, Text } from '@mantine/core';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import {
  HiMiniXMark,
  HiOutlineChatBubbleBottomCenterText,
} from 'react-icons/hi2';
import { BookingProp } from '../../types/database.types';

export default function GuestInfo({ booking }: BookingProp) {
  const { cabins, guests, hasBreakfast, userNotes } = booking;
  const { maxCapacity } = cabins;
  const { fullName, email, nationalID, countryFlag, nationality } = guests;

  return (
    <Box>
        {/*//? Guest info */}
      <Box className='flex items-center gap-2'>
        <Text component='span' className='flex items-center gap-2 font-semibold'>
          {countryFlag && (<Image src={countryFlag} alt={`${nationality} flag`} className='h-6 w-6' /> )}
          {`${fullName} ${maxCapacity && maxCapacity > 1 ? `+ ${maxCapacity - 1} guests` : ''}`}
        </Text>
        
        <Text component='span' className='text-slate-500'>
            &bull; {email}
        </Text>

        <Text component='span' className='text-slate-500'>
            &bull; National ID: {nationalID}
        </Text>
      </Box>

      {/*//? user notes */}
      <Text className='mt-5 flex items-center gap-2'>
        <HiOutlineChatBubbleBottomCenterText />
        <Text component='span' className='font-semibold'>User Note</Text>
        <Text component='span' className='text-slate-600'>{userNotes}</Text>
      </Text>
      
      {/*//? Breakfast included */}
      <Text className='mt-5 flex items-center gap-2 font-semibold'>
        {hasBreakfast ? ( <HiOutlineCheckCircle size={20} />) : ( <HiMiniXMark size={20} /> )}
        Breakfast included?
        <Text component='span' className='text-slate-600'>
          {hasBreakfast ? 'Yes' : 'No'}
        </Text>
      </Text>
    </Box>
  );
}
