import React from 'react'
import SewiftLogo from '/src/assets/images/SewiftLogo.png'
import ShopProfileIcon from '/src/assets/images/ShopProfileIcon.png'
import JobOrderIcon from '/src/assets/images/JobOrderIcon.png'
import EmployeesIcon from '/src/assets/images/EmployeesIcon.png'
import TransactionIcon from '/src/assets/images/TransactionIcon.png'
import UserIcon from '/src/assets/images/UserIcon.png'
import SettingsIcon from '/src/assets/images/SettingsIcon.png'
import LogoutIcon from '/src/assets/images/LogoutIcon.png'

export default function ClientProfile() {
    return (
        <div className='grid grid-cols-5 bg-[#F08650]'>
            <div className='bg-[#3f6e85] min-h-screen'>
                <div className='text-white'>
                    <h1 className='mx-10 mt-10 mb-14'>Logo</h1>
                    <div className='my-5 ml-7 grid grid-rows-3 gap'>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={UserIcon} />
                            <h1 className='pl-5'>Name sa admin</h1>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={ShopProfileIcon} />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Shop Profile</h1>
                            </a>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={JobOrderIcon} />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Job Orders</h1>
                            </a>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={EmployeesIcon} />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Employees</h1>
                            </a>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={TransactionIcon} />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Transaction History</h1>
                            </a>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={SettingsIcon} />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Settings</h1>
                            </a>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={LogoutIcon} />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Logout</h1>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-[#F0f0f0] col-span-4 text-[#6f6f6f] min-h-screen'>
                <div className='m-5 p-5 rounded-lg bg-[#f7f7f7]'>
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