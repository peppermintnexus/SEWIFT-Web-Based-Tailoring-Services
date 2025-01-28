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
            </div>
        </div>
    )
}
