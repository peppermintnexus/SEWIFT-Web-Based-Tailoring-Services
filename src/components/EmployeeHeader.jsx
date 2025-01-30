import React from 'react'
import LogoBlack from '/src/assets/images/LogoBlack.png'

export default function EmployeeHeader() {
    return (
        <div className='viewport shadow flex-wrap justify-between items-center h-20 w-full px-4 sm:px-10  text-[#fefefe] bg-[#fefefe] relative'>
    <div className='flex justify-between items-center'>
        <a href="/EmployeeJobOrder" className='flex-shrink-0'>
            <img src={LogoBlack} className="ml-4 sm:ml-16 mt-5 h-10" alt="Sewift Logo" />
        </a>

        <div className='mt-5 flex items-center flex-shrink-0'>
            <svg className='w-5 h-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="9" r="3" stroke="#7F7F7F" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="10" stroke="#7F7F7F" strokeWidth="1.5"/>
                <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#7F7F7F" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <h1 className='pl-2 text-[#7F7F7F] text-sm'>Employee Name</h1>
        </div>
    </div>
</div>
    )
}