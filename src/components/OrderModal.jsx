import React, { useState } from "react";

export default function OrderModal() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return ( 
        <div>
            <button
                onClick={toggleModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Place Order
            </button>

            {isModalVisible && ( // Render modal conditionally based on state
                <div
                    id="crud-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-4xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 flex"> 
                            <div className="flex-shrink-0 w-1/2 p-4"> 
                                <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Sizing Guide</h4>
                                <img 
                                    src="URL_TO_YOUR_SIZING_GUIDE_IMAGE" 
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="flex-grow p-4">
                                <div className="flex items-center justify-between border-b pb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Product Name
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={toggleModal}
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg
                                            className="w-3 h-3"
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
                                </div>

                                <form className="mt-4">
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blouse</label>
                                            <div className=" gap-3 grid grid-cols-3">
                                            <div>
                                                <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                                <select
                                                id="size"
                                                name="size"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            >
                                                <option selected>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                </select>
                                            </div>
                                            <div>
                                            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type of Order</label>
                                                <select
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            >
                                                <option selected>Customized</option>
                                                <option>Premade</option>
                                                <option>Adjust</option>
                                                </select>
                                            </div>
                                            <div>
                                            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                                                <select
                                                id="size"
                                                name="size"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            >
                                                <option selected>Small</option>
                                                <option>Extra Small</option>
                                                <option>Medium</option>
                                                <option>Large</option>
                                                <option>Extra Large</option>
                                                </select>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 col-span-2">
                                            <div>
                                            <label htmlFor="shoulder" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shoulder</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                            <label htmlFor="shoulder" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Circumference</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                            </div>
                                            <div>
                                            <label htmlFor="shoulder" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sleeve</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                            <label htmlFor="shoulder" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Figure</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                id="customerName"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="cm"
                                                required
                                            />
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="remarks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remarks</label>
                                            <textarea
                                                id="remarks"
                                                name="remarks"
                                                rows="4"
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Enter your remarks here"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Submit Order
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
