import React from 'react'
import ClientHeader from '/src/components/ClientHeader.jsx'

export default function TailorShops() {
    return (
        <div className='bg-[#d9edf4] pb-3 min-h-screen'>
            <div>
            <ClientHeader />
            </div>

            <div className='bg-[#fefefe] my-3 mx-10 min-h-screen rounded-lg'>
                <h2 className='text-4xl font-semibold p-5'>
                    Tailor Shops
                </h2>
                <div className='grid grid-cols-2'>
                </div>
            </div>
        </div>
    )
}
