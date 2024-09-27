import React from 'react'
import ClientHeader from '/src/components/ClientHeader.jsx'
import Carousel from '/src/components/Carousel.jsx'

const slides = [
    "/src/assets/images/Slide1.png",
    "/src/assets/images/Slide2.png",
    "/src/assets/images/Slide3.png"
]

export default function SewiftHomepage() {
    
    return (
        <div className='bg-[#d9edf4] min-h-screen'>
            <div>
            <ClientHeader />
            </div>
            
            <div className='bg-[#fefefe] min-h-screen flex py-10 justify-center'> 
            <div className='max-w-6xl'>
                <Carousel autoSlide={true} autoSlideInterval={5000}>
                    {slides.map((s) => (
                        <img src={s} />
                    ))}
                </Carousel>
            </div>
            </div>
        </div>
    )
}
