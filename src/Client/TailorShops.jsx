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
                <div className='mx-10 my-5 grid-cols-2 grid grid-flow-row auto-rows-max gap-5'>
                    <div className='grid grid-cols-4 shadow px-2 py-4'>
                        <div className='place-self-center'>
                            image
                        </div>
                        <div className='grid-rows-2 col-span-2'>
                            <div className='font-semibold text-lg pb-5'>Tailor Shop Name</div>
                            <div className='grid grid-rows-3 text-[#9ca3af]'>
                                <div>Email:</div>
                                <div>Contact:</div>
                                <div>Location:</div>
                            </div>
                        </div>
                        <div className=''>
                            <h1 className='pb-2'>Ratings (5)</h1>
                            <button className='text-center font-semibold rounded-lg px-3 py-1 text-[#fefefe] bg-[#10aeb2] hover:text-[#fefefe] hover:shadow-md'>
                                View Profile
                            </button>
                        </div>
                    </div>
                    
            </div>
        </div>
        </div>
    )
}
