import React from 'react';
import EmployeeSidebar from '/src/components/EmployeeSidebar'
import Upload from '/src/components/Upload'
import Input from '/src/components/Input'
import Ratings from '/src/components/Ratings'

export default function AdminShopProfile() {
    return (
        <div className='grid grid-cols-5 bg-[#fefefe] min-h-screen'>
            <EmployeeSidebar />
            
            <div className='col-span-4 pt-5 px-5 relative'>
                <button className="absolute top-5 right-5 bg-[#3f6e85] text-white px-4 py-2 rounded">Edit</button>

                <div className='flex'>
                    <Upload className="w-48 h-48" />
                    <div className='pl-3'>
                        <div className='flex items-center'>
                            <h1 className='text-lg font-semibold'>Tailor Shop Name</h1>
                            <span className='ml-2'><Ratings /></span>
                        </div>
                    <div>
                        <p>Working Hours</p>
                        <p>Working Days</p>
                        <p>Complete Address</p>
                    </div>
                    <Input />
                    </div>
                </div>
                    <hr className="border-t border-gray-200 mt-10" />

                    <div class="mt-4 max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="rounded-t-lg h-32 w-full object-cover" src="/docs/images/blog/image-1.jpg" alt="" /> 
                        </a>
                        <div class="p-3">
                                <h5 class="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Product Name</h5> 
                            <ol class="mb-5 font-normal text-gray-700 dark:text-gray-400">
                                <p>Size</p>
                                <p>Description</p>
                            </ol> 
                            <a className='py-1 px-3 bg-[#3f6e85] rounded-lg text-white'>Price</a>
                        </div>
                    </div>

            </div>
        </div>
    )
}