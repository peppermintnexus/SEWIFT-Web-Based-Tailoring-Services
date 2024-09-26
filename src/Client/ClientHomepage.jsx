import React from 'react'
import ClientHeader from '/src/components/ClientHeader.jsx'

export default function SewiftHomepage() {
    return (
        <div className='bg-[#d9edf4] min-h-screen'>
            <div>
            <ClientHeader />
            </div>

            <div>
                <div className='bg-[#fefefe] p-32'>
                    <h1 className='text-center text-[#6793a8] font-semibold text-6xl mb-10'>
                        Welcome to SEWIFT!
                    </h1>
                    <div className='flex place-content-center'>
                    <button className='mx-5 text-center font-semibold rounded-lg px-3 py-1 text-[#fefefe] bg-[#10aeb2] hover:text-[#fefefe] hover:shadow-md'>
                        View Order Progress</button>
                    <button className='text-center font-semibold rounded-lg px-3 py-1 text-[#fefefe] bg-[#10aeb2] hover:text-[#fefefe] hover:shadow-md'>
                        View Complete Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
