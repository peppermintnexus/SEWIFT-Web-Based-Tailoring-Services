import React from 'react';
import AdminNav from '/src/components/AdminNav'
import Upload from '/src/components/Upload'
import Input from '/src/components/Input'

export default function AdminShopProfile() {
    return (
        <div className='grid grid-cols-4 bg-[#3f6e85]'>
            <AdminNav />

            <div className='col-span-3 bg-[#f0f0f0]'>
                <div className='m-5 p-5 bg-[#fefefe] shadow'>
                    <div className='flex items-center justify-between'>
                        <div className='relative flex'>
                            <Upload />
                        <div className='mx-3'>
                            <h1 className='text-lg font-semibold'>Tailor Shop Name</h1>
                            <p>Working Hours</p>
                            <p>Open from Monday - Friday</p>
                            <p>Complete Address</p>
                            <Input />
                        </div>
                        </div>

                        <div className='flex justify-end'>
                            <button>
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className='mt-10 flex block max-w-xs p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
                        <div>
                            <Upload />
                        </div>
                        <div className='pl-2'>
                            <h1 className='text-lg font-semibold'>Product Name</h1>
                            <p>Description</p>
                            <p>Size</p>
                            <p>Price</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}