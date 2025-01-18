import React, { useState } from 'react';
import LogoWhite from '/src/assets/images/LogoWhite.png'
import UserProfile from '/src/assets/images/UserProfile.png'
import ClientProfile from '/src/Client/ClientProfile.jsx'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'
import { useNavigate } from 'react-router';

export default function ClientHeader({ userName }) {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/ClientLogin');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    
    return (
        <div className='flex justify-between items-center h-24 max-w-screen-xl px-10 mx-auto  bg-[#171B1F] text-[#6f6f6f] relative'>
            <a href='/ClientHomepage'>
            <img src={LogoWhite} className='sm:w-16 md:w-20' />
            </a>

        <div>
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.31317 12.463C6.20006 9.29213 8.60976 6.6252 11.701 6.5C14.7923 6.6252 17.202 9.29213 17.0889 12.463C17.0889 13.78 18.4841 15.063 18.525 16.383C18.525 16.4017 18.525 16.4203 18.525 16.439C18.5552 17.2847 17.9124 17.9959 17.0879 18.029H13.9757C13.9786 18.677 13.7404 19.3018 13.3098 19.776C12.8957 20.2372 12.3123 20.4996 11.701 20.4996C11.0897 20.4996 10.5064 20.2372 10.0923 19.776C9.66161 19.3018 9.42346 18.677 9.42635 18.029H6.31317C5.48869 17.9959 4.84583 17.2847 4.87602 16.439C4.87602 16.4203 4.87602 16.4017 4.87602 16.383C4.91795 15.067 6.31317 13.781 6.31317 12.463Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.42633 17.279C9.01212 17.279 8.67633 17.6148 8.67633 18.029C8.67633 18.4432 9.01212 18.779 9.42633 18.779V17.279ZM13.9757 18.779C14.3899 18.779 14.7257 18.4432 14.7257 18.029C14.7257 17.6148 14.3899 17.279 13.9757 17.279V18.779ZM12.676 5.25C13.0902 5.25 13.426 4.91421 13.426 4.5C13.426 4.08579 13.0902 3.75 12.676 3.75V5.25ZM10.726 3.75C10.3118 3.75 9.97601 4.08579 9.97601 4.5C9.97601 4.91421 10.3118 5.25 10.726 5.25V3.75ZM9.42633 18.779H13.9757V17.279H9.42633V18.779ZM12.676 3.75H10.726V5.25H12.676V3.75Z" fill="#000000"/>
            </svg>
        </div>

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

                    {/* Login Name */}
                <span class="block text-sm text-gray-900 dark:text-white">{userName}</span>
        </div>
                <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownUser'>
                    <li>
                        <a href='/ClientProfile' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>My Profile</a>
                    </li>
                    <li>
                        <a href='/ClientSettings' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Settings</a>
                    </li>
                    <li>
                        {/* Logout */}
                        <a href='/'>
                        <button
                        onClick={handleLogout}
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                            Log out
                        </button>
                        </a>
                    </li>
                </ul>
            </div>
            )}
        </div>
        </div>
    )
}