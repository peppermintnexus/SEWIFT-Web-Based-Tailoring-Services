import React from 'react';
import EmployeeSidebar from '/src/components/EmployeeSidebar'
import EmployeeHeader from '/src/components/EmployeeHeader'

export default function AdminTransactionHistory() {
    return (
        <div className='min-h-screen relative'>
                    <EmployeeHeader />
        
                    <div className='w-fit h-fit grid grid-cols-5 bg-[#F7F7F7]'>
                        <EmployeeSidebar />

                        <div className='px-12 pt-9 col-start-2 col-end-6 w-full h-full bg-[#fefefe]'>
                            <div className='flex gap-7'>
                                <div className='mb-2'>
                                    <label className='block mb-1 font-medium'>First Name</label>
                                    <input
                                    type='text'
                                    name='firstName'
                                    className='text-[#6F6F6F] bg-[#f7f7f7] border'
                                    />
                                </div>
                                <div className='mb-2'>
                                    <label className='block mb-1 font-medium'>Last Name</label>
                                    <input
                                    type='text'
                                    name='lastName'
                                    className='text-[#6F6F6F] bg-[#f7f7f7] border'
                                    />
                                </div>

                                <button className='sel-center bg-[#171B1F] text-white mt-4 mb-1 px-6  rounded'>
                                    Edit
                                </button>
                            </div>

                            <div className='mb-2'>
                                <label className='block mb-1 font-medium'>Email</label>
                                <input
                                type='text'
                                className='text-[#6F6F6F] bg-[#f7f7f7] border'
                                />
                            </div>

                            <h1 className='pt-5 text-2xl font-semibold'>Change Password</h1>

                            <div className='pt-5 mb-2'>
                                <label className='block mb-1 font-medium'>Current Password</label>
                                <input
                                type='text'
                                className='text-[#6F6F6F] bg-[#f7f7f7] border'
                                />
                            </div>

                            <div className='pt-5 mb-2'>
                                <label className='block mb-1 font-medium'>New Password</label>
                                <input
                                type='text'
                                className='text-[#6F6F6F] bg-[#f7f7f7] border'
                                />
                                <h1 className='text-xs mb-3 italic'>
                                *Password must be more than ten characters*
                            </h1>
                            </div>

                            <div className='mb-2'>
                                <label className='block mb-1 font-medium'>Confirm Password</label>
                                <input
                                type='text'
                                className='text-[#6F6F6F] bg-[#f7f7f7] border'
                                />
                            </div>

                            <button className='sel-center bg-[#171B1F] text-white mt-3 py-2 px-4  rounded'>
                                    Reset Password
                                </button>
                            
                        </div>
                    </div>
                </div>
    )
}