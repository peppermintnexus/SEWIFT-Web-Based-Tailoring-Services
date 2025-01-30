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
        <div className='viewport flex flex-wrap justify-between items-center h-20 w-full px-4 sm:px-10 bg-[#171B1F] text-[#6f6f6f] relative'>
            <a href='/ClientHomepage'>
            <img src={LogoWhite} className='w-16 md:w-20 h-auto' />
            </a>

        <div className='flex gap-3 items-center'>
            <a href='/TailorShops'>
            <button>
            <svg className='w-7 h-7 mt-1.5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 11V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5C16.2712 22 18.1569 22 19.3284 20.8284C20.5 19.6569 20.5 17.7712 20.5 14V11" stroke="#fefefe" stroke-width="1.5"/>
                <path d="M9.4998 2H14.4998L15.1515 8.51737C15.338 10.382 13.8737 12 11.9998 12C10.1259 12 8.6616 10.382 8.84806 8.51737L9.4998 2Z" stroke="#fefefe" stroke-width="1.5"/>
                <path d="M3.32975 5.35133C3.50783 4.46093 3.59687 4.01573 3.77791 3.65484C4.15938 2.89439 4.84579 2.33168 5.66628 2.10675C6.05567 2 6.50969 2 7.41771 2H9.50002L8.77549 9.24527C8.61911 10.8091 7.30318 12 5.73155 12C3.8011 12 2.35324 10.2339 2.73183 8.34093L3.32975 5.35133Z" stroke="#fefefe" stroke-width="1.5"/>
                <path d="M20.6703 5.35133C20.4922 4.46093 20.4031 4.01573 20.2221 3.65484C19.8406 2.89439 19.1542 2.33168 18.3337 2.10675C17.9443 2 17.4903 2 16.5823 2H14.5L15.2245 9.24527C15.3809 10.8091 16.6968 12 18.2685 12C20.1989 12 21.6468 10.2339 21.2682 8.34093L20.6703 5.35133Z" stroke="#fefefe" stroke-width="1.5"/>
                <path d="M9.5 21.5V18.5C9.5 17.5654 9.5 17.0981 9.70096 16.75C9.83261 16.522 10.022 16.3326 10.25 16.201C10.5981 16 11.0654 16 12 16C12.9346 16 13.4019 16 13.75 16.201C13.978 16.3326 14.1674 16.522 14.299 16.75C14.5 17.0981 14.5 17.5654 14.5 18.5V21.5" stroke="#fefefe" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            </button>
            </a>

            

            <div className='relative mr-5'>
                <button
                onClick={toggleDropdown} 
                className='flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"'
                type="button"
                >

            <span className='sr-only'>Open user menu</span>
            <svg className='w-7 h-7' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="9" r="3" stroke="#fefefe" stroke-width="1.5"/>
            <circle cx="12" cy="12" r="10" stroke="#fefefe" stroke-width="1.5"/>
            <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#fefefe" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
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
                        <a href='/ClientOrder' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>View Orders</a>
                    </li>
                    <li>
                        <a href='/ClientSettings' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Settings</a>
                    </li>
                    <li>
                        {/* Logout */}
                        <a href='/'>
                        <li
                        onClick={handleLogout}
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                            Log out
                        </li>
                        </a>
                    </li>
                </ul>
            </div>
            )}
        </div>
        </div>
        </div>
    )
}