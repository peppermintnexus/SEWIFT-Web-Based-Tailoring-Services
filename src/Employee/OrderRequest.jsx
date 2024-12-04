import React from 'react'
import LogoWhite from '/src/assets/images/LogoWhite.png'
import UserIcon from '/src/assets/images/UserIcon.png'
import SettingsIcon from '/src/assets/images/SettingsIcon.png'
import LogoutIcon from '/src/assets/images/LogoutIcon.png'
import JobOrderIcon from '/src/assets/images/JobOrderIcon.png'
import ShopProfileIcon from '/src/assets/images/ShopProfileIcon.png'
import TransactionIcon from '/src/assets/images/TransactionIcon.png'

export default function ClientProfile() {
    return (
        <div className='grid grid-cols-5 bg-[#F08650]'>
            <div className='bg-[#F08650] min-h-screen'>
                <div className='text-white'>
                    <h1 className='mx-10 mt-10 mb-14'>Logo</h1>
                    <div className='my-5 ml-7 grid grid-rows-3 gap'>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={UserIcon} />
                            <h1 className='pl-5'>Name sa shop</h1>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Order Requests</h1>
                            </a>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={JobOrderIcon} />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Job Orders</h1>
                            </a>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={ShopProfileIcon} />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Shop Profile</h1>
                            </a>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={TransactionIcon} />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Transaction History</h1>
                            </a>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={SettingsIcon} />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Settings</h1>
                            </a>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={LogoutIcon} />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Logout</h1>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-[#F7F7F7] col-span-4 text-[#6f6f6f]'>
                <div className='bg-[#fefefe] m-5 rounded-lg min-h-screen'>
                    <h1>Order Request</h1>
                </div>
                </div>
            </div>
            

    )
}