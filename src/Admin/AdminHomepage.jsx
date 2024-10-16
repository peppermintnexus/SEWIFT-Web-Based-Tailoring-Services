import React from 'react'
import AdminNav from '/src/components/AdminNav'
import ReportTimeline from '/src/components/ReportTimeline'

export default function ClientProfile() {
    return (
        <div className='grid grid-cols-5 bg-[#3f6e85]'>
                <AdminNav />

            <div className='bg-[#F0f0f0] col-span-4 text-[#6f6f6f]'>
                <div className='m-5 p-5 rounded-lg bg-[#fefefe]'>
                    <div className='bg-[#9fc2cb] mb-5 rounded-lg'>
                        <h1 className='p-3 text-[#fefefe] font-semibold text-lg'>Welcome to your dashboard</h1>
                    </div>
                    <h1 className='pb-1 text-3xl font-semibold'>Reports</h1>
                    <p className='pb-4'>These are the recent activities this week</p>
                    
                    <ReportTimeline />
                </div>
            </div>
        </div>
    )
}