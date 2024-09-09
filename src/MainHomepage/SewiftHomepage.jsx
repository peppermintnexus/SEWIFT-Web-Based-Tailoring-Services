import React from 'react'
import Header from '/src/components/Header.jsx'
import SewiftBg from '/src/assets/images/SewiftBg.png'

export default function SewiftHomepage() {
    return (
        <div className='bg-[#d9edf4] min-h-screen'>
            <div>
            <Header />
            </div>

            <div className='flex justify-between items-center sm:px-12 sm:pt-5 md:pt-0 md:px-16'>
                <div className='md:mb-20'>
                <h1 className='sm:text-5xl md:text-7xl font-semibold text-[#6793a8] mb-3'>
                    Sewift Solutions</h1>
                <p className='sm:text-balance md:text-xl text-[#6F6F6F] mb-7'>
                    SEWIFT is an online application that will provide swift<br />solutions for your tailoring needs.</p>
                <a href='/SignUp'>
                <button className='font-semibold rounded-lg px-4 py-2 text-[#6F6F6F] bg-[#FEFEFE] hover:bg-[#10aeb2] hover:text-[#fefefe] hover:shadow-md'>
                    Try it now!</button></a>
                </div>
                <img src={SewiftBg} class='sm:w-3/6 md:w-2/5'/>
            </div>
        </div>
    )
}
