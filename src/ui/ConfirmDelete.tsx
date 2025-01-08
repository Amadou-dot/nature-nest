export default function ConfirmDelete() {
  return (
    <>
      <h1>Are you sure you want to delete</h1>
      <div className='flex justify-between mt-5'>
        <button className='text-gray-200 p-3 bg-red-500 rounded-lg'>Confirm</button>
        <button>Cancel</button>
      </div>
    </>
  );
}
