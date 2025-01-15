import { Box } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import { useModal } from '../context/ModalContext';
import CabinDetails from '../features/cabins/CabinDetails';
import CabinForm from '../features/cabins/CabinForm';
import { getCabinById } from '../services/apiCabins';
import { Cabin } from '../types/database.types';
import ConfirmDelete from './ConfirmDelete';


export default function ContextMenu({ itemId }: { itemId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box className='relative'>
      <HiOutlineEllipsisVertical
        size={24}
        className='cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <Box
          ref={menuRef}
          className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50'>
          <ul className='py-1'>
            <li
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              onClick={async () => {
                const cabinData = await getCabinById(itemId);
                openModal(
                  <CabinForm
                    mode='edit'
                    cabinData={(cabinData && cabinData) || ({} as Cabin)}
                    cabinId={itemId}
                  />
                );
                setIsOpen(false);
              }}>
              Edit
            </li>
            <li
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              onClick={() => {
                openModal(<ConfirmDelete cabinId={itemId} />);
                setIsOpen(false);
              }}>
              Delete
            </li>
            <li
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              onClick={() => {
                openModal(<CabinDetails cabinId={itemId} />);
                setIsOpen(false);
              }}>
              View Details
            </li>
          </ul>
        </Box>
      )}
    </Box>
  );
}
