import { useRef, useState } from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import CabinDetails from '../../features/cabins/CabinDetails';
import CabinForm from '../../features/cabins/CabinForm';
import ConfirmDelete from '../ConfirmDelete';
import ModalWindow from '../Modal';

export default function ContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //     setIsOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

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
            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
              <ModalWindow openText='Edit' ><CabinForm /></ModalWindow>
            </li>
            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
              <ModalWindow openText='Delete' ><ConfirmDelete /></ModalWindow>
            </li>
            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
              <ModalWindow openText='View Details' ><CabinDetails /></ModalWindow>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}