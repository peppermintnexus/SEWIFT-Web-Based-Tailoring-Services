import React, { useState } from 'react';
import LogoWhite from '/src/assets/images/LogoWhite.png'
import UserProfile from '/src/assets/images/UserProfile.png'
import ClientProfile from '/src/Client/ClientProfile.jsx'

export default function ClientHeader() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };
    
    return (
        <div className='flex justify-between items-center h-24 max-w-screen-xl px-10 mx-auto bg-[#d9edf4] text-[#6f6f6f] relative'>
            <img src={LogoWhite} className='sm:w-16 md:w-20' />

        <div className='relative mr-5'>
            <button
            onClick={toggleDropdown} 
            className='flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"'
            type="button"
            >

            <span className='sr-only'>Open user menu</span>
            <img src={UserProfile} className=' w-10 h-10 rounded-full' />
            </button>

            {isDropdownVisible && (
            <div className='absolute right-0 mt-3 z-10 bg-white rounded-lg shadow w-36 dark:bg-gray-700 dark:divide-gray-600'>
                <div class="px-4 pt-3">
                <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
        </div>
                <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownUser'>
                    <li>
                        <a href='/ClientProfile' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>My Profile</a>
                    </li>
                    <li>
                        <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Settings</a>
                    </li>
                    <li>
                        <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Log out</a>
                    </li>
                </ul>
            </div>
            )}
        </div>
        </div>
    )
}
