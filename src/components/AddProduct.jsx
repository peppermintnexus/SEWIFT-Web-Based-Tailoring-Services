import React from 'react'

export default function ClientProfile() {
    return (
        <div className='bg-[#fefefe]'>
            <div className='h-full'>
            <div className=' m-2 pl-4 py-2 flex items-center gap-5'>
            <a href='/EmployeeHomepage'>
            <svg fill="#000000" className='w-12 h-12 hover:bg-[#f7f7f7] py-2 pr-1 rounded-full' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g data-name="arrow left" id="arrow_left">
                <path class="cls-1" d="M22,29.73a1,1,0,0,1-.71-.29L9.93,18.12a3,3,0,0,1,0-4.24L21.24,2.56A1,1,0,1,1,22.66,4L11.34,15.29a1,1,0,0,0,0,1.42L22.66,28a1,1,0,0,1,0,1.42A1,1,0,0,1,22,29.73Z"/>
            </g>
            </svg>
            </a>
                <h1 className='text-xl'>Add Product</h1>
            </div>

            <div className='bg-[#EBEBEB] px-10 pt-7'>
                <div className='py-3 px-5 border bg-[#fefefe] space-y-1'>
                    <p>Name</p>
                    <input className='px-1.5 py-1 border w-full'>
                    </input>

                    <p>Category</p>
                    <input className='px-1.5 py-1 border w-full'>
                    </input>

                    <p>Description</p>
                    <input className='px-1.5 py-1 border w-full'>
                    </input>
                </div>

                <div className='mt-5 py-3 px-5 border bg-[#fefefe] space-y-1'>
                    <p className='text-xl pb-4'>Properties</p>

                    <div className='grid grid-cols-2 gap-4 '>
                        <div className='space-y-1'>
                            <p>Price</p>
                            <input className='px-1.5 py-1 border w-full'>
                            </input>
                        </div>
                        <div className='space-y-1'>
                            <p>Stock</p>
                            <input className='px-1.5 py-1 border w-full'>
                            </input>
                        </div>

                        <div className='space-y-1'>
                            <p>Size</p>
                            <input className='px-1.5 py-1 border w-full'>
                            </input>
                        </div>
                        <div className='space-y-1'>
                            <p>Status</p>
                            <input className='px-1.5 py-1 border w-full'>
                            </input>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}