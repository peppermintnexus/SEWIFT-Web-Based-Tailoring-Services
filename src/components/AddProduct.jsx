import React from 'react'

export default function ClientProfile() {
    return (
        <div className='bg-[#fefefe] min-h-screen'>
            <div className='h-full'>
            <div className='pl-4 py-2 flex items-center gap-5'>
            <a href='/EmployeeHomepage'>
            <svg fill="#000000" className='w-12 h-12 hover:bg-[#f7f7f7] py-2 pr-1 rounded-full' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g data-name="arrow left" id="arrow_left">
                <path class="cls-1" d="M22,29.73a1,1,0,0,1-.71-.29L9.93,18.12a3,3,0,0,1,0-4.24L21.24,2.56A1,1,0,1,1,22.66,4L11.34,15.29a1,1,0,0,0,0,1.42L22.66,28a1,1,0,0,1,0,1.42A1,1,0,0,1,22,29.73Z"/>
            </g>
            </svg>
            </a>
                <h1 className='text-xl'>New Product</h1>
            </div>

            <div className='bg-[#EBEBEB] px-10 py-7'>
                <div className='grid grid-cols-2 gap-3'>
                    <div className='space-y-1 p-4 bg-[#fefefe]'>
                        <p>Name</p>
                        <input className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

                        <p>Category</p>
                        <input className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

                        <p>Description</p>
                            <textarea id="message" rows="4" class="block px-1.5 py-1 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder="Apparel description"></textarea>


                    </div>
                    <div className='space-y-1 p-4 bg-[#fefefe]'>
                        <p>Status</p>
                        <input className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                </div>

                <div className='bg-[#fefefe] space-y-1 p-4 mt-3'>
                    <p className='text-xl mb-3 font-medium'>Properties</p>
                    
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='space-y-1'>
                            <p>Price</p>
                            <input className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

                            <p>Size</p>
                            <input className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </div>

                        <div className='space-y-1'>
                            <p>Stock</p>
                            <input className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

                            <div className='grid justify-items-end pt-6'>
                            <button 
                            type="button" 
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}