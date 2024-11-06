import React from 'react';
import EmployeeSidebar from '/src/components/EmployeeSidebar'
import JobOrderModal from '/src/components/JobOrderModal'

export default function AdminTransactionHistory() {
    return (
        <div className='grid grid-cols-5 bg-[#f7f7f7] min-h-screen'>
            <EmployeeSidebar />

            <div className='col-span-4 bg-[#f7f7f7] p-4'>
                    <div className=''>
                        <h1 className='font-semibold text-3xl px-5 py-5'>Transaction History</h1>

                        <div className='grid grid-cols-2 p-5'>
                        <div className='bg-[#fefefe] rounded-lg shadow-md p-3'>
                            <div className='flex justify-between items-center'>
                            <h1 className='font-semibold'>
                                JO Number 12345
                            </h1>
                            <JobOrderModal />
                            </div>
                            <hr className="border-t border-gray-200 my-3" />

                            <div className='flex items-center'>
                            <img src="https://via.placeholder.com/150"
                            alt="Placeholder"
                            className="w-32 h-32 object-cover rounded-lg shadow-md" />
                            
                            <div className='pl-4'>
                                <h1 className='font-semibold'>Product Name</h1>
                                <ol className='pt-4'>
                                    <li>Type of Order:</li>
                                    <li>Client Name:</li>
                                    <li>Order Date:</li>
                                </ol>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>  
            </div>
        </div>
    )
}