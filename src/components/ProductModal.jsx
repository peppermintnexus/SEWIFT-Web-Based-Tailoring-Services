import React from "react";
import SchoolBlouse from '/src/assets/images/SchoolBlouse.jpg'

export default function ProductModal() {
    return ( 
    <a href="/EditProduct" class="flex flex-col items-center bg-white rounded-lg shadow-sm md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800">
        <div className='border bg-[#fefefe] shadow'>
            <div className="text-left grid grid-cols-2">
                <div>
                <img src={SchoolBlouse} className='p-3 rounded-t-lg object-cover w-fit h-fit'/>
                </div>
                <div class="px-2 py-3">
                    <p class="mb-2 line-clamp-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">School Blouse</p>
                    <p class="block font-normal text-gray-700 dark:text-gray-400">Category</p>
                    <p class="block font-normal text-gray-700 dark:text-gray-400">Available Sizes</p>
                    <p class="block font-normal text-gray-700 dark:text-gray-400">Status</p>
                    <p class="block font-normal text-gray-700 dark:text-gray-400">Price</p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">Description</p>
                </div>
            </div>
        </div>
    </a>
    );
}
