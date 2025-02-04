import React from "react";
import EmployeeSidebar from "/src/components/EmployeeSidebar";

export default function AdminTransactionHistory() {
  return (
    <div>
      <EmployeeSidebar />

      <div class='p-4 sm:ml-64 bg-gray-100 dark:bg-gray-800 h-full'>
        <h1 className='text-2xl font-semibold mb-2'>Settings</h1>

        <div className='shadow w-full p-5 bg-white'>
          <h1 className='text-xl'>Personal Information</h1>
          <div className='border-t border-gray-100 mt-4 mb-3' />
          <div className='grid grid-cols-2 gap-9'>
            <div class='mb-3'>
              <label
                for='firstName'
                class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
            <div class='mb-3'>
              <label
                for='lastName'
                class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-9'>
            <div class='mb-6'>
              <label
                for='default-input'
                class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Email
              </label>
              <input
                type='text'
                id='email'
                class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
            <div>
              <label
                for='email'
                class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Phone Number
              </label>
              <input
                type='text'
                id='Phone Number'
                class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <div className='mt-6 justify-self-end'>
                <button className='text-white text-sm px-4 rounded-lg py-3 bg-[#111827] font-medium'>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='shadow w-full p-5 mt-5 bg-white'>
          <h1 className='text-xl'>Change Password</h1>
          <div className='border-t border-gray-100 mt-4 mb-3' />
          <div className='grid grid-cols-2 gap-9'>
            <div class='mb-3'>
              <label
                for='firstName'
                class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                New Password
              </label>
              <input
                type='text'
                id='firstName'
                class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
            <div class='mb-3'>
              <label
                for='lastName'
                class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Confirm Password
              </label>
              <input
                type='text'
                id='lastName'
                class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
          </div>
          <div className='mt-6 justify-self-end'>
            <button className='text-white text-sm px-4 rounded-lg py-3 bg-[#111827] font-medium'>
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
