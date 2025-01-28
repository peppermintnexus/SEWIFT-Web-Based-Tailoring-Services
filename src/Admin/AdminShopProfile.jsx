import React from 'react';
import AdminSidebar from '/src/components/AdminSidebar'
import AdminHeader from '/src/components/AdminHeader'
import ProductModal from '../components/ProductModal'


export default function AdminShopProfile() {
    return (
        <div className='bg-[#FEFEFE] min-h-screen relative'>
                    <AdminHeader />
                
                    <div className='flex'>
                        <AdminSidebar />
        
                        <div className="p-4 flex-1 w-full">
                            <div className="container w-full h-[98vh] sm:h-screen bg-[#FEFEFE]">
                            <div className='grid grid-cols-2'>
                            <div className='flex gap-3'>
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
                                <div className='pt-2'>
                                    <label className='pt-2 text-xl font-medium'>Tailor Shop Name</label>
                                    <p className='mb-2 text-sm text-[#9C9C9C]'>Rating</p>
                                    <label className='block font-normal text-gray-700 dark:text-gray-400'>Location</label>
                                    <label className='block font-normal text-gray-700 dark:text-gray-400'>Opening hours and days</label>
                                    <label className='block font-normal text-gray-700 dark:text-gray-400'>Description</label>
                                </div>
                            </div>
                            <div className='flex items-start justify-self-end'>
                                <a href='/AddProduct'>
                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 ">
                                <svg className='w-5 h-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12H18M12 6V18" stroke="#fefefe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                </button>
                                </a>
                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 ">Edit
                                </button>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 mt-4 mb-4" />
                        <div className='grid gap-3 grid-cols-2'>
                            <ProductModal />
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}