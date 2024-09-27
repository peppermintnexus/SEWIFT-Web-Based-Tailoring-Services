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
        <div>
            <div>
            <ClientHeader />
            </div>
            
            <div className='bg-[#fefefe] flex py-5 justify-center'> 
            <div className='max-w-6xl'>
                <Carousel autoSlide={true} autoSlideInterval={5000}>
                    {slides.map((s) => (
                        <img src={s} />
                    ))}
                </Carousel>
            </div>
            </div>

            <div className='bg-[#ffc696]'>
                <div className='grid grid-cols-3 gap-7 p-10 flex justify-center'>
                    <div>
                    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">View Order Progress</h5>
                        <p class="font-normal text-gray-700 dark:text-gray-400">You currently have no orders in progress.</p>
                        </a>
                    </div>
                    <div>
                    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">View Complete Orders</h5>
                        <p class="font-normal text-gray-700 dark:text-gray-400">You currently have no orders.</p>
                        </a>
                    </div>
                    <div>
                    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">View Tailor Shops</h5>
                        <p class="font-normal text-gray-700 dark:text-gray-400">Check out tailor shops and their services.</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
