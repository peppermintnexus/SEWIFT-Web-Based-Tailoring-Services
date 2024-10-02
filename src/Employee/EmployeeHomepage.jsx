import React from 'react'
import SewiftLogo from '/src/assets/images/SewiftLogo.png'

export default function ClientProfile() {
    return (
        <div className='grid grid-cols-5 min-h-screen'>
            <div className='grid grid-rows-2 bg-[#ffc696]'>
                <div className=' flex flex-col items-center'>
                    <img className='w-14 h-14 mt-4 mb-4' src={SewiftLogo} />
                    <h1>Name</h1>
                    <h1>Tailor Shop</h1>
                </div>
                <div className='pt-52'>
                    <a href='#'>
                        <h1 className='mx-5 hover:underline text-lg'>
                            Settings
                        </h1>
                    </a>
                    <a href='#'>
                        <h1 className='mx-5 hover:underline text-lg'>
                            Log out
                        </h1>
                    </a>
                </div>

            </div>
            <div className='col-span-4 bg-[#fefefe] p-5 text-[#6f6f6f]'>
                <h1 className='text-4xl font-bold mb-7'>
                    Welcome to your homepage!
                </h1>
                <h1 className='text-lg'>
                    What will be your agenda today?
                </h1>
            </div>
        </div>
    )
}