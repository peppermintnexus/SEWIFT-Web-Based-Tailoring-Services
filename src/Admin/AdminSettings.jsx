import React from 'react';
import AdminSidebar from '/src/components/AdminSidebar'
import AdminHeader from '/src/components/AdminHeader'

export default function AdminTransactionHistory() {
    return (
        <div className='bg-[#F7F7F7] min-h-screen relative'>
            <AdminHeader />
        
            <div className='flex'>
                <AdminSidebar />

                <div className="p-4 flex-1 w-full">
    <div className="container w-full h-full sm:h-screen bg-[#F7F7F7]">
        <div className='bg-[#FEFEFE] border'>
            <h1 className='px-7 py-3 text-xl font-medium'>Account Information</h1>

            <div className="border-t border-gray-100 mb-3" />
            <div className='gap-7 px-7 grid grid-cols-2 sm:grid-cols-2'>
                <div>
                    <h1 className='mb-2 font-medium'>Name</h1>
                    <input
                        type='text'
                        name='firstName'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full sm:w-80 p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white'
                    />
                </div>
                <div>
                    <h1 className='mb-2 font-medium'>Email</h1>
                    <input
                        type='text'
                        name='email'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full sm:w-80 p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white'
                        placeholder="Email"
                    />
                </div>
            </div>

            <div className='px-7 mt-4'>
                <h1 className='mb-2 font-medium'>Phone Number</h1>
                <input
                    type='text'
                    name='phoneNumber'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full sm:w-80 p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white'
                />
            </div>

            <div className="border-t border-gray-100 mt-3 mb-3" />
            <button type="button" className="ml-7 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
        </div>

        <div className='mt-3 bg-[#FEFEFE] border'>
            <h1 className='px-7 py-3 text-xl font-medium'>Change Password</h1>

            <div className="border-t border-gray-100 mb-3" />
            <div className='gap-7 px-7 grid grid-cols-1 sm:grid-cols-2'>
                <div>
                    <h1 className='mb-2 font-medium'>New Password</h1>
                    <input
                        type='password'
                        name='newPassword'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-auto sm:w-52 p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white'
                    />
                </div>
                <div>
                    <h1 className='mb-2 font-medium'>Confirm Password</h1>
                    <input
                        type='password'
                        name='confirmPassword'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-auto sm:w-52 p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white'
                    />
                </div>
            </div>

            <div className="border-t border-gray-100 mt-3 mb-3" />
            <button type="button" className="ml-7 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Reset Password</button>
        </div>
    </div>
</div>
            </div>
        </div>
    )
}