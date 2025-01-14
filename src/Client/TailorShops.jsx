import React from 'react'
import ClientHeader from '/src/components/ClientHeader.jsx'
import Sample from '/src/assets/images/Sample.jpg'

export default function TailorShops() {
    return (
        <div className='min-h-screen bg-[#20262B]'>
            <div>
                <ClientHeader />
            </div>

            <p className='font-bold text-center text-white pt-5 pb-9 text-4xl'>Tailor Shops</p>
            <div className='grid grid-cols-3 mx-40 rounded-lg p-3 gap-5'>
                <a href="#" class="shadow-lg hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-lg"> {/* iconnect sa tailor shop account */}
                    <div class="max-w-sm h-full bg-white  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img class="rounded-t-lg object-cover w-80 h-48" src={Sample} />
                    
                        <div class="p-4">
                            <div class="container w-60 h-16 overflow-hidden">
                                <h5 class="line-clamp-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Sastre Fashion and Sportswear
                                </h5>
                            </div>
                            <p class="pt-2 font-normal text-gray-700 dark:text-gray-400">
                                Email<br />
                                Contact<br />
                                Location<br />
                            </p>
                        </div>
                    </div>
                </a>

                <a href="#" class="shadow-lg hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-lg"> {/* iconnect sa tailor shop account */}
                    <div class="max-w-sm h-full bg-white  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img class="rounded-t-lg object-cover w-80 h-48" src={Sample} />
                    
                        <div class="p-4">
                            <div class="container w-60 h-16 overflow-hidden">
                                <h5 class="line-clamp-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                AJS Tailoring and Embroidery adsfadfadfafad
                                </h5>
                            </div>
                            <p class="pt-2 font-normal text-gray-700 dark:text-gray-400">
                                Email<br />
                                Contact<br />
                                Location<br />
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}
