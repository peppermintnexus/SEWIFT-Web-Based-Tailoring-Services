import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import SchoolBlouse from '/src/assets/images/SchoolBlouse.jpg';

const JobOrderModal = ({ onAccept }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('pending');
  const [isEditable, setIsEditable] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleAccept = () => {
    setIsEditable('true'); // Enable editing when Accept is clicked
    setStatus('ongoing');
    if (onAccept) {
      onAccept();
    }
  };

  const handleDeny = () => {
    // Add your deny logic here
    setIsEditable(false);
  };

  const getButtonBackgroundColor = () => {
    switch (status) {
      case 'ongoing': return '#FFE9A1';
      case 'completed': return '#AEEAC3';
      case 'pending': return '#B8E4ED';
      case 'canceled': return '#F5B5B8';
      case 'claimed': return '#D6DADC';
      default: return '#FFFFFF';
    }
  };

  return (
    <>
      <Button 
        type="primary"
        style={{ 
          backgroundColor: getButtonBackgroundColor(), 
          borderColor: getButtonBackgroundColor() 
        }}
        className='shadow w-auto sm:w-full flex justify-between text-black justify-start p-3.5 sm:p-5'
        onClick={showModal}
      >
        <p className='text-xs sm:text-sm'>Job Order <span className='text-xs sm:text-sm font-semibold'>12345</span></p>
      </Button>

      <Modal 
        title="Job Order Details" 
        open={isModalOpen} 
        onCancel={handleCancel} 
        footer={null}
        width={600}
        centered
      >
        <div className="overflow-y-auto pr-5 max-h-[70vh]">
          <div className="border-t border-gray-100 mt-3 mb-3" />
          <div className='overflow-y-auto max-h-[60vh] grid grid-cols-2'>
            <div>
              <img src={SchoolBlouse} className='object-cover w-full h-60' alt="School Blouse" />
            </div>

            <div className='pl-4'>
              <div>
                <span className='block font-medium'>Product Name</span>
                <label className='text-[#7f7f7f]'>School Blouse</label>
              </div>
              <div className='pt-3'>
                <span className='block font-medium'>JO Number</span>
                <label className='text-[#7f7f7f]'>12345</label>
              </div>

              <div className='pt-3'>
            <span className='block font-medium'>Status</span>
            <select
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
              value={status}
              onChange={handleStatusChange}
              disabled={!isEditable} // Only enable when isEditable is true
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="canceled">Cancelled</option>
              <option value="claimed">Claimed</option>
            </select>
          </div>

              <div className='pt-3'>
                <span className='block font-medium'>Total Price</span>
                <label className='text-[#7f7f7f]'>100.00</label>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-5 mb-3" />

          <div className='flex px-10 justify-between'>
            <div>
              <span className='block text-center font-medium'>Client Name</span>
              <label className='text-center text-[#7f7f 7f]'>Bogart Dela Cruz</label>
            </div>
            <div>
              <span className='block text-center font-medium'>Date of Order</span>
              <label className='text-center text-[#7f7f7f]'>January 1, 2025</label>
            </div>
            <div>
              <span className='block text-center font-medium'>Tailor ID</span>
              <label className='text-center text-[#7f7f7f]'>1234567890</label>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-5 mb-3" />

          <span className='text-lg font-medium'>Client Measurement</span>

          <form className="pt-2">
            <div className="gap-3 grid grid-cols-3">
              <div>
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                <input
                  id="quantity"
                  name="quantity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  disabled
                />
              </div>
              <div>
                <label htmlFor="orderType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type of Order</label>
                <input
                  id="orderType"
                  name="orderType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  disabled
                />
              </div>
              <div>
                <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                <input
                  id="size"
                  name="size"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  disabled
                />
              </div>
            </div>

            <div className="border-t border-gray-100 mt-4 mb-2" />
            <div className="gap-5 grid grid-cols-3">
              <div className="grid grid-rows-5">
                <div>
                  <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Shoulder</label>
                  <input
                    type="text"
                    name="shoulder"
                    id="shoulder"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="figure" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Figure</label>
                  <input
                    type="text"
                    name="figure"
                    id="figure"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="bust" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Blouse Bust</label>
                  <input
                    type="text"
                    name="bust"
                    id="bust"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="frontChest" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Front Chest</label>
                  <input
                    type="text"
                    name="frontChest"
                    id="frontChest"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="bustDistance" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Bust Distance</label>
                  <input
                    type="text"
                    name="bustDistance"
                    id="bustDistance"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-rows-5">
                <div>
                  <label htmlFor="sleeve" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Sleeve</label>
                  <input
                    type="text"
                    name="sleeve"
                    id="sleeve"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="blouseLength" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Blouse Length</label>
                  <input
                    type="text"
                    name="blouseLength"
                    id="blouseLength"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="blouseWaist" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Blouse Waist</label>
                  <input
                    type="text"
                    name="blouseWaist"
                    id="blouseWaist"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="backChest" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Back Chest</label>
                  <input
                    type="text"
                    name="backChest"
                    id="backChest"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-rows-5">
                <div>
                  <label htmlFor="circumference" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Circumference</label>
                  <input
                    type="text"
                    name="circumference"
                    id="circumference"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    disabled
                  />
                </div>
 <div>
                    <label htmlFor="dressLength" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Dress Length</label>
                    <input
                      type="text"
                      name="dressLength"
                      id="dressLength"
                      className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="blouseHips" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Blouse Hips</label>
                    <input
                      type="text"
                      name="blouseHips"
                      id="blouseHips"
                      className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="bustPoint" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Bust Point</label>
                    <input
                      type="text"
                      name="bustPoint"
                      id="bustPoint"
                      className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      disabled
                    />
                  </div>
                </div>                
              </div>

              <div className="border-t border-gray-100 mt-4 mb-2" />
              <label 
                htmlFor="remarks" 
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Remarks</label>
              <textarea 
                id="remarks" 
                rows="4" 
                className="mb-2 block px-1.5 py-1 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" 
                disabled
              ></textarea>
              <label 
                htmlFor="receipt" 
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Receipt</label>
              <input 
                type="file" 
                id="receipt" 
                className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
                disabled
              />
              <div className="border-t border-gray-100 mt-4 mb-2" />
              <div className='flex justify-end mt-4'>
            <Button onClick={handleDeny} style={{ marginRight: '8px' }} danger>
              Deny
            </Button>
            <Button onClick={handleAccept} type="primary">
              Accept
            </Button>
          </div>
            </form>
          </div>
        </Modal>
      </>
    );
};
export default JobOrderModal;