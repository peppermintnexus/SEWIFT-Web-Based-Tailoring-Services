import React from 'react'

export default function ClientProfile() {
    return (
        <div className='bg-[#f5f5f5] min-h-screen'>

            <div className='pt-10 mx-32'>
                <div className='bg-[#fefefe] shadow rounded-lg'>

                    <div className='grid grid-cols-4 flex'>
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
                        <div className='bg-[#fefefe] col-span-3 p-4'>
                            <h1 className='text-3xl font-semibold mb-5'>
                                My Profile
                            </h1>
                            <div className='grid grid-cols-2'>
                            <h1 className='mb-1'>
                                Name
                            </h1>
                            <h1>
                                Phone
                            </h1>
                            <h1 className='mb-4'>
                                Complete Address
                            </h1>
                            </div>

                            <h1 className='text-xl font-semibold mb-2'>
                                Measurement Profile
                            </h1>
                            
                            <div className='grid grid-cols-3'>
                                <div className='grid grid-rows-9'>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Shoulder</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Sleeve</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Circumference</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Figure</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Blouse Length</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Dress Length</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Blouse Bust</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Blouse Waist</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Blouse Hips</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                </div>

                                <div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Front Chest</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Back Chest</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Bust Point</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Bust Distance</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Skirt Length</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Skirt Waist</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Skirt Hips</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Crotch</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Pants Length</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                </div>

                                <div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Thigh</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Knee</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Ankle Flare</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Polo Length</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Polo Waist</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Polo Hips</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Blouse Bust</p>
                                    <input className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
