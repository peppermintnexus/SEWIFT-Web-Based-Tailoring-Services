import React from 'react';
import EmployeeSidebar from '/src/components/EmployeeSidebar'
import EmployeeHeader from '/src/components/EmployeeHeader'
import JobOrderModal from '/src/components/JobOrderModal'

export default function AdminTransactionHistory() {
    return (
        <div className='min-h-screen relative'>
                    <EmployeeHeader />
                    
                    <div className='w-fit h-fit grid grid-cols-5 bg-[#F7F7F7]'>
                        <EmployeeSidebar />
                            
                        <div className='ml-2 p-3 col-start-2 col-end-6'>
                            <h1 className='text-xl font-medium'>Welcome to your Dashboard</h1>
                            <p className='text-[#7F7F7F]'>Recent reports and activities will be shown in this area</p>
                        </div>
                    </div>
                </div>
    )
}