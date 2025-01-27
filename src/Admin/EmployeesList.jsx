import React from 'react';
import AdminSidebar from '/src/components/AdminSidebar'
import AdminHeader from '/src/components/AdminHeader'

export default function AdminShopProfile() {
    return (
        <div className='min-h-screen relative'>
                    <AdminHeader />
        
                    <div className='w-fit h-fit grid grid-cols-5 bg-[#F7F7F7]'>
                        <AdminSidebar />
        
                        <div className='m-3 p-4 bg-[#fefefe] col-span-4'>
                
                <div class="mt-3 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Phone Number
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th>
                                </tr>
                                </thead>
                                
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Bogart De La Cruz
                                        </th>
                                        <td class="px-6 py-4">
                                            bdelacruz@gmail.com
                                        </td>
                                        <td class="px-6 py-4">
                                            09********
                                        </td>
                                        <td class="px-6 py-4">
                                            On Duty
                                        </td>
                                    </tr>
                                </tbody>
                    </table>
                </div>
            </div>

                    </div>
                </div>
    )
}