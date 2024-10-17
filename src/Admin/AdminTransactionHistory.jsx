import React from 'react';
import AdminSidebar from '/src/components/AdminSidebar'
import Upload from '/src/components/Upload'

export default function AdminShopProfile() {
    return (
        <div className='grid grid-cols-5 bg-[##f7f7f7]'>
            <AdminSidebar />

            <div className='col-span-4 bg-[#f7f7f7] p-4'>
                    <h1 className='font-semibold text-3xl'>Transaction History</h1>

                    <div className='bg-[#fefefe] mt-5 p-3'>
                        <div className='flex'>
                            <Upload />

                            <div className='pl-3'>
                            <h1 className='text-lg font-semibold'>Product Name</h1>
                            <p>Type of Order</p>
                            </div>
                        </div>
                        
                    </div>
            </div>
        </div>
    )
}