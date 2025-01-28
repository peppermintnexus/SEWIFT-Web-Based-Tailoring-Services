import React from 'react';
import ClientHeader from '/src/components/ClientHeader.jsx'
import SchoolBlouse from '/src/assets/images/SchoolBlouse.jpg'

export default function ClientOrder() {
    return (
        <div className='min-h-screen bg-[#fefefe]'>
            <ClientHeader />

            <h1 className='mx-7 my-6 text-4xl font-medium'>Order Progress</h1>
            <div className='flex items-center justify-between mx-7 p-5 border shadow'>
                <div className='flex items-center'>
                <img src={SchoolBlouse} className='object-cover w-40 h-40'/>
                <div className='pl-7'>
                    <label className='block text-xl font-medium'>School Blouse</label>
                    <label className='block text-[#7f7f7f]'>Job Order Number:</label>
                    <label className='block text-[#7f7f7f]'>Status:</label>
                    <label className='block text-[#7f7f7f]'>Date Ordered:</label>
                    <label className='block text-[#7f7f7f]'>Date Progress:</label>
                </div>
                </div>
                <div>
                    <button className='px-5 py-2 bg-[#10aeb2] text-white rounded-lg mr-5 shadow'>Cancel Order</button>
                </div>
            </div>
        </div>
    )
}