import React, { useEffect, useState } from "react";
import ClientHeader from "/src/components/ClientHeader.jsx";
import Placeholder from "/src/assets/images/Placeholder.jpg";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

export default function ClientOrder() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // New state for zoomed image modal
  const [zoomedImage, setZoomedImage] = useState(null); // New state for zoomed image
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get client user details from the "Client" collection.
        const userDoc = await getDoc(doc(db, "Client", user.uid));
        if (userDoc.exists()) {
          setFirstName(userDoc.data().First_Name || "Client");
        }
        setUser(user);

        // Fetch orders from the subcollection "Orders" under the current Client document.
        const ordersRef = collection(db, "Client", user.uid, "Orders");
        const ordersSnapshot = await getDocs(ordersRef);
        const fetchedOrders = [];
        ordersSnapshot.forEach((orderDoc) => {
          fetchedOrders.push({
            id: orderDoc.id,
            ...orderDoc.data(),
          });
        });
        setOrders(fetchedOrders);
      } else {
        navigate("/ClientLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Cancel order: Delete the order document from the client's Orders subcollection.
  const handleCancel = async (orderId) => {
    try {
      await deleteDoc(doc(db, "Client", user.uid, "Orders", orderId));
      // Remove the cancelled order from the local state.
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Error cancelling order. Please try again.");
    }
  };

  // Open modal and set selected order
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Handle receipt image upload
  const handleReceiptImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open zoomed image modal
  const openImageModal = (image) => {
    setZoomedImage(image);
    setIsImageModalOpen(true);
  };

  // Close zoomed image modal
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setZoomedImage(null);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='min-h-screen mb-6 bg-[#fefefe]'>
      <ClientHeader username={firstName || "Client"} />

      <h1 className='mx-7 my-6 text-4xl font-medium'>Order Progress</h1>
      <div className='mx-7 space-y-4'>
        {orders.map((order, index) => (
          <div
            key={order.id}
            className='flex items-center justify-between p-5 border shadow cursor-pointer'
            onClick={() => openModal(order)}
          >
            <div className='flex items-center'>
              <img
                src={order.Photo_of_Product || Placeholder}
                className='object-cover w-40 h-40 cursor-pointer'
                alt='School Skirt'
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the parent onClick from firing
                  openImageModal(order.Photo_of_Product || Placeholder);
                }}
              />
              <div className='pl-7'>
                <label className='block text-xl font-medium'>
                  {order.Product_Name || "Unnamed Product"}
                </label>
                <label className='block text-[#7f7f7f]'>
                  Job Order Number: {String(index + 1).padStart(4, "0")}
                </label>
                <label className='block text-[#7f7f7f]'>
                  Status: {order.Status || "Pending"}
                </label>
                <label className='block text-[#7f7f7f]'>
                  Date Ordered:{" "}
                  {order.Order_Date?.toDate().toLocaleDateString() || "N/A"}
                </label>
                <label className='block text-[#7f7f7f]'>
                  Payment: {order.Price || "N/A"}
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg w-11/12 w-96'>
            <h2 className='text-2xl font-bold mb-4'>
              {selectedOrder.Product_Name || "Unnamed Product"}
            </h2>
            <div className='flex flex-col md:flex-row items-start mb-4'>
              <div className='flex-1'>
                <p className='text-[#7f7f7f]'>
                  Job Order Number: JO{" "}
                  {String(orders.indexOf(selectedOrder) + 1).padStart(4, "0")}
                </p>
                <p className='text-[#7f7f7f]'>
                  Status: {selectedOrder.Status || "Pending"}
                </p>
                <p className='text-[#7f7f7f]'>
                  Date Ordered:{" "}
                  {selectedOrder.Order_Date?.toDate().toLocaleDateString() ||
                    "N/A"}
                </p>
                <p className='text-[#7f7f7f]'>
                  Total Payment: {selectedOrder.Price || ""}
                </p>
              </div>
            </div>

            {/* Receipt Image Upload Field */}
            <div className='mt-4'>
              {/* Reference Number Input */}
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-900 mb-1'>
                  Reference Number
                </label>
                <input
                  type='text'
                  id='small-input'
                  className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Enter reference number'
                />
              </div>

              {/* Receipt Upload Section */}
              <div>
                <label className='block text-sm font-medium text-gray-900 mb-2'>
                  Upload Receipt Verification
                </label>
                <div className='flex items-center space-x-4'>
                  {/* Receipt Preview */}
                  <div className='flex-shrink-0'>
                    {receiptPreview ? (
                      <img
                        src={receiptPreview}
                        alt='Receipt Preview'
                        className='w-20 h-20 object-cover rounded-lg border border-gray-200'
                      />
                    ) : (
                      <div className='w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200'>
                        <span className='text-xs text-gray-400'>No Image</span>
                      </div>
                    )}
                  </div>

                  {/* File Upload Input */}
                  <div className='flex-grow'>
                    <label
                      htmlFor='receipt-upload'
                      className='cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >
                      Choose File
                    </label>
                    <input
                      id='receipt-upload'
                      type='file'
                      className='hidden'
                      onChange={handleReceiptImageUpload}
                    />
                    <p className='pl-1 mt-3 text-xs text-gray-500'>
                      Upload a receipt image (JPEG, PNG, etc.)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className='flex justify-end mt-6 space-x-2'>
              <button
                onClick={closeModal}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300'
              >
                Close
              </button>
              <button
                onClick={closeModal}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300'
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
