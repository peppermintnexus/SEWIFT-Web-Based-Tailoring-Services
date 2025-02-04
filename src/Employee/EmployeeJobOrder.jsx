import React, { useEffect, useState } from "react";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  collectionGroup,
  query,
  where,
  getDocs,
} from "firebase/firestore"; // Add missing imports
import EmployeeSidebar from "/src/components/EmployeeSidebar";
import EmployeeJoModal from "/src/components/EmployeeJoModal";

export default function EmployeeJobOrder() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [jobOrders, setJobOrders] = useState([]);
  const [Tailor_Shop_Name, setTailorShopName] = useState("");
  const [selectedJobOrder, setSelectedJobOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        // Step 1: Query the Tailor_Shop_Employee subcollection by Tailor_ID
        const employeeQuery = query(
          collectionGroup(db, "Tailor_Shop_Employee"),
          where("Tailor_ID", "==", user.uid) // Use your existing Tailor_ID field
        );

        const querySnapshot = await getDocs(employeeQuery);

        if (!querySnapshot.empty) {
          const employeeDoc = querySnapshot.docs[0];
          const employeeData = employeeDoc.data();
          const Head_ID = employeeData.Head_ID;

          // Step 2: Fetch the Head_ID document
          const headDocRef = doc(db, "Administrator", Head_ID);
          const headDoc = await getDoc(headDocRef);

          if (headDoc.exists()) {
            const headData = headDoc.data();
            setTailorShopName(headData.Tailor_Shop_Name || "Tailor Shop Name");

            // Step 3: Extract Order_List (array of maps)
            const orders = headData.Order_List || [];
            setJobOrders(orders);

            // Debug: Log the retrieved orders
            console.log("Fetched Orders:", orders);
          }
        }
      } else {
        navigate("/EmployeeLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleJobOrderClick = (order) => {
    setSelectedJobOrder(order);
  };

  const closeJobOrderModal = () => {
    setSelectedJobOrder(null);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <EmployeeSidebar Tailor_Shop_Name={Tailor_Shop_Name} />

      <div className='px-6 py-4 sm:ml-64 bg-gray-100 dark:bg-gray-800 h-screen'>
        <h1 className='text-2xl font-semibold mb-2'>Orders</h1>
        <div className='flex mb-2'>
          {["All", "Pending", "Ongoing", "Finished", "Claimed", "Canceled"].map(
            (status) => (
              <button
                key={status}
                type='button'
                className='py-2 px-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-00 hover:bg-gray-200 focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
              >
                {status}
              </button>
            )
          )}
        </div>
        <div className='rounded-lg'>
          <div className='grid mb-4'>
            {jobOrders.length === 0 ? (
              <p className='text-gray-600'>No job orders found.</p>
            ) : (
              jobOrders.map((order, index) => (
                <div
                  key={index}
                  onClick={() => handleJobOrderClick(order)}
                  className='mb-3 flex rounded-lg gap-4 shadow bg-white border dark:bg-white-800 p-4 cursor-pointer hover:bg-gray-100'
                >
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
        </div>

        {selectedJobOrder && (
          <EmployeeJoModal
            order={selectedJobOrder}
            onClose={closeJobOrderModal}
          />
        )}
      </div>
    </div>
  );
}
