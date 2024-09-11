import React, { useState } from 'react'
import Textbox from '/src/components/Textbox.jsx'

export default function SignUp() {
    return (
        <div className='flex justify-center items-center'>
                <div className='bg-[#fefefe]'>

                    <div>
                    <div className='grid grid-cols-2 mb-1'>
                        <div className='mr-6'>
                            <p>Name:</p>
                            <Textbox />
                        </div>
                        <div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 mb-1'>
                        <div className='mr-6'>
                            <p>Email:</p>
                            <Textbox />
                        </div>
                        <div>
                            <p>Phone Number:</p>
                            <Textbox />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 mb-1'>
                        <div className='mr-6'>
                            <p>Password:</p>
                            <Textbox />
                        </div>
                        <div>
                            <p>Confirm Password:</p>
                            <Textbox />
                        </div>
                    </div>
                </div>

                <div className='text-center mt-7 pb-3'>
                    <a href='/ClientHomepage'>
                    <button className='text-center font-semibold rounded-lg px-3 py-1 text-[#fefefe] bg-[#10aeb2] hover:text-[#fefefe] hover:shadow-md'>Sign up</button></a>
                    <p>Already have an account? <a href='/ClientLogin' className='underline hover:text-[#6793a8]'>Log in</a></p>
                </div>
                </div>
        </div>
    )
}