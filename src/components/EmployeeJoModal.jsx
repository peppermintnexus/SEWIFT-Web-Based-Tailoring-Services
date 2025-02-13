import React, { useEffect, useState } from "react";

export default function EmployeeJoModal({ order, onClose, onUpdateStatus }) {
  const [clientName, setClientName] = useState("N/A");
  const [measurements, setMeasurements] = useState("N/A");
  const [status, setStatus] = useState(order?.Status || "Pending");
  const [isImageZoomed, setIsImageZoomed] = useState(false); // State for image zoom

  useEffect(() => {
    if (order) {
      setClientName(order.Client_Name || "N/A");

      if (order.Measurements) {
        const formattedMeasurements = Object.entries(order.Measurements)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
        setMeasurements(formattedMeasurements);
      } else {
        setMeasurements("N/A");
      }
    }
  }, [order]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    if (onUpdateStatus) {
      onUpdateStatus(order.Job_Order_Number, status);
    }
    onClose();
  };

  const toggleImageZoom = () => {
    setIsImageZoomed(!isImageZoomed); // Toggle image zoom
  };

  useEffect(() => {
    setStatus(order?.Status || "Pending");
  }, [order]);

  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50'>
      <div className='sm:mx-96 py-3 px-4 bg-white rounded-lg'>
        <div className='flex justify-between'>
          <label className='pl-2 text-xl font-semibold'>
            JO{" "}
            <span>
              {order.Job_Order_Number
                ? order.Job_Order_Number.toString().padStart(4, "0")
                : ""}
            </span>
          </label>
          <div className='rounded-lg items-center font-medium px-3 bg-[#ffdd94]'>
            <label className='text-xs'>{status}</label>
          </div>
        </div>
        <div className='border-t border-gray-100 mt-3 mb-3' />
        <div className='pl-2 text-[#A3A3A3]'>
          <p>Client Name: {clientName}</p>
          <p>Measurements: {measurements}</p>
          <p>
            Order Date:{" "}
            {order.Created_At
              ? new Date(order.Created_At.seconds * 1000).toLocaleString()
              : "N/A"}
          </p>
          <div className='mt-2'>
            <p className='mb-1'>Receipt:</p>
            {order.Receipt_Image_Verification ? (
              <>
                <img
                  src={order.Receipt_Image_Verification}
                  alt='Receipt'
                  className='w-20 h-20 rounded border cursor-pointer'
                  onClick={toggleImageZoom} // Open zoomed image on click
                />
                {isImageZoomed && (
                  <div
                    className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50'
                    onClick={toggleImageZoom} // Close zoomed image on click outside
                  >
                    <img
                      src={order.Receipt_Image_Verification}
                      alt='Receipt Zoomed'
                      className='max-w-[90%] max-h-[90%] rounded'
                    />
                  </div>
                )}
              </>
            ) : (
              <p>Not Uploaded</p>
            )}
          </div>
        </div>
        <div className='mt-3'>
          <label className='block text-sm font-medium text-gray-700'>
            Update Status:
          </label>
          <select
            value={status}
            onChange={handleStatusChange}
            className='w-full mt-1 p-2 border rounded'
          >
            <option value='In Progress'>In Progress</option>
            <option value='Completed'>Completed</option>
            <option value='Canceled'>Canceled</option>
          </select>
        </div>
        <div className='flex justify-between mt-4'>
          <button
            onClick={onClose}
            className='px-3 py-1 bg-gray-500 text-white rounded'
          >
            Close
          </button>
          <button
            onClick={handleUpdateStatus}
            className='px-3 py-1 bg-blue-500 text-white rounded'
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
