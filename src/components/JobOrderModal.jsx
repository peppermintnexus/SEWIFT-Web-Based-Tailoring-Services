import React from "react";

export default function JobOrderModal() {
  return (
    <div className='w-72 py-3 px-4 bg-white rounded-lg'>
      <div className='flex justify-between'>
        <label className='pl-2 text-xl font-semibold dark:text-gray-400'>
          JO <span>0000</span>
        </label>
        <div className="rounded-lg items-center font-medium px-3 bg-[#ffdd94] dark:text-gray-400'">
          <label className='text-xs'>Cutting</label>
        </div>
      </div>
      <div className='border-t border-gray-100 mt-3 mb-3' />
      <div className='pl-2 text-[#A3A3A3]'>
        <p>Client Name</p>
        <p>Order Date</p>
        <p>Receipt</p>
        <p className='mt-3'>
          Handled by <span>Employee Name</span>
        </p>
      </div>
    </div>
  );
}
