import React from 'react';
import AdminSidebar from '/src/components/AdminSidebar'
import AdminHeader from '/src/components/AdminHeader'
import JobOrderModal from '/src/components/JobOrderModal'

export default function AdminShopProfile() {
    return (
        <div className='bg-[#F7F7F7] min-h-screen relative'>
                    <AdminHeader />
                
                    <div className='flex'>
                        <AdminSidebar />
                
                        <div className="p-4 flex-1 w-full">
                            <div className="p-4 container w-full h-[98vh] sm:h-screen bg-[#FEFEFE]">
                                <h1 className='px-3 text-2xl font-medium'>Transaction History</h1>
                                <p className='px-3 text-[#7F7F7F]'>All successful transaction with clients will be shown in this area</p>

                                <div className="px-2 py-1 sm:py-3 space-y-4">
                <div className='flex flex-wrap '>
                    <a href="#" className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Today
                    </a>
                    <a href="#" className="flex items-center justify-center px-3 h-8 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        This Week
                    </a>
                    <a href="#" className="flex items-center justify-center px-3 h-8 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Month
                    </a>
                    <a href="#" className="flex items-center justify-center px-3 h-8 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Year
                    </a>
                </div>
        
                                <div className='mt-2 h-[75vh] sm:h-[83vh] bg-[#fefefe] overflow-y-auto'>
                                
                                                                <div>
                                                                <ul className="space-y-2">
                                                                    <JobOrderModal />
                                                                    <JobOrderModal />
                                                                    <JobOrderModal />
                                                                    <JobOrderModal />
                                                                    <JobOrderModal />
                                                                    <JobOrderModal />
                                                                    <JobOrderModal />
                                                                    <JobOrderModal />
                                                                    <JobOrderModal />
                                                                    <JobOrderModal />
                                                                    <JobOrderModal />
                                                                    <JobOrderModal />
                                                                    
                                                                </ul>
                                                                </div>
                                                    
                                                            </div> 
                                                        </div>
                
                                
                            </div>
                        </div>
                    </div>
                </div>
    )
}