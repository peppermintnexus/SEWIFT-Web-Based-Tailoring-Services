import React from 'react'
import EmployeeSidebar from '/src/components/EmployeeSidebar'
import EmployeeHeader from '/src/components/EmployeeHeader'

export default function ClientProfile() {
    return (
        <div className='min-h-screen relative'>
            <EmployeeHeader />
            
            <div className='w-fit h-fit grid grid-cols-5 bg-[#F7F7F7]'>
                <EmployeeSidebar />
                    
                <div className='ml-2 p-3 col-start-2 col-end-6'>
                    <div className='h-full bg-[#fefefe] p-5'>
                        <h1 className='text-2xl font-medium'>Welcome to your Dashboard</h1>
                        <p className='text-[#7F7F7F]'>What will be your agenda today?</p>

                        <div className='px- mt-10 grid grid-cols-4 gap-5'>
                            <a href="/OrderRequest" className="flex flex-col h-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="pb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Order Request
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Check recent client order requests
                            </p>
                            </a>

                            <a href="/OrderRequest" className="flex flex-col h-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="pb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Add Product
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Add a new product to your shop
                            </p>
                            </a>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}