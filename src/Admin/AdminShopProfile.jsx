import React from 'react';
import AdminSidebar from '/src/components/AdminSidebar'
import AdminHeader from '/src/components/AdminHeader'
import Explore from '/src/assets/images/Explore.png'
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
        
                        <div className='mx-3 p-2 my-1 col-start-2 col-end-6'>
                            <div className='flex'>
                            <img class="h-40 w-40" src={Explore} alt="image description" />
                            <div className='pl-3'>
                                <p className='pt-1 font-semibold text-xl'>Tailor Shop Name</p>
                                <p>Working Hours and Days</p>
                                <p>Complete Address</p>
                                <p>Description</p>
                            </div>
                            </div>

                            <Divider />

                            <div className='grid grid-cols-4'>
                                <div className='w-56 h-56 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                                    <img src={SchoolSkirt} className='object-cover mb-2 rounded-lg w-full h-full' />
                                    <p className='font-bold'>Liceo SHS Uniform Skirt</p>
                                    <p className='text-[#867E7B]'>Size: S, M, L, XL</p>
                                    <p className='mb-2 font-medium'>Price</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
    )
}