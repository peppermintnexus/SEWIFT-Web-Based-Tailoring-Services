import React from 'react'
import AdminSidebar from '/src/components/AdminSidebar'
import ReportTimeline from '/src/components/ReportTimeline'

export default function AdminHomepage() {
    return (
        <div className='grid grid-cols-5 bg-[#f7f7f7] min-h-screen'>
                <AdminSidebar />

                <div className='m-5 col-span-4'>
                    <h1 className='p-5 text-2xl font-semibold bg-[#87b3c6] text-[#2b3a47] rounded-lg'>
                        Welcome to your dashboard
                    </h1>

                    <div className='mt-3 py-5 px-7 bg-[#fefefe] shadow'>
                        <h1 className='text-2xl font-semibold text-[#4a4a4a]'>Reports</h1>
                        <p>These are the recent activities this week</p>
                        <hr className="border-t border-gray-200 my-5" />
                        <ReportTimeline />
                    </div>
                </div>
        </div>
    )
}