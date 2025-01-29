import React from 'react';
import AdminSidebar from '/src/components/AdminSidebar'
import AdminHeader from '/src/components/AdminHeader'
import JobOrderModal from '/src/components/JobOrderModal'

export default function EmployeesList() {
    return (
        <div className='bg-[#F7F7F7] min-h-screen relative'>
    <AdminHeader />
    
    <div className='flex flex-col sm:flex-row'>
        <AdminSidebar />

        <div className="p-4 flex-1 w-full">
            <div className="container w-full h-[98vh] sm:h-screen bg-[#F7F7F7] overflow-auto">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tailor ID
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Bogart De La Cruz
                                </th>
                                <td className="px-6 py-4">
                                    bdelacruz@gmail.com
                                </td>
                                <td className="px-6 py-4">
                                    09********
                                </td>
                                <td className="px-6 py-4">
                                    1234567890
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}