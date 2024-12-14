import React, { useState } from 'react';
import StickerClose from '/src/assets/images/StickerClose.png'
import ClientSignUp from './ClientSignUp.jsx';
import AdminSignUp from './AdminSignUp.jsx';
import EmployeeSignUp from './EmployeeSignUp.jsx';

const SignUp = () => {
    // Set the default selected item to ClientSignUp so it's displayed initially
    const [selectedItem, setSelectedItem] = useState(<ClientSignUp />);

    const handleItemClick = (item) => {
        setSelectedItem(item); // Update state with the clicked item
    };

    return (


        <div className='min-h-screen place-items-center flex justify-center bg-[#20262B]'>
                <div class="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className='grid grid-cols-2 mb-5 flex justify-between'>
                        <div className='justify-self-start p-2 text-xl font-medium text-gray-900 dark:text-white'>Create your account</div>
                        <div>
                        <button className='flex justify-self-end bg-[#fefefe] rounded-full'>
                        <a href='/'>
                            <img src={StickerClose} className='w-10 p-2 rounded-full hover:bg-[#f6f6f6]' alt="Close" />
                            </a>
                        </button>
                        </div>
                    </div>
                    
                <div class="sm:hidden">
                    <select id="tabs" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Client</option>
                        <option>Employee</option>
                        <option>Admin</option>
                    </select>
                </div>
                
                <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                    <li 
                    onClick={() => handleItemClick(<ClientSignUp />)}
                    class="w-full focus-within:z-10 inline-block w-full p-3 hover:text-white hover:bg-[#10aeb2] border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:bg-[#10aeb2] focus:text-white dark:bg-gray-700 dark:text-white" aria-current="page">Client</li>
                    <li class="w-full focus-within:z-10">
                        <a href="#" class="inline-block w-full p-3 hover:text-white hover:bg-[#ef9f5c] border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:bg-[#ef9f5c] focus:text-white focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Employee</a>
                    </li>
                    <li class="w-full focus-within:z-10">
                        <a href="#" class="inline-block w-full p-3 hover:text-white hover:bg-[#20262B] border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 rounded-e-lg hover:bg-gray-50 focus:bg-[#20262B] focus:text-white focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Admin</a>
                    </li>
                </ul>

                <div className="mt-4">
                    {selectedItem}
                </div>
                </div>     
        </div>
    );
};

export default SignUp;