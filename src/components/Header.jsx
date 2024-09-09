import React from 'react'
import SewiftLogo from '/src/assets/images/SewiftLogo.png'

export default function Header() {
    return (
        <div className='flex justify-between items-center h-24 max-w-screen-xl px-10 mx-auto bg-[#d9edf4] text-[#6f6f6f]'>
            <img src={SewiftLogo} class='sm:w-16 md:w-20' />
            <nav className='sm:text-normal md:text-lg flex font-semibold'>
                <a href='/' className='p-4 hover:text-[#6793a8]'>Home</a>
                <a href='/About' className='p-4 hover:text-[#6793a8]'>About</a>
                <a href='/Features' className='p-4 hover:text-[#6793a8]'>Features</a>
                <a href='/ClientLogin' className='p-4 hover:text-[#6793a8]'>Login</a>
            </nav>

        </div>
    )
}
