import React from 'react'
import AdminNav from '/src/components/AdminNav'

export default function ClientProfile() {
    return (
        <div className='grid grid-cols-5 bg-[#3f6e85]'>
                <AdminNav />

            <div className='bg-[#F0f0f0] col-span-4 text-[#6f6f6f]'>
                <div className='m-5 p-5 rounded-lg bg-[#fefefe]'>
                    <div className='bg-[#9fc2cb] mb-5 rounded-lg'>
                        <h1 className='p-3 text-[#fefefe] font-semibold text-lg'>Welcome to your dashboard</h1>
                    </div>
                    <h1 className='pb-1 text-3xl font-semibold'>Reports</h1>
                    <p className='pb-4'>These are the recent activities this week</p>
                    
                    <ol class="relative border-s border-gray-200 dark:border-gray-700">                  
                        <li class="mb-10 ms-4">
                            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Month & Year</time>
                            <h3 class="text-lg font-semibold text-[#2b3a47] dark:text-white">Monica Zerrudo accepted order number 12345</h3>
                            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Date and time</p>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}