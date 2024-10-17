import React from 'react';
import AdminSidebar from '/src/components/AdminSidebar'
import Upload from '/src/components/Upload'

export default function AdminShopProfile() {
    return (
        <div className='grid grid-cols-4 bg-[#3f6e85]'>
            <AdminSidebar />

            <div className='col-span-3 bg-[#f7f7f7] p-4'>
                    <h1 className='font-semibold text-3xl'>Employees</h1>

                    <div className='bg-[#fefefe] mt-5 p-3'>
                        <div className='flex'>
                            <Upload />

                            <div className='pl-3'>
                            <h1 className='text-lg font-semibold'>Product Name</h1>
                            <p>Type of Order</p>
                            <p>Status</p>
                            <p>Delivery</p>
                            </div>
                        </div>
                        
                    </div>
            </div>
        </div>
    )
}