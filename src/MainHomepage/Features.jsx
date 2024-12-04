import React from 'react'
import Header from '/src/components/Header.jsx'
import InstantPurchase from '/src/assets/images/InstantPurchase.png'
import CustomizedOrder from '/src/assets/images/CustomizedOrder.png'
import Alteration from '/src/assets/images/Alteration.png'
import Profiling from '/src/assets/images/Profiling.png'
import TrackOrderProgress from '/src/assets/images/TrackOrderProgress.png'
import JobOrderQueue from '/src/assets/images/JobOrderQueue.png'
import ProductMasterlistDisplay from '/src/assets/images/ProductMasterlistDisplay.png'
import ManageShopProfile from '/src/assets/images/ManageShopProfile.png'
import EfficientProfileReview from '/src/assets/images/EfficientProfileReview.png'
import MultipleTailorShops from '/src/assets/images/MultipleTailorShops.png'
import Ratings from '/src/assets/images/Ratings.png'

export default function Features() {
    return (
        <div className='bg-[#fefefe] min-h-screen'>
            <div>
                <Header />
            </div>

            <div>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold text-[#6f6f6f] pt-5 pb-2'>
                        User Features
                    </h1>
                    <p className='text-[#6f6f6f] pb-4'>
                    Explore what you can do with SEWIFT we like to provide our users with the best features
                    </p>
                </div>

                <div className='bg-[#ffcda4] px-10 mx-10 my-3 rounded-xl'>
                    <h1 className='text-2xl font-semibold text-[#6f6f6f] pt-6'>
                        For Client
                    </h1>

                    <div className='mt-4 grid grid-cols-5 gap-6'>
                        <div className='shadow-lg bg-[#fefefe] px-5 pt-8 pb-4 rounded-2xl text-center'>
                            <img src={InstantPurchase} class='w-9 mx-auto' />
                            <div>
                                <h1 className='mt-3 mb-2 text-md font-semibold text-[#10aeb2]'>
                                    Instant Purchase
                                </h1>
                                <p className='text-wrap'>
                                    Order in Sewift with just one click
                                </p>
                            </div>
                        </div>

                        <div className='shadow-lg bg-[#fefefe] mx-auto px-5 pt-8 pb-4 rounded-2xl text-center'>
                            <img src={CustomizedOrder} class='w-9 mx-auto' />
                            <div>
                                <h1 className='mt-3 mb-2 text-md font-semibold text-[#10aeb2]'>
                                    Customized Order
                                </h1>
                                <p className='text-wrap'>
                                    Personalize your order based on your preferences
                                </p>
                            </div>
                        </div>

                        <div className='shadow-lg bg-[#fefefe] mx-auto px-5 pt-8 pb-4 rounded-2xl text-center'>
                            <img src={Alteration} class='w-9 mx-auto' />
                            <div>
                                <h1 className='mt-3 mb-2 text-md font-semibold text-[#10aeb2]'>
                                    Alteration
                                </h1>
                                <p>
                                    Make adjustments to your clothing
                                </p>
                            </div>
                        </div>

                        <div className='shadow-lg bg-[#fefefe] mx-auto px-5 pt-8 pb-4 rounded-2xl text-center'>
                            <img src={Profiling} class='w-9 mx-auto' />
                            <div>
                                <h1 className='mt-3 mb-2 text-md font-semibold text-[#10aeb2]'>
                                    Profiling
                                </h1>
                                <p>
                                    Saves your current measurements
                                </p>
                            </div>
                        </div>

                        <div className='shadow-lg bg-[#fefefe] mx-auto px-5 pt-8 pb-4 rounded-2xl text-center'>
                            <img src={TrackOrderProgress} class='w-9 mx-auto' />
                            <div>
                                <h1 className='mt-3 mb-2 text-md font-semibold text-[#10aeb2]'>
                                    Track Order Progress
                                </h1>
                                <p>
                                    Stay informed with your order status
                                </p>
                            </div>
                        </div>
                    </div>

                <div className='mt-4 grid grid-cols-5 gap-6'>
                    <h1 className='text-2xl font-semibold text-[#6f6f6f] pt-6'>
                        For Tailor Shop
                    </h1>
                </div>

                <div className='mt-4 pb-7 grid grid-cols-5 gap-6'>
                    <div className='shadow-lg bg-[#fefefe] px-5 pt-8 pb-4 rounded-2xl text-center'>
                        <img src={JobOrderQueue} class='w-9 mx-auto' />
                        <div>
                            <h1 className='mt-3 mb-2 text-md font-semibold text-[#10aeb2]'>
                                Job Order Queue
                            </h1>
                            <p className='text-wrap'>
                                Manage client orders efficiently
                            </p>
                        </div>
                    </div>

                    <div className='shadow-lg bg-[#fefefe] px-5 pt-8 pb-4 rounded-2xl text-center'>
                        <img src={ProductMasterlistDisplay} class='w-9 mx-auto' />
                        <div>
                            <h1 className='mt-3 mb-2 text-md font-semibold text-[#10aeb2]'>
                                Product Masterlist Display
                            </h1>
                            <p className='text-wrap'>
                                Showcase your apparel
                            </p>
                        </div>
                    </div>

                    <div className='shadow-lg bg-[#fefefe] px-5 pt-8 pb-4 rounded-2xl text-center'>
                        <img src={TrackOrderProgress} class='w-9 mx-auto' />
                        <div>
                            <h1 className='mt-3 mb-2 text-md font-semibold text-[#10aeb2]'>
                                Track Order Progress
                            </h1>
                            <p className='text-wrap'>
                                Update your client's order progress
                            </p>
                        </div>
                    </div>

                    <div className='shadow-lg bg-[#fefefe] px-5 pt-8 pb-4 rounded-2xl text-center'>
                        <img src={ManageShopProfile} class='w-9 mx-auto' />
                        <div>
                            <h1 className='mt-3 mb-2 text-md font-semibold text-[#10aeb2]'>
                                Manage Shop Profile
                            </h1>
                            <p className='text-wrap'>
                                Introduce your business to the clients
                            </p>
                        </div>
                    </div>

                    <div className='shadow-lg bg-[#fefefe] px-5 pt-8 pb-4 rounded-2xl text-center'>
                        <img src={EfficientProfileReview} class='w-9 mx-auto' />
                        <div>
                            <h1 className='mt-3 mb-2 text-md font-semibold text-[#10aeb2]'>
                                Efficient Profile Review
                            </h1>
                            <p className='text-wrap'>
                                Refer to your client's saved measurement profile in one click
                            </p>
                        </div>
                    </div>

                    </div>
                </div>
            </div>

                <div className='text-center'>
                    <h1 className='text-3xl font-bold text-[#6f6f6f] pt-5 pb-2'>
                        Web Application Features
                    </h1>
                    <p className='text-[#6f6f6f] pb-4'>
                        We also provide interactive features for our users!
                    </p>
                </div>

                <div className='bg-[#10aeb2] px-10 mx-10 my-3 rounded-xl'>
                    <div className='pt-10 pb-7 grid grid-cols-3 gap-6'>
                        <div className='shadow-lg bg-[#fefefe] px-5 pt-8 pb-7 rounded-2xl text-center'>
                            <img src={MultipleTailorShops} class='w-9 mx-auto' />
                            <div>
                                <h1 className='mt-3 mb-1 text-md font-semibold text-[#10aeb2]'>
                                    Multiple Tailor Shops
                                </h1>
                                <p className='text-center'>
                                    Sewift caters multiple tailor shops<br />within Cagayan de Oro City
                                </p>
                            </div>
                        </div>

                        <div className='shadow-lg bg-[#fefefe] px-5 pt-8 pb-4 rounded-2xl text-center'>
                            <img src={Ratings} class='w-9 mx-auto' />
                            <div>
                                <h1 className='mt-3 mb-1 text-md font-semibold text-[#10aeb2]'>
                                    Ratings
                                </h1>
                                <p className='text-center'>
                                    Love the quality and service?<br />Give tailor shops a five-star rating
                                </p>
                            </div>
                        </div>

                        <div className='shadow-lg bg-[#fefefe] px-10 pt-8 pb-4 rounded-2xl text-center'>
                            <img src={TrackOrderProgress} class='w-9 mx-auto' />
                            <div>
                                <h1 className='mt-3 mb-1 text-md font-semibold text-[#10aeb2]'>
                                    Track Order Progress
                                </h1>
                                <p className='text-center'>
                                    Sewift keep their clients updated of their ordered apparels
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    )
}
