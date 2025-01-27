import React, { useState } from "react";
import SchoolBlouse from '/src/assets/images/SchoolBlouse.jpg'


export default function OrderModal() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return ( 
        <div>
            <button 
                class="text-left w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                onClick={toggleModal}>
                <img class="p-3 rounded-t-lg object-cover w-fit h-fit" src={SchoolBlouse} />
                <div class="px-4 py-3">
                    <h5 class="mb-2 line-clamp-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">School Blouse</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">Size</p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">Price</p>
                </div>
            </button>

            {isModalVisible && ( // Render modal conditionally based on state
            <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-4xl max-h-full">
                    <div className="px-5 py-3 bg-white rounded-lg">
                        <button
                        type="button"
                        onClick={toggleModal}
                        className="grid place-self-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg mb-2 text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                            >
                            <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="grid grid-cols-2">
                            <div>
                                <img src={SchoolBlouse} className="m-2 w-full" />
                            </div>
                            <div className="pl-5 container w-full h-full">
                                <label className="text-xl font-medium">School Blouse </label><span className="text-[#22B14C]">Available</span>
                                <div className="flex items-center">
                                <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.5 11V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5C16.2712 22 18.1569 22 19.3284 20.8284C20.5 19.6569 20.5 17.7712 20.5 14V11" stroke="#7F7F7F" stroke-width="1.5"/>
                                <path d="M9.4998 2H14.4998L15.1515 8.51737C15.338 10.382 13.8737 12 11.9998 12C10.1259 12 8.6616 10.382 8.84806 8.51737L9.4998 2Z" stroke="#7F7F7F" stroke-width="1.5"/>
                                <path d="M3.32975 5.35133C3.50783 4.46093 3.59687 4.01573 3.77791 3.65484C4.15938 2.89439 4.84579 2.33168 5.66628 2.10675C6.05567 2 6.50969 2 7.41771 2H9.50002L8.77549 9.24527C8.61911 10.8091 7.30318 12 5.73155 12C3.8011 12 2.35324 10.2339 2.73183 8.34093L3.32975 5.35133Z" stroke="#7F7F7F" stroke-width="1.5"/>
                                <path d="M20.6703 5.35133C20.4922 4.46093 20.4031 4.01573 20.2221 3.65484C19.8406 2.89439 19.1542 2.33168 18.3337 2.10675C17.9443 2 17.4903 2 16.5823 2H14.5L15.2245 9.24527C15.3809 10.8091 16.6968 12 18.2685 12C20.1989 12 21.6468 10.2339 21.2682 8.34093L20.6703 5.35133Z" stroke="#7F7F7F" stroke-width="1.5"/>
                                <path d="M9.5 21.5V18.5C9.5 17.5654 9.5 17.0981 9.70096 16.75C9.83261 16.522 10.022 16.3326 10.25 16.201C10.5981 16 11.0654 16 12 16C12.9346 16 13.4019 16 13.75 16.201C13.978 16.3326 14.1674 16.522 14.299 16.75C14.5 17.0981 14.5 17.5654 14.5 18.5V21.5" stroke="#7F7F7F" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                                <label className="pt-2 pl-1 pb-2 text-[#7F7F7F]">Sastre Fashion and Sportswear</label>
                                </div>
                                

                                <form className="pt-2 overflow-y-auto max-h-[59vh] pr-2">
                                <div className="gap-3 grid grid-cols-3">
                                    <div>
                                        <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                            <select
                                            id="size"
                                            name="size"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            >
                                            <option selected>-</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            </select>
                                    </div>
                                    <div>
                                        <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type of Order</label>
                                            <select
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            >
                                            <option selected>-</option>
                                            <option>Premade</option>
                                            <option>Customized</option>
                                            <option>Adjust</option>
                                            </select>
                                    </div>
                                    <div>
                                        <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                                            <select
                                            id="size"
                                            name="size"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            >
                                            <option selected>-</option>
                                            <option>Extra Small</option>
                                            <option>Extra Small</option>
                                            <option>Medium</option>
                                            <option>Large</option>
                                            <option>Extra Large</option>
                                            </select>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 mt-4 mb-2" />
                                <div className="gap-5 grid grid-cols-3">
                                    <div className="grid grid-rows-5">
                                        <div>
                                        <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Shoulder</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                        </div>
                                        <div>
                                        <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Figure</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                        </div>
                                        <div>
                                        <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Blouse Bust</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                        </div>
                                        <div>
                                        <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Front Chest</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                       </div>
                                       <div>
                                        <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Bust Distance</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                       </div>
                                    </div>

                                    <div className="grid grid-rows-5">
                                        <div>
                                        <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Sleeve</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                        </div>
                                        <div>
                                        <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Blouse Length</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                        </div>
                                        <div>
                                        <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Blouse Waist</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                        </div>
                                        <div>
                                        <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Back Chest</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                       </div>
                                    </div>

                                    <div className="grid grid-rows-5">
                                        <div>
                                        <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Circumference</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                        </div>
                                        <div>
                                        <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Dress Length</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                        </div>
                                        <div>
                                        <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Blouse Hips</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                        </div>
                                        <div>
                                        <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Bust Point</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                       </div>
                                    </div>
                                    
                                </div>

                                <div className="border-t border-gray-100 mt-4 mb-2" />
                                <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Remarks</label>
                                <textarea id="message" rows="4" className="block px-1.5 py-1 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder="Enter remarks here..."></textarea>
                                
                                <button
                                type="submit"
                                className="mt-3 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Submit Order
                                </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
