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
        
                        <div className='ml-2 px-2 py-5 col-start-2 col-end-6'>

                                <div className='flex justify-between col-start-2 col-end-6'>

                                    <div className='ml-4 flex'>
                                    <div class="items-center justify-center w-full">
                                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-48 h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                </svg>
                                                <p class="mb-2 text-xs text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p class="text-center text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                                <input id="dropzone-file" type="file" class="hidden" />
                                                </label>
                                          </div>

                                        <div className='ml-4'>
                                        <h1 className='text-xl font-medium'>Tailor Shop Name</h1>
                                        <p className='mb-2 text-sm text-[#9C9C9C]'>Rating</p>
                                        <p className='text-[#9C9C9C]'>Location</p>
                                        <p>Open Hours and Open Days</p>
                                        <p>Description</p>
                                        </div>
                                    </div>

                                    <div className='justify-self-end'>
                                        <a href='/AddProduct'>
                                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 ">Add Product</button>
                                        </a>
                                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 ">Edit</button>                                    
                                    </div>
                                </div>

                                <Divider />
                        </div>
                    </div>

                    
                </div>
    )
}