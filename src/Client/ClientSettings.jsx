import React from 'react'

export default function ClientProfile() {
    return (
        <div className='bg-[#d9edf4] min-h-screen'>

            <div className='pt-10 mx-32'>
                <div className='bg-[#fefefe] shadow-lg rounded-lg'>

                    <div className='grid grid-cols-4 flex text-[#fefefe]'>
                        <div className='bg-[#6793a8] px-4 py-10'>
                            <a href='/ClientProfile'>
                            <h1 className='text-lg font-medium hover:underline mb-5'>
                                Profile
                            </h1>
                            </a>
                            <a href='#'>
                            <h1 className='text-lg font-medium underline mb-60'>
                                Settings
                            </h1>
                            </a>
                            <a href='/'>
                            <h1 className='text-lg font-medium hover:underline'>
                                Log out
                            </h1>
                            </a>
                        </div>

                        <div className='bg-[#fefefe] col-span-3 p-4 text-[#6f6f6f]'>
                            <h1 className='text-3xl font-semibold mb-5'>
                                Settings
                            </h1>
                            <div className='grid grid-rows-2'>
                            <div>
                                <h1 className='ml-3 text-lg mb-1'>
                                    Name
                                </h1>
                                <input className="ml-3 text-left w-xl h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div>
                                <h1 className='ml-3 text-lg mb-1'>
                                    Email
                                </h1>
                                <input className="ml-3 text-left w-xl h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                        </div>

                        <h1 className='text-xl font-semibold mb-2'>
                                Change Password
                        </h1>

                        <div className='ml-3 pb-2'>
                            <h1>
                                Current Password
                            </h1>
                            <input className="text-left w-xl h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            <h1 className='text-xs mb-6 italic'>
                                *Password must be more than eight characters*
                            </h1>
                            <h1>
                                Confirm Password
                            </h1>
                            <input className="mb-10text-left w-xl h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <button className='bg-[#6793a8]'>
                            Save
                        </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
