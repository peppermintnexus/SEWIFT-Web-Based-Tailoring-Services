import React, { useState } from 'react';
import EmployeeSidebar from '/src/components/EmployeeSidebar';
import EmployeeHeader from '/src/components/EmployeeHeader';

export default function EmployeeJobOrder() {
    const [jobOrders, setJobOrders] = useState([]); // State for job orders

    const handleAccept = (status) => {
        console.log("Job order accepted with status:", status); // Debugging line
        setJobOrders([...jobOrders, { status }]);
    };

    return (
        <div className='bg-[#F7F7F7] min-h-screen relative'>
            <EmployeeHeader />
        
            <div className='flex'>
                <EmployeeSidebar />
        
                <div className="p-4 w-screen sm:w-full">
                    <div className="p-4 container w-full h-[98vh] sm:h-screen bg-[#FEFEFE]">
                        <h1 className='px-3 text-2xl font-medium'>Job Orders</h1>
                        <p className='px-3 text-[#7F7F7F]'>Your list of Job Orders is shown in this area</p>
        
                        <div className='mt-2 h-[75vh] sm:h-[83vh] bg-[#fefefe] overflow-y-auto'>
                            <div className="px-2 py-3 space-y-4">
                                <div className='flex'>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        Ongoing
                                    </a>
                                    <a href="#" className="flex items-center justify-center px-3 h-8 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        Finished
                                    </a>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}