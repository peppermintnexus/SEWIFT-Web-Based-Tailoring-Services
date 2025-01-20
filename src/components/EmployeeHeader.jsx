import React from 'react'
import LogoBlack from '/src/assets/images/LogoBlack.png'

export default function EmployeeHeader() {
    return (
        <div className='relative z-10 h-14 max-w-screen-xl px-7 pt-2 mx-auto text-[#fefefe] bg-[#fefefe] shadow'>
            <div className='flex justify-between items-center'>
                <a href="/EmployeeHomepage">
                    <img src={LogoBlack} className="ml-16 h-10" alt="Sewift Logo" />
                </a>

                <div className='pt-1 flex items-center'>
                    <svg className='w-5 h-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="9" r="3" stroke="#7F7F7F" stroke-width="1.5"/>
                    <circle cx="12" cy="12" r="10" stroke="#7F7F7F" stroke-width="1.5"/>
                    <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#7F7F7F" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    <h1 className='pl-3 text-[#7F7F7F] text-sm'>Name sa Employee</h1>
                </div>
                
            </div>
        </div>
    )
}