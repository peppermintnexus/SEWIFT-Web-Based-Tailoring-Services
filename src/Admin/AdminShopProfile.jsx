import React from 'react';
import AdminSidebar from '/src/components/AdminSidebar'
import AdminHeader from '/src/components/AdminHeader'
import Sample from '/src/assets/images/Sample.jpg'
import Upload from '/src/components/Upload'
import Input from '/src/components/Input'
import Ratings from '/src/components/Ratings'
import { Divider } from 'antd';
import SchoolSkirt from '/src/assets/images/SchoolSkirt.jpg'

export default function AdminShopProfile() {
    return (
        <div className='bg-[#F7F7F7] min-h-screen relative'>
                    <AdminHeader />
        
                    <div className='grid grid-cols-5 bg-[#Fefefe]'>
                        <AdminSidebar />
        
                        <div className='ml-2 p-5 col-start-2 col-end-6'>

                                <div className='flex justify-between col-start-2 col-end-6'>

                                    <div className='ml-4 flex'>
                                    <img class="object-cover h-40 w-40" src={Sample} alt="image description" />
                                        <div className='ml-4'>
                                        <h1 className='text-xl font-medium'>Tailor Shop Name</h1>
                                        <p className='mb-2 text-sm text-[#9C9C9C]'>Rating</p>
                                        <p className='text-[#9C9C9C]'>Location</p>
                                        <p>Open Hours and Open Days</p>
                                        <p>Description</p>
                                        </div>
                                    </div>

                                    <div className='justify-self-end'>
                                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 ">Add Product</button>
                                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 ">Edit</button>                                    
                                    </div>
                                </div>

                                <Divider />
                        </div>
                    </div>

                    
                </div>
    )
}