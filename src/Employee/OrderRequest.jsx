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
                        <h1 className='text-2xl font-medium'>Order Request</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}