import React from 'react'
import Header from '/src/components/Header.jsx'
import BackgroundOne from '/src/assets/images/BackgroundOne.png'

export default function About() {
    return (
        <div className='min-h-screen bg-cover bg-center' style={{ backgroundImage: `url(${BackgroundOne})` }}>
            <div>
            <Header />
            </div>

            <div className='pt-20 bg-gradient-to-b from--500 text-[#fefefe] mx-4 sm:mx-32 my-12 rounded-xl px-4 sm:px-7 py-10 text-center'>
                <h1 className='font-semibold text-3xl sm:text-5xl pb-7'>Contact Us</h1>
                <p className='text-lg sm:text-xl px-4 sm:px-20'>Feel free to contact us and we will get back to you as soon as we can!</p>

                <div className='mt-3 flex justify-center gap-10 items-center '>
                <div className='flex items-center gap-3'>
                <svg className='w-5 h-5' viewBox="0 -2.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-340.000000, -922.000000)" fill="#fefefe">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                <path d="M294,774.474 L284,765.649 L284,777 L304,777 L304,765.649 L294,774.474 Z M294.001,771.812 L284,762.981 L284,762 L304,762 L304,762.981 L294.001,771.812 Z" id="email-[#1572]"></path>
                </g>
                </g>
                </g>
                </svg>
                <p>mzerrudo15616@liceo.edu.ph</p>
                </div>
                <div className='flex items-center gap-3'>
                <svg className='w-5 h-5' viewBox="0 -2.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-340.000000, -922.000000)" fill="#fefefe">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                <path d="M294,774.474 L284,765.649 L284,777 L304,777 L304,765.649 L294,774.474 Z M294.001,771.812 L284,762.981 L284,762 L304,762 L304,762.981 L294.001,771.812 Z" id="email-[#1572]"></path>
                </g>
                </g>
                </g>
                </svg>
                <p>ruy76317@liceo.edu.ph</p>
                </div>
            </div>
        </div>
    </div>
    )
}
