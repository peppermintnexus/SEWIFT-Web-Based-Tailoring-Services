import React from 'react'
import SewiftLogo from '/src/assets/images/SewiftLogo.png'
import UserIcon from '/src/assets/svg/UserIcon.svg'
import SettingsIcon from '/src/assets/svg/SettingsIcon.svg'
import LogoutIcon from '/src/assets/svg/LogoutIcon.svg'

export default function ClientProfile() {
    return (
        <div className='grid grid-cols-5'>
            <div className='bg-[#F08650] min-h-screen'>
                <div className='text-white'>
                    <h1 className='mx-10 mt-10 mb-14'>Logo</h1>
                    <div className=' m-5 grid grid-rows-3 gap'>
                        <div className='flex mb-6'>
                            <img className='w-6 h-6' src={UserIcon} />
                            <h1 className='pl-5'>Name sa shop</h1>
                        </div>
                        <div className='flex mb-6'>
                            <img className='w-6 h-6' src={SettingsIcon} />
                            <h1 className='pl-5'>Settings</h1>
                        </div>
                        <div className='flex mb-6'>
                            <img className='w-6 h-6' src={LogoutIcon} />
                            <h1 className='pl-5'>Logout</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-[#F7F7F7] col-span-4 text-[#6f6f6f]'>
                <div className='bg-[#fefefe] m-5 rounded-lg shadow'>
                    <h1 className='p-5 text-3xl font-semibold'>
                        Welcome to your homepage!
                    </h1>
                    <p className='px-5'>
                        What will be your agenda today?
                    </p>
                </div>
            </div>
        </div>
    )
}