import React from 'react'
import Textbox from '/src/components/Textbox.jsx'
import IconClient from '/src/assets/images/IconClient.png'
import IconAdmin from '/src/assets/images/IconAdmin.png'
import IconEmployee from '/src/assets/images/IconEmployee.png'
import StickerClose from '/src/assets/images/StickerClose.png'

export default function ClientLogin() {
    return (
        <div className='bg-[#d9edf4] min-h-screen'>

            <div className='flex justify-end pt-3 px-3'>
                <a href='/'>
                <button className='bg-[#fefefe] m-5 rounded-full'>
                <img src={StickerClose} className='w-16 p-5 rounded-full hover:bg-[#f6f6f6]' />
                </button>
                </a>
            </div>

            <div className='flex justify-center items-center'>
            <div className='flex grid grid-cols-[max-content_1fr]'>
                <div className='bg-[#10aeb2] grid grid-rows-3 place-items-center'>
                <div>
                    <a href='/ClientLogin'>
                    <button>
                        <img src={IconClient} className='w-20 p-5 m-3 hover:bg-[#d9dddc] hover:rounded-lg' title='Client' />
                    </button>
                    </a>
                </div>
                <div>
                    <a href='/AdminLogin'>
                    <button>
                        <img src={IconAdmin} className='w-20 p-5 hover:bg-[#d9dddc] hover:rounded-lg' title='Admin' />
                    </button>
                    </a>
                </div>
                <div>
                    <a href='/EmployeeLogin'>
                    <button>
                        <img src={IconEmployee} className='w-20 p-5 mt-3 hover:bg-[#d9dddc] hover:rounded-lg' title='Tailor Shop Employee' />
                    </button>
                    </a>
                </div>
                </div>
                
                <div className='px-24 bg-[#fefefe]'>
                    <h1 className='text-center pt-5 mb-8 font-semibold text-4xl'>Log in as Employee</h1>
                    <p className='pl-1 pb-1'>Email</p>
                    <Textbox />
                    <p className='pl-1 pb-1 pt-3'>Password</p>
                    <Textbox />
                    <p className='text-right text-sm'>Forgot Password?</p>

                <div className='text-center mt-7 pb-3'>
                    <a href='/EmployeeHomepage'>
                    <button className='text-center font-semibold rounded-lg px-3 py-1 text-[#fefefe] bg-[#10aeb2] hover:text-[#fefefe] hover:shadow-md'>Log in</button></a>
                    <p>Don't have an account? <a href='/SignUp' className='underline hover:text-[#6793a8]'>Sign up</a></p>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}
