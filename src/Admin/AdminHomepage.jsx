import React, { useState } from 'react';
import AdminSidebar from '/src/components/AdminSidebar'
import AdminHeader from '/src/components/AdminHeader'
import ReportTimeline from '/src/components/ReportTimeline'
import { useNavigate } from 'react-router';

export default function AdminHomepage() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
        const navigate = useNavigate();
    
        const toggleDropdown = () => {
            setIsDropdownVisible(!isDropdownVisible);
        };

    return (
        <div className='bg-[#F7F7F7] min-h-screen relative'>
            <AdminHeader />

            <div className='grid grid-cols-5 bg-[#F7F7F7]'>
                <AdminSidebar />

                <div className='ml-2 p-3 col-start-2 col-end-6'>
                    <h1 className='text-xl font-medium'>Welcome to your Dashboard</h1>
                    <p className='text-[#7F7F7F]'>Recent reports and activities will be shown in this area</p>

                    <div className='mt-3 relative inline-block grid grid-cols-2'>
                        <div className='mt-3 flex'>
                            <a href="#" class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Previous
                            </a>
                            <a href="#" class="flex items-center justify-center px-3 h-8 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Next
                            </a>
                        </div>

                        <div className='flex justify-end'>
                            <button 
                            onClick={toggleDropdown} 
                            className="text-white bg-[#10aeb2] hover:bg-[#10aeb2] font-medium rounded-lg text-sm px-5 py-2 my-2 text-center inline-flex items-center" 
                            type="button">Sort by <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                            </button>
                            
                            {isDropdownVisible && (
                                <div id="dropdown" class="absolute top-full mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All</a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">This week</a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Previous Week</a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Month</a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Year</a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                        
                        <div className="w-full h-96 bg-[#fefefe] rounded-lg shadow overflow-y-auto">
                            <div className="p-5 space-y-4">
                                <ReportTimeline />
                                <ReportTimeline />
                                <ReportTimeline />
                                <ReportTimeline />
                                <ReportTimeline />
                                <ReportTimeline />
                            </div> 
                        </div>
                </div>
            </div>
        </div>
    )
}