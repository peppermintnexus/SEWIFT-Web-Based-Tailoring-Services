import React from 'react';
import EmployeeSidebar from '/src/components/EmployeeSidebar'
import EmployeeHeader from '/src/components/EmployeeHeader'
import JobOrderModal from '/src/components/JobOrderModal'

export default function AdminShopProfile() {
    return (
        <div className='min-h-screen relative'>
            <EmployeeHeader />
            
            <div className='w-fit h-fit grid grid-cols-5 bg-[#F7F7F7]'>
                <EmployeeSidebar />
                
                <div className='ml-1 h-full col-start-2 col-end-6'>
                    <h1 className='px-5 pt-3 text-2xl font-semibold'>Job Orders</h1>
                    <p className='px-5 text-[#7F7F7F]'>Your list of Job Orders is shown in this area</p>

                    <div className="mt-3  mx-5 h-[75vh] bg-[#fefefe] rounded-lg shadow overflow-y-auto">
                        <div className="p-4 space-y-4">
                            <div className=' flex'>
                                <a href="#" class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Ongoing
                                </a>
                                <a href="#" class="flex items-center justify-center px-3 h-8 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Finished
                                </a>
                            </div>

                            <ul className="space-y-2">
                                <JobOrderModal />
                            </ul>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}