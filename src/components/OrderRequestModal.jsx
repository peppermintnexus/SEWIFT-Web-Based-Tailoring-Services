import React from 'react'
import JobOrderModal from '/src/components/JobOrderModal'

export default function ClientProfile() {
    return (
        <div className='bg-[#FEFEFE]'>
            <div className='flex justify-between items-center'>
                <div className='w-full'>
                    <div className='border rounded-lg'>
                        <div className='pt-2 px-3'>
                            <p className='text-sm mb-2 text-[#7f7f7f] italic'>Accept this order?</p>
                            <JobOrderModal />
                        </div>
                        <div className="border-t mt-4" />
                            <div className='grid grid-cols-2 '>
                                <a href='/EmployeeJobOrder'>
                                    <div className='flex justify-center items-center pb-2 border-r pr-2 hover:bg-gray-100'>
                                        <svg className='mt-1.5 w-5 h-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#22B14C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </a>
                                <a href='#'>
                                    <div className='flex justify-center items-center pb-2 pr-2 hover:bg-gray-100'>
                                        <svg fill="#ED1C24" className='mt-1.5 w-5 h-5' viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                                            <title />
                                            <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/>
                                        </svg>
                                    </div>
                                </a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}