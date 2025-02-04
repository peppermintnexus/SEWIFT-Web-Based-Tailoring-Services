import React from "react";
import EmployeeSidebar from "/src/components/EmployeeSidebar";

export default function EmployeeTransactionHistory() {
  return (
    <div>
      <EmployeeSidebar />

      <div class='p-4 sm:ml-64 bg-gray-100 dark:bg-gray-800 h-screen'>
        <h1 className='text-2xl font-semibold mb-2'>Transaction History</h1>
        <div className='flex mb-2'>
          <button
            type='button'
            class='py-2 px-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-00 hover:bg-[#4dd0e1] focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
          >
            All
          </button>
          <button
            type='button'
            class='py-2 px-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-00 hover:bg-[#ffbe88] focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
          >
            Claimed
          </button>
          <button
            type='button'
            class='py-2 px-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-00 hover:bg-[#fa897b] focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
          >
            Canceled
          </button>
        </div>
        <div class='rounded-lg'>
          <div class='grid mb-4'>
            <div class='flex rounded-sm gap-4 bg-white-50 dark:bg-white-800'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
