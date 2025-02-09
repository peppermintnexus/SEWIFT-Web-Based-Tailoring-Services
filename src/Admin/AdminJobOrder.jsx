import React, { useState, useEffect } from "react";
import AdminSidebar from "/src/components/AdminSidebar";
import JobOrderModal from "/src/components/JobOrderModal";
import { useNavigate } from "react-router";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

export default function AdminHomepage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);
  const [Tailor_Shop_Name, setTailorShopName] = useState("");
  const [Complete_Address, setCompleteAddress] = useState("");
  const [jobOrders, setJobOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedJobOrder, setSelectedJobOrder] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  // Authenticate admin and fetch their data including job orders
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userToken = await getIdToken(user);
        setToken(userToken);

        // Fetch admin document from Firestore
        const userDoc = await getDoc(doc(db, "Administrator", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name);
          setTailorShopName(data.Tailor_Shop_Name);
          setCompleteAddress(data.Complete_Address || "");
          // Read the Order_List array from the admin document
          setJobOrders(data.Order_List || []);
        }
        setUser(user);
      } else {
        navigate("/AdminLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Toggle dropdown (if needed for further controls)
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Update the filter state when a filter button is clicked
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Filter job orders based on the selected filter
  const filteredJobOrders =
    filter === "All"
      ? jobOrders
      : jobOrders.filter((order) => order.Status === filter);

  // When a job order card is clicked, show the modal with details
  const handleJobOrderClick = (order) => {
    setSelectedJobOrder(order);
  };

  // Close the job order modal
  const closeJobOrderModal = () => {
    setSelectedJobOrder(null);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex'>
      {/* Sidebar */}
      <AdminSidebar
        Tailor_Shop_Name={Tailor_Shop_Name || ""}
        Complete_Address={Complete_Address || ""}
      />

      {/* Main Content */}
      <div className='p-4 sm:ml-64 bg-gray-100 dark:bg-gray-800 min-h-screen h-full flex-1'>
        <h1 className='text-2xl font-semibold mb-4'>Orders</h1>

        {/* Filter Buttons */}
        <div className='flex mb-4 gap-2 flex-wrap'>
          {["All", "Pending", "Ongoing", "Finished", "Claimed", "Canceled"].map(
            (status) => (
              <button
                key={status}
                type='button'
                onClick={() => handleFilterChange(status)}
                className={`py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border 
                  ${filter === status ? "bg-blue-300" : "hover:bg-gray-200"} 
                  focus:outline-none`}
              >
                {status}
              </button>
            )
          )}
        </div>

        {/* Job Orders Listing */}
        <div className='grid grid-cols-1 gap-4'>
          {filteredJobOrders.length === 0 ? (
            <p className='text-gray-600'>
              No job orders found for this filter.
            </p>
          ) : (
            filteredJobOrders.map((order, index) => (
              <div
                key={index}
                onClick={() => handleJobOrderClick(order)}
                className='p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-100 flex gap-4'
              >
                {/* Photo section */}
                <div className='w-24 h-24 flex-shrink-0'>
                  {order.Photo_of_Product ? (
                    <img
                      src={order.Photo_of_Product}
                      alt={order.Product_Name}
                      className='object-cover w-full h-full rounded'
                    />
                  ) : (
                    <div className='w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500'>
                      No Image
                    </div>
                  )}
                </div>

                {/* Details section */}
                <div className='flex flex-col flex-grow'>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>
                      {order.Product_Name || "Untitled Order"}
                    </h2>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        order.Status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : order.Status === "Ongoing"
                          ? "bg-blue-200 text-blue-800"
                          : order.Status === "Finished"
                          ? "bg-green-200 text-green-800"
                          : order.Status === "Claimed"
                          ? "bg-indigo-200 text-indigo-800"
                          : order.Status === "Canceled"
                          ? "bg-red-200 text-red-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {order.Status}
                    </span>
                  </div>
                  <p className='text-sm text-gray-700 mt-2'>
                    Order Type: {order.Order_Type || "N/A"}
                  </p>
                  <p className='text-sm text-gray-700'>
                    Quantity: {order.Quantity || "N/A"} &nbsp; | &nbsp; Size:{" "}
                    {order.Size || "N/A"}
                  </p>
                  <p className='text-sm text-gray-500 mt-1'>
                    Created at:{" "}
                    {order.Created_At
                      ? new Date(
                          order.Created_At.seconds * 1000
                        ).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Job Order Modal */}
        {selectedJobOrder && (
          <JobOrderModal
            order={selectedJobOrder}
            onClose={closeJobOrderModal}
            adminId={user.uid}
          />
        )}
      </div>
    </div>
  );
}
