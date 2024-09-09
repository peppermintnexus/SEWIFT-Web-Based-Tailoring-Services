import React from 'react'

export default function Checkbox() {
    return (
        <div className='flex bg-[#eeeeee] rounded-lg mx-2 px-2 py-1'>
            <p className=''>Client:
            <input type='checkbox' className='w-5 mr-5'></input>
            </p>
            <p className=''>Admin:
            <input type='checkbox' className='w-5 mr-5'></input>
            </p>
            <p className=''>Tailor Shop Employee:
            <input type='checkbox' className='w-5'></input>
            </p>
        </div>
    )
}
