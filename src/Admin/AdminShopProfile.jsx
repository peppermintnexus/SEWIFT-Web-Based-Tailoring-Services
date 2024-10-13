import React from 'react';
import AdminNav from '/src/components/AdminNav'
import Upload from '/src/components/Upload'

export default function AdminShopProfile() {
    return (
        <div className='grid grid-cols-5 bg-[#3f6e85]'>
            <AdminNav />

            <div className='col-span-4 bg-[#f0f0f0]'>
                <div className='m-5 p-5 bg-[#fefefe] shadow'>
                    <div className='flex'>
                        <Upload />
                        <div className='mx-3 '>
                            <h1 className='text-lg font-semibold'>Tailor Shop Name</h1>
                            <p>Working Hours</p>
                            <p>Open from Monday - Friday</p>
                            <p>Complete Address</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}