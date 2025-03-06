import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";

export default function JobOrderModal({
  order,
  onClose,
  adminId,
  onUpdateStatus,
  Tailor_Shop_Name,
}) {
  const [employeeName, setEmployeeName] = useState("");
  const [clientName, setClientName] = useState("N/A");
  const [clientEmail, setClientEmail] = useState("N/A");
  const [measurements, setMeasurements] = useState("N/A");
  const [productName, setProductName] = useState("N/A");
  const [orderType, setOrderType] = useState("N/A");
  const [quantity, setQuantity] = useState("N/A");
  const [remarks, setRemarks] = useState(order?.Remarks || "");
  const [status, setStatus] = useState(order?.Status || "Pending");
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  useEffect(() => {
    emailjs.init("ctn-kzvtxyyiPma5K");
  }, []);

  useEffect(() => {
    const fetchEmployeeName = async () => {
      if (order?.Tailor_ID && adminId) {
        try {
          const employeeDoc = await getDoc(
            doc(
              db,
              "Administrator",
              adminId,
              "Tailor_Shop_Employee",
              order.Tailor_ID
            )
          );
          if (employeeDoc.exists()) {
            setEmployeeName(employeeDoc.data().Name);
          }
        } catch (error) {
          console.error("Error fetching employee name:", error);
        }
      }
    };

    if (order) {
      // Set client name
      if (Array.isArray(order.Order_List) && order.Order_List.length > 0) {
        const firstItem = order.Order_List[0];
        const name =
          firstItem.Client_Name || firstItem.clientName || firstItem.name;
        setClientName(name || "N/A");
      } else if (order.Client_Name) {
        setClientName(order.Client_Name);
      } else {
        setClientName("N/A");
      }

      // Set other fields
      setClientEmail(order.Client_Email || "N/A");
      setProductName(order.Product_Name || "N/A");
      setOrderType(order.Order_Type || "N/A");
      setQuantity(order.Quantity || "N/A");

      if (order.Measurements) {
        const formattedMeasurements = Object.entries(order.Measurements)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
        setMeasurements(formattedMeasurements);
      } else {
        setMeasurements("N/A");
      }

      setRemarks(order.Remarks || "");
    }

    fetchEmployeeName();
  }, [order, adminId]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  const handleUpdateStatus = () => {
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

    if (onUpdateStatus) {
      onUpdateStatus(order.Job_Order_Number, status, remarks);
    }
    onClose();
  };

  const toggleImageZoom = () => {
    setIsImageZoomed(!isImageZoomed);
  };

  useEffect(() => {
    setStatus(order?.Status || "Pending");
  }, [order]);

  if (!order) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
        <div className='w-72 py-3 px-4 bg-white rounded-lg'>
          <p>Loading order details...</p>
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

  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50'>
      <div className='w-full max-w-md sm:mx-96 py-4 px-5 bg-white rounded-lg max-h-[500px] overflow-y-auto'>
        {/* Header */}
        <div className='flex justify-between'>
          <label className='pl-2 text-xl font-semibold'>
            JO{" "}
            <span>
              {order.Job_Order_Number
                ? order.Job_Order_Number.toString().padStart(4, "0")
                : ""}
            </span>
          </label>
          <div
            className={`text-center px-2 py-1 text-xs font-medium rounded ${
              order.Status === "Pending"
                ? "bg-yellow-200 text-yellow-800"
                : order.Status === "In Progress"
                ? "bg-blue-200 text-blue-800"
                : order.Status === "Completed"
                ? "bg-green-200 text-green-800"
                : order.Status === "Claimed"
                ? "bg-indigo-200 text-indigo-800"
                : order.Status === "Canceled"
                ? "bg-red-200 text-red-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            <label className='text-xs capitalize'>{status}</label>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-100 mt-3 mb-3' />

        {/* Content */}
        <div className='pl-2 text-[#A3A3A3]'>
          <div className='grid grid-cols-2 mb-3 '>
            <p className='font-semibold'>{productName}</p>
            <p className='font-semibold capitalize'>{orderType}</p>
            <p className='font-semibold'>{quantity} pcs.</p>
          </div>
          <p>Client: {clientName}</p>
          <p>Email: {clientEmail}</p>
          <p>Measurements: {measurements}</p>

          {/* Remarks */}
          <div className='mt-3'>
            <label>Remarks:</label>
            <textarea
              value={remarks}
              onChange={handleRemarksChange}
              className='w-full mt-1 p-2 italic resize-none'
              placeholder='No remarks'
              disabled
            />
          </div>

          <p>Reference Number</p>

          {/* Receipt Image */}
          <div className='mt-2'>
            <p className='mb-1'>Receipt:</p>
            {order.Receipt_Image_Verification ? (
              <>
                <img
                  src={order.Receipt_Image_Verification}
                  alt='Receipt'
                  className='w-20 h-20 rounded border cursor-pointer'
                  onClick={toggleImageZoom}
                />
                {isImageZoomed && (
                  <div
                    className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50'
                    onClick={toggleImageZoom}
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

        {/* Buttons */}
        <div className='flex justify-end mt-4'>
          <button
            onClick={onClose}
            className='px-3 py-1 bg-gray-500 text-white rounded'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
