import React from 'react'
import Header from '/src/components/Header.jsx'
import BackgroundOne from '/src/assets/images/BackgroundOne.png'

export default function About() {
    return (
        <div className='min-h-screen bg-cover bg-center' style={{ backgroundImage: `url(${BackgroundOne})` }}>
            <div>
            <Header />
            </div>

            <div className='flex flex justify-center items-center text-[#fefefe] text-2xl mt-5 gap-24'>
                <button className='rounded-lg px-6 py-4 text-[#fefefe] hover:bg-[#0d0b0a] hover:text-[#fefefe] hover:shadow-md'>About Us</button>
                <a href='/Contact'><button className='rounded-lg px-6 py-4 text-[#fefefe] hover:bg-[#0d0b0a] hover:text-[#fefefe] hover:shadow-md'>Contact</button></a>
            </div>

            <div className='bg-gradient-to-b from--500 text-[#fefefe] mx-32 my-12 rounded-xl px-7 py-10 text-center'>
                <h1 className='font-semibold text-5xl pb-7'>Taking the first step</h1>
                <p className='text-xl px-20'>SEWIFT was created to revolutionize the tailoring experience. Our platform simplifies order management, enhances customer satisfaction, and empowers tailor shop employees with efficient tools. We're here to make tailoring seamless for everyone.</p>
            </div>
        </div>
    )
}
