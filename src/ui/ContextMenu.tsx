import { useEffect, useRef, useState } from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import { useModal } from '../context/ModalContext';
import { getCabinById } from '../services/apiCabins';
import CabinDetails from '../features/cabins/CabinDetails';
import CabinForm from '../features/cabins/CabinForm';
import { Database } from '../types/database.types';
import ConfirmDelete from './ConfirmDelete';

type Cabin = Database['public']['Tables']['cabins']['Row'];

export default function ContextMenu({ cabinId }: { cabinId: number }) {
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
    <div className='relative'>
      <HiOutlineEllipsisVertical
        size={24}
        className='cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div
          ref={menuRef}
          className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50'>
          <ul className='py-1'>
            <li
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              onClick={async () => {
                const cabinData = await getCabinById(cabinId);
                openModal(
                  <CabinForm
                    mode='edit'
                    cabinData={(cabinData && cabinData) || ({} as Cabin)}
                    cabinId={cabinId}
                  />
                );
                setIsOpen(false);
              }}>
              Edit
            </li>
            <li
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              onClick={() => {
                openModal(<ConfirmDelete cabinId={cabinId} />);
                setIsOpen(false);
              }}>
              Delete
            </li>
            <li
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              onClick={() => {
                openModal(<CabinDetails cabinId={cabinId} />);
                setIsOpen(false);
              }}>
              View Details
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
