import React from 'react'
import ClientHeader from '/src/components/ClientHeader.jsx'
import OrderModal from '../components/OrderModal'

export default function TailorShops() {
    return (
        <div className='bg-[#d9edf4] pb-3 min-h-screen'>
            <div>
            <ClientHeader />
            </div>
            
            <div className='bg-[#fefefe] mx-10 my-5 grid-cols-2 grid grid-flow-row auto-rows-max gap-5'>
                    <div className='grid grid-cols-4 shadow px-2 py-4'>
                        <div className='place-self-center'>
                            product image
                        </div>
                        <div className='grid-rows-2 col-span-2'>
                            <div className='font-semibold text-lg pb-5'>Product Name</div>
                            <div className='grid grid-rows-3 text-[#9ca3af]'>
                                <div>Description:</div>
                                <div>Size:</div>
                                <div>Price:</div>
                            </div>
                        </div>
                        <div>
                            <OrderModal />
                        </div>
                    </div> 
                </div>
        </div>
    )
}
