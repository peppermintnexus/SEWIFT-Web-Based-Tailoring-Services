import React from 'react'
import LogoWhite from '/src/assets/images/LogoWhite.png'

export default function Header() {
    return (
        <div className='flex justify-between items-center h-20 max-w-screen-xl px-4 sm:px-10 mx-auto bg-[#171B1F] text-[#fefefe]'>
            <a href='/'>
            <img src={LogoWhite} class='w-20 h-auto sm:w-24' alt='Logo' />
            </a>
            <nav className='text-sm sm:text-normal md:text-lg flex font-semibold'>
                <a href='/' className='p-4 sm:p-6 hover:text-[#6793a8]'>Home</a>
                <a href='/About' className='p-4 sm:p-6 hover:text-[#6793a8]'>About</a>
                <a href='/Contact' className='p-4 sm:p-6 hover:text-[#6793a8]'>Contact</a>
                <a href='/MainLogin' className='p-4 sm:p-6 hover:text-[#6793a8]'>Login</a>
            </nav>
        </div>
    )
}
