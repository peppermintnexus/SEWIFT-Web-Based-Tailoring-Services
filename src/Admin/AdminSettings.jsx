import React from 'react';
import AdminSidebar from '/src/components/AdminSidebar'

export default function AdminTransactionHistory() {
    return (
        <div className='grid grid-cols-5 bg-[#f7f7f7] min-h-screen'>
            <AdminSidebar />
            
            <div className='col-span-4'>
                <h1 className='font-semibold text-4xl p-7'>Settings</h1>

                <div className='grid grid-rows-2 pl-7 pt-5'>
                    <p className='text-xl'>Name</p>
                    <input className="w-96 mt-1 text-left h-7 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    <p className='text-xl pt-3'>Email</p>
                    <input className="w-96 mt-1 text-left h-7 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
            </div>
        </div>
    )
}