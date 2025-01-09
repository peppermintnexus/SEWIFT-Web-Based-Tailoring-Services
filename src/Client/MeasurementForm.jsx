import React from 'react'
import Header from '/src/components/Header.jsx'
import Textbox from '/src/components/Textbox.jsx'

export default function ClientLogin() {
    return (
        <div className='bg-[#10aeb2] min-h-screen'>
            <div>
                <Header />
            </div>

            <div className='bg-[#fefefe] rounded-lg mx-40 mt-10'>
                <h1 className='text-3xl font-semibold pt-4 pb-5 text-[#171B1F] text-center'>
                    Measurement Profile
                </h1>
            
            <div className='grid grid-cols-3 mx-12 gap-14'>
                <div className='grid grid-rows-9'>
                    <div className='flex pb-2 justify-between'>
                        <p>Shoulder</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Sleeve</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Circumference</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Figure</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Blouse Length</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Dress Length</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Blouse Bust</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Blouse Waist</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Blouse Hips</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                </div>

                <div className='grid grid-rows-9'>
                    <div className='flex pb-2 justify-between'>
                        <p>Front Chest</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Back Chest</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Bust Point</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Bust Distance</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Skirt Length</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Skirt Waist</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Skirt Hips</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Crotch</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Pants Length</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                </div>

                <div className='grid grid-rows-9'>
                    <div className='flex pb-2 justify-between'>
                        <p>Pants Waist</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Pants Hips</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Thigh</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Knee</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Ankle Flare</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Polo Length</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Polo Waist</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Polo Waist</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Blouse Bust</p>
                        <input className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                </div>
                </div>
                <div>
                    <div className='mt-7 pb-4 flex justify-center items-center'>
                        <a href='/ClientHomepage'>
                        <button className='mx-3 text-center font-semibold rounded-lg px-3 py-1 text-[#fefefe] bg-[#171B1F] hover:text-[#fefefe]'>
                            Submit
                        </button>
                        </a>  
                        <a href='/ClientHomepage'>
                        <button className='mx-3 text-center font-semibold rounded-lg px-3 py-1 text-[#fefefe] bg-[#171B1F] hover:text-[#fefefe]'>
                            Add Later
                        </button>
                        </a>
                    </div>
            </div>
            </div>
        </div>
    )
}
