import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

export default function EmployeeJoModal({
  order,
  onClose,
  onUpdateStatus,
  Tailor_Shop_Name,
}) {
  const [clientName, setClientName] = useState("N/A");
  const [clientEmail, setClientEmail] = useState("N/A");
  const [measurements, setMeasurements] = useState("N/A");
  const [remarks, setRemarks] = useState(order?.Remarks || ""); // State for remarks
  const [status, setStatus] = useState(order?.Status || "Pending");
  const [isImageZoomed, setIsImageZoomed] = useState(false); // State for image zoom

  useEffect(() => {
    emailjs.init("ctn-kzvtxyyiPma5K");
  }, []);

  useEffect(() => {
    if (order) {
      setClientName(order.Client_Name || "N/A");

      setClientEmail(order.Client_Email || "N/A");

      if (order.Measurements) {
        const formattedMeasurements = Object.entries(order.Measurements)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
        setMeasurements(formattedMeasurements);
      } else {
        setMeasurements("N/A");
      }

      // Set remarks from the order if available
      setRemarks(order.Remarks || "");
    }
  }, [order]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value); // Update remarks state
  };

  const handleUpdateStatus = () => {
    // Verify current status
    console.log("[Email Modal] Current status:", status);
    console.log("[Email Modal] Order data:", order);

    // Send email if status is Completed/Canceled
    if (status === "Completed" || status === "Canceled") {
      if (order?.Client_Email) {
        const emailData = {
          to_email: order.Client_Email,
          client_name: order.Client_Name || "Valued Customer",
          job_order_number: order.Job_Order_Number,
          status: status,
          tailor_shop: Tailor_Shop_Name || "Our Tailor Shop",
          product_name: order.Product_Name,
          order_type: order.Order_Type,
          completion_date: new Date().toLocaleDateString(),
          isCompleted: status === "Completed",
        };

        console.log("[Email] Sending with data:", emailData);

        emailjs
          .send(
            "service_3v21zqa",
            "template_sss263h",
            emailData,
            "ctn-kzvtxyyiPma5K"
          )
          .then(() => {
            console.log("[Email] Successfully sent status:", status);
          })
          .catch((error) => {
            console.error("[Email] Send error:", error);
          });
      }
    }

    // Propagate status update to parent with remarks
    if (onUpdateStatus) {
      console.log(
        "[Modal] Calling parent update with:",
        order.Job_Order_Number,
        status,
        remarks // Pass remarks to the parent
      );
      onUpdateStatus(order.Job_Order_Number, status, remarks); // Include remarks in the update
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
      <div className='w-80 py-4 px-5 bg-white rounded-lg'>
        <div className='flex justify-between'>
          <label className='pl-2 text-xl font-semibold'>
            JO{" "}
            <span>
              {order.Job_Order_Number
                ? order.Job_Order_Number.toString().padStart(4, "0")
                : ""}
            </span>
          </label>
          <div className='rounded-lg items-center font-medium px-3 bg-[#cccccc]'>
            <label className='text-xs'>{status}</label>
          </div>
        </div>
        <div className='border-t border-gray-100 mt-3 mb-3' />
        <div className='pl-2 text-[#A3A3A3]'>
          <p>Client Name: {clientName}</p>
          <p>Client Email: {clientEmail}</p>
          <p>Measurements: {measurements}</p>
          <div className='mt-3'>
            <label>Remarks:</label>
            <textarea
              value={remarks}
              onChange={handleRemarksChange}
              className='w-full mt-1 p-2 border rounded resize-none'
              placeholder='Enter remarks...'
              disabled
            />
          </div>
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
            <option value='Pending'>Pending</option>
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
