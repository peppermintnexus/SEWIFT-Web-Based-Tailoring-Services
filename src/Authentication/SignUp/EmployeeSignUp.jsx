import React, { useState } from 'react'
import Textbox from '/src/components/Textbox.jsx'

export default function SignUp() {
    return (
        <div className='flex justify-center items-center'>
                    <div class="w-full h-80 p-1 overflow-hidden box-border">
                        <div className='mb-2'>
                            <p>Name</p>
                            <Textbox />
                        </div>
                        <div className='mb-2'>
                            <p>Phone Number</p>
                            <Textbox />
                        </div>
                        <div className='mb-2'>
                            <p>Email Address</p>
                            <Textbox />
                        </div>
                        <div className='grid grid-cols-2 gap-7 mb-2'>
                            <div>
                                <p>Password</p>
                                <Textbox />
                            </div>
                            <div>
                                <p>Confirm Password</p>
                                <Textbox />
                            </div>
                        </div>
        
                        <div className='text-center mt-7 mb-3'>
                            <a href='/EmployeeHomepage'>
                            <button className='text-center font-semibold rounded-lg px-6 py-1 text-[#fefefe] bg-[#ef9f5c] hover:text-[#fefefe] hover:shadow-md'>Sign up</button></a>
                            <p>Already have an account? <a href='/MainLogin' className='underline hover:text-[#6793a8]'>Log in</a></p>
                        </div>
                    </div>
                </div>
    )
}