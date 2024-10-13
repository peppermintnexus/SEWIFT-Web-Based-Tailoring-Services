import React from 'react'
import SewiftLogo from '/src/assets/images/SewiftLogo.png'
import ShopProfileIcon from '/src/assets/images/ShopProfileIcon.png'
import JobOrderIcon from '/src/assets/images/JobOrderIcon.png'
import EmployeesIcon from '/src/assets/images/EmployeesIcon.png'
import TransactionIcon from '/src/assets/images/TransactionIcon.png'
import UserIcon from '/src/assets/images/UserIcon.png'
import SettingsIcon from '/src/assets/images/SettingsIcon.png'
import LogoutIcon from '/src/assets/images/LogoutIcon.png'

export default function AdminNav() {
    return (
        <div>
            <div className='bg-[#3f6e85] h-screen'>
                <div className='text-white'>
                    <h1 className='mx-10 mt-10 mb-14'>Logo</h1>
                    <div className='my-5 ml-7 grid grid-rows-3 gap'>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={UserIcon} />
                            <h1 className='pl-5'>Name sa admin</h1>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={ShopProfileIcon} />
                            <a href='/AdminShopProfile'>
                            <h1 className='pl-5 hover:underline font-medium'>Shop Profile</h1>
                            </a>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={JobOrderIcon} />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Job Orders</h1>
                            </a>
                        </div>
                        <div className='flex mb-8 items-center'>
                            <img className='w-5 h-5' src={EmployeesIcon} />
                            <a href='/'>
                            <h1 className='pl-5 hover:underline font-medium'>Employees</h1>
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


        </div>
    )
}