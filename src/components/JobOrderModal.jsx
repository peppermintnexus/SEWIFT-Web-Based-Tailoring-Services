// JobOrderModal.jsx
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function JobOrderModal({ order, onClose, adminId }) {
  const [employeeName, setEmployeeName] = useState("");
  const [clientName, setClientName] = useState("N/A");

  // Debug: Detailed logging
  useEffect(() => {
    console.log("Full order object:", order);
  }, [order]);

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

    // Handle client name retrieval from the order object
    if (order) {
      if (Array.isArray(order.Order_List) && order.Order_List.length > 0) {
        const firstItem = order.Order_List[0];
        const name =
          firstItem.Client_Name || firstItem.clientName || firstItem.name;
        if (name) {
          setClientName(name);
        } else {
          console.warn("Client name not found in first item:", firstItem);
        }
      } else if (order.Client_Name) {
        setClientName(order.Client_Name);
      } else {
        console.warn("Order_List is undefined or empty");
        setClientName("N/A");
      }
    }

    fetchEmployeeName();
  }, [order, adminId]);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='w-72 py-3 px-4 bg-white rounded-lg'>
        <div className='flex justify-between'>
          <label className='pl-2 text-xl font-semibold dark:text-gray-400'>
            JO{" "}
            <span>
              {order.Job_Order_Number
                ? order.Job_Order_Number.toString().padStart(4, "0")
                : ""}
            </span>
          </label>
          <div className='rounded-lg items-center font-medium px-3 bg-[#ffdd94] dark:text-gray-400'>
            <label className='text-xs'>{order.Stage || "Pending"}</label>
          </div>
        </div>
        <div className='border-t border-gray-100 mt-3 mb-3' />
        <div className='pl-2 text-[#A3A3A3]'>
          <p>Client Name: {clientName}</p>
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
                alt='Receipt Verification'
                className='w-full h-auto rounded border'
              />
            ) : (
              <p>Not Uploaded</p>
            )}
          </div>
          <p className='mt-3'>
            Handled by <span>{employeeName || "Not Assigned"}</span>
          </p>
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
