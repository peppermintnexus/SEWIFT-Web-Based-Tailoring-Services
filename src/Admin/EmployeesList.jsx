import React from 'react'
import AdminNav from '/src/components/AdminNav'

export default function ClientProfile() {
    return (
        <div className='grid grid-cols-5 bg-[#3f6e85]'>
                <AdminNav />

            <div className='col-span-4 bg-[#f7f7f7]'>
                <div className='m-5 p-3 bg-[#fefefe] rounded-lg'>
                    <h1 className='text-2xl font-semibold'>Employees</h1>

                    
                </div>
            </div>
        </div>
    )
}