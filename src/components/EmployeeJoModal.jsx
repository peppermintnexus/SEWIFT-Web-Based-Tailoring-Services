import React, { useEffect, useState } from "react";

export default function EmployeeJoModal({ order, onClose }) {
  const [clientName, setClientName] = useState("N/A");
  const [measurements, setMeasurements] = useState("N/A");

  useEffect(() => {
    if (order) {
      // Access Client_Name directly from the order map
      setClientName(order.Client_Name || "N/A");

      // Access nested Measurements map
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

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='w-72 py-3 px-4 bg-white rounded-lg'>
        <div className='flex justify-between'>
          <label className='pl-2 text-xl font-semibold'>
            JO <span>{order.Job_Order_Number || "0001"}</span>
          </label>
          <div className='rounded-lg items-center font-medium px-3 bg-[#ffdd94]'>
            <label className='text-xs'>{order.Status || "Pending"}</label>
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
              <img
                src={order.Receipt_Image_Verification}
                alt='Receipt'
                className='w-full h-auto rounded border'
              />
            ) : (
              <p>Not Uploaded</p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className='mt-4 px-3 py-1 bg-blue-500 text-white rounded'
        >
          Close
        </button>
      </div>
    </div>
  );
}
