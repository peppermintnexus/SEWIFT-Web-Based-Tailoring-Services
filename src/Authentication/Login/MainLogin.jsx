import React from 'react'
import StickerClose from '/src/assets/images/StickerClose.png'

export default function ClientLogin() {
    return (
        <div className='place-items-center m-16'>
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className='flex justify-end pt-3 px-3'>
                <a href='/'>
                <button className='bg-[#fefefe] m-5 rounded-full'>
                <img src={StickerClose} className='w-16 p-5 rounded-full hover:bg-[#f6f6f6]' />
                </button>
                </a>
        </div>
    <form class="space-y-6" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Log in to Sewift</h5>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div class="flex items-start">
            <div class="flex items-start">
            </div>
            <a href="#" class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
        </div>
        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="/Signup" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
        </div>
    </form>
    </div>
</div>
    )
}