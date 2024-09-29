import React from 'react'

export default function ClientProfile() {
    return (
        <div className='bg-[#f5f5f5] min-h-screen'>

            <div className='pt-10 mx-32'>
                <div className='bg-[#fefefe] shadow rounded-lg'>
                    <h1 className='text-3xl font-semibold p-3'>
                        My Profile
                    </h1>

                    <div className='grid grid-cols-4'>
                        <div className='bg-[#d9edf4] px-4 py-10'>
                            <a href='/ClientProfile'>
                            <h1 className='text-lg font-medium underline mb-5'>
                                Profile
                            </h1>
                            </a>
                            <a href='#'>
                            <h1 className='text-lg font-medium hover:underline mb-60'>
                                Settings
                            </h1>
                            </a>
                            <a href='/'>
                            <h1 className='text-lg font-medium hover:underline'>
                                Log out
                            </h1>
                            </a>
                        </div>
                        <div className='bg-[#fefefe] col-span-3'>
                            <h1>
                                Hello
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
