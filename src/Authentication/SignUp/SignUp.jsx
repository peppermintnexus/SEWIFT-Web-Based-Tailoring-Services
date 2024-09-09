import React from 'react'
import Textbox from '/src/components/Textbox.jsx'
import Checkbox from '/src/components/Checkbox.jsx'

export default function ClientSignUp() {
    return (
        <div className='flex justify-center items-center bg-[#d9edf4] min-h-screen pb-10'>
                <div className='px-24 bg-[#fefefe]'>
                    <h1 className='text-center pt-5 mb-8 font-semibold text-4xl'>Sign up as Client</h1>
                    <div className='flex mb-3'>
                    <p>Sign Up as:</p>
                        <Checkbox />
                    </div>

                <div>
                    <div className='grid grid-cols-2 mb-1'>
                        <div className='mr-6'>
                            <p>First Name:</p>
                            <Textbox />
                        </div>
                        <div>
                            <p>Last Name:</p>
                            <Textbox />
                        </div>
                    </div>

                    <div className='col-span-2 mb-1'>
                        <p>Complete Address:</p>
                        <Textbox />
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
                    <a href='/Login'>
                    <button className='text-center font-semibold rounded-lg px-3 py-1 text-[#fefefe] bg-[#10aeb2] hover:text-[#fefefe] hover:shadow-md'>Sign up</button></a>
                    <p>Already have an account? <a href='/ClientLogin' className='underline hover:text-[#6793a8]'>Log in</a></p>
                </div>
                </div>
        </div>
    )
}
