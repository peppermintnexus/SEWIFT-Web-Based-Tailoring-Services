import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function ClientProfile() {
    const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] = useState(false);
    const [isStatusDropdownVisible, setIsStatusDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const toggleCategoryDropdown = () => {
        setIsCategoryDropdownVisible(!isCategoryDropdownVisible);
        setIsStatusDropdownVisible(false);
    };

    const toggleStatusDropdown = () => {
        setIsStatusDropdownVisible(!isStatusDropdownVisible);
        setIsCategoryDropdownVisible(false);
    };

    return (
        <div className='bg-[#fefefe] min-h-screen'>
            <div className='h-full'>
                <div className='pl-4 py-2 flex items-center gap-5'>
                    <a href='/AdminShopProfile'>
                        <svg fill="#000000" className='w-12 h-12 hover:bg-[#f7f7f7] py-2 pr-1 rounded-full' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <g data-name="arrow left" id="arrow_left">
                                <path className="cls-1" d="M22,29.73a1,1,0,0,1-.71-.29L9.93,18.12a3,3,0,0,1,0-4.24L21.24,2.56A1,1,0,1,1,22.66,4L11.34,15.29a1,1,0,0,0,0,1.42L22.66,28a1,1,0,0,1,0,1.42A1,1,0,0,1,22,29.73Z"/>
                            </g>
                        </svg>
                    </a>
                    <h1 className='text-xl'>Edit Product</h1>
                </div>

                <div className='bg-[#EBEBEB] px-10 py-7'>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='space-y-1 p-4 bg-[#fefefe]'>
                            <p>Name</p>
                            <input className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

                            <div className='space-y-1 bg-[#fefefe]'>
                                <p>Category</p>
                                
                                <div className="relative">
                                    <button 
                                    onClick={toggleCategoryDropdown}
                                    className="w-full text-gray-400 bg-gray-50 border border-gray-300 text-sm px-3 py-1.5 justify-between text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700" 
                                    type="button"
                                    aria-expanded={isCategoryDropdownVisible}
                                    >
                                        - 
                                    <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                    </button>
                                    
                                    {isCategoryDropdownVisible && (
                                        <div id="dropdown" className="absolute top-full mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                <li>
                                                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Blouse</a>
                                                </li>
                                                <li>
                                                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Skirt</a>
                                                </li>
                                                <li>
                                                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pants</a>
                                                </li>
                                                <li>
                                                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Blazer</a>
                                                </li>
                                                <li>
                                                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Shirt</a>
                                                </li>
                                            </ul>
                                        </div>
                                     )}
                                </div>
                            </div>

                            <p>Description</p>
                            <textarea id="message" rows="4" className="block px-1.5 py-1 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder="Enter description here..."></textarea>
                        </div>

                        <div className='px-4 py-2 space-y-1 bg-[#fefefe]'>
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
                    </div>

                    <div className='bg-[#fefefe] space-y-1 p-4 mt-3'>
                        <p className='text-xl mb-3 font-medium'>Properties</p>
                        
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='space-y-1'>
                                <p>Price</p>
                                <input className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

                                <p>Available Sizes</p>
                                <input className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </div>

                            <div className='space-y-1'>
                            <p>Status</p>
                                
                                <div className="relative">
                                    <button 
                                    onClick={toggleStatusDropdown}
                                    className="w-full text-gray-400 bg-gray-50 border border-gray-300 text-sm px-3 py-1.5 justify-between text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700" 
                                    type="button"
                                    aria-expanded={isStatusDropdownVisible}
                                    >
                                        - 
                                    <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                    </button>
                                    
                                    {isStatusDropdownVisible && (
                                        <div id="dropdown" className="absolute top-full mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                <li>
                                                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Available</a>
                                                </li>
                                                <li>
                                                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Not Available</a>
                                                </li>
                                            </ul>
                                        </div>
                                     )}
                                </div>

                                <div className='grid justify-items-end pt-6'>
                                    <a href='/AdminShopProfile'>
                                    <button 
                                        type="button" 
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}