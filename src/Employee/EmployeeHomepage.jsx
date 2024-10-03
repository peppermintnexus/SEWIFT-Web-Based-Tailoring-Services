import React from 'react'
import SewiftLogo from '/src/assets/images/SewiftLogo.png'
import UserIcon from '/src/assets/images/UserIcon.png'
import SettingsIcon from '/src/assets/images/SettingsIcon.png'
import LogoutIcon from '/src/assets/images/LogoutIcon.png'

export default function ClientProfile() {
    return (
        <div className='grid grid-cols-5 bg-[#F08650]'>
            <div className='bg-[#F08650] min-h-screen'>
                <div className='text-white'>
                    <h1 className='mx-10 mt-10 mb-14'>Logo</h1>
                    <div className='my-5 ml-7 grid grid-rows-3 gap'>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={UserIcon} />
                            <h1 className='pl-5'>Name sa shop</h1>
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

            <div className='bg-[#F7F7F7] col-span-4 text-[#6f6f6f]'>
                <div className='bg-[#fefefe] mb-5 m-5 rounded-lg'>
                    <h1 className='p-5 text-3xl font-semibold'>
                        Welcome to your homepage!
                    </h1>
                    <p className='px-5'>
                        What will be your agenda today?
                    </p>

                    <div className='mx-5 mt-10 pb-10 grid grid-cols-4 gap-5'>
                        <a href="#" className="flex flex-col h-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Order Request
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Check recent client order requests
                        </p>
                        </a>
                        
                        <a href="#" className="flex flex-col h-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Job Orders
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Check out job orders
                        </p>
                        </a>

                        <a href="#" className="flex flex-col h-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Transaction History
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            View transaction history
                        </p>
                        </a>

                        <a href="#" className="flex flex-col h-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Shop Profile
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Edit your shop's profile
                        </p>
                        </a>
                    </div>
                </div>
                </div>
            </div>
            

    )
}