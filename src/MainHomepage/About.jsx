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
                <h1 className='font-semibold text-3xl sm:text-5xl pb-7'>Taking the first step</h1>
                <p className='text-lg sm:text-xl px-4 sm:px-20'>SEWIFT was created to revolutionize the tailoring experience. Our platform simplifies order management, enhances customer satisfaction, and empowers tailor shop employees with efficient tools. We're here to make tailoring seamless for everyone.</p>
            </div>
        </div>
    )
}
