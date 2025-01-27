import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button 
      type="primary"
      className='bg-[#E3F2FD] w-full flex justify-between text-black justify-start p-5'
      onClick={showModal}>
        <p>Job Order <span className='font-semibold'>12345</span></p>
        <p>Status: <span className='font-semibold'>Ongoing</span></p>
      </Button>
      {/* Remove OK and Cancel buttons by setting footer to null */}
      <Modal 
      title="Job Order Details" 
      open={isModalOpen} 
      onCancel={handleCancel} 
      footer={null}
      width={900}
      >
      <div className="border-t border-gray-100 mt-4 mb-2" />
      <div className='text-base grid grid-cols-2'>
        <div className='grid grid-cols-2'>
          <div>
            <div>
              <span className='block font-medium'>Client Name</span>
              <label className='text-[#7f7f7f]'>Bogart dela Cruz</label>
            </div>
            <div className='pt-3'>
              <span className='block font-medium'>Date of Order</span>
              <label className='text-[#7f7f7f]'>January 1, 2025</label>
            </div>
          </div>
          <div>
            <div>
              <span className='block font-medium'>Tailor ID</span>
              <label className='text-[#7f7f7f]'>12391802841</label>
            </div>
            <div className='pt-3'>
              <span className='block font-medium'>Total Price</span>
              <label className='text-[#7f7f7f]'>100.00</label>
            </div>
            
          </div>
        </div>
        <div className='flex items-center'>
        <form className="pt-2 overflow-y-auto max-h-[60vh] pr-2">
          <div className="gap-3 grid grid-cols-3">
            <div>
              <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                <input
                id="size"
                name="size"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                </input>
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
      </Modal>
    </>
  );
};

export default App;
