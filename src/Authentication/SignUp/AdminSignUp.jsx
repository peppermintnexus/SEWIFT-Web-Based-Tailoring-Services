import React, { useState } from 'react'
import Textbox from '/src/components/Textbox.jsx'

export default function SignUp() {
    return (
        <div class="flex justify-center items-center">
                    <div class="w-full px-1 overflow-hidden box-border">
                    <div className='grid grid-cols-2 gap-7 mb-2'>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Name</p>
                                <Textbox />
                            </div>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Tailor Shop Name</p>
                                <Textbox />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-7 mb-2'>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Complete Address</p>
                                <Textbox />
                            </div>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Phone Number</p>
                                <Textbox />
                            </div>
                        </div>
                        <div className='mb-2'>
                            <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Email Address</p>
                            <Textbox />
                        </div>
                        <div className='grid grid-cols-2 gap-7 mb-2'>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Password</p>
                                <Textbox />
                            </div>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Confirm Password</p>
                                <Textbox />
                            </div>
                        </div>
                        
        
                        <div className='text-center mt-7 mb-3'>
                            <a href='/AdminHomepage'>
                            <button className='text-center font-semibold rounded-lg px-6 py-1.5 text-[#fefefe] bg-blue-700 hover:text-[#fefefe] hover:shadow-md'>Sign up</button></a>
                            <div class="text-sm pt-2 font-medium text-gray-500 dark:text-gray-300 text-center">
                                Already have an account? <a href="/MainLogin" class="text-blue-700 hover:underline dark:text-blue-500">Log in</a>
                            </div>
                        </div>
                    </div>
                </div>
    )
}