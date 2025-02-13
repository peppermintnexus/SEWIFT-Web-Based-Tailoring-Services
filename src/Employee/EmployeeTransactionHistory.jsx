// EmployeeTransactionHistory.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  collectionGroup,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import EmployeeSidebar from "/src/components/EmployeeSidebar";
import EmployeeJoModal from "/src/components/EmployeeJoModal";

export default function EmployeeTransactionHistory() {
  const [user, setUser] = useState(null);
  const [jobOrders, setJobOrders] = useState([]);
  const [Tailor_Shop_Name, setTailorShopName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [selectedJobOrder, setSelectedJobOrder] = useState(null);
  const navigate = useNavigate();

  const handleUpdateStatus = (jobOrderNumber, newStatus) => {
    setJobOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.Job_Order_Number === jobOrderNumber
          ? { ...order, Status: newStatus }
          : order
      )
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        console.log("User UID:", user.uid);

        // Query the Tailor_Shop_Employee subcollection by Tailor_ID
        const employeeQuery = query(
          collectionGroup(db, "Tailor_Shop_Employee"),
          where("Tailor_ID", "==", user.uid)
        );

        const querySnapshot = await getDocs(employeeQuery);

        if (!querySnapshot.empty) {
          const employeeDoc = querySnapshot.docs[0];
          const employeeData = employeeDoc.data();
          console.log("Employee Data:", employeeData);
          setFirstName(employeeData.name || "Employee Name");

          const Head_ID = employeeData.Head_ID;
          if (!Head_ID) {
            console.error("No Head_ID found for employee.");
            return;
          }

          // Fetch the Head_ID document
          const headDocRef = doc(db, "Administrator", Head_ID);
          const headDoc = await getDoc(headDocRef);

          if (headDoc.exists()) {
            const headData = headDoc.data();
            setTailorShopName(headData.Tailor_Shop_Name || "Tailor Shop Name");

            // Extract Order_List (array of maps)
            const orders = headData.Order_List || [];

            // Auto-assign job order numbers if they aren’t provided
            let maxJobOrderNumber = orders.reduce(
              (max, order) =>
                order.Job_Order_Number && order.Job_Order_Number > max
                  ? order.Job_Order_Number
                  : max,
              0
            );

            const ordersWithNumbers = orders.map((order) => {
              if (!order.Job_Order_Number) {
                maxJobOrderNumber += 1;
                return { ...order, Job_Order_Number: maxJobOrderNumber };
              }
              return order;
            });

            setJobOrders(ordersWithNumbers);
            console.log(
              "Fetched Orders with Job Order Numbers:",
              ordersWithNumbers
            );
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

  // Filter job orders to show only those with status "Completed" or "Canceled"
  const filteredJobOrders = jobOrders.filter(
    (order) => order.Status === "Completed" || order.Status === "Canceled"
  );

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <EmployeeSidebar
        firstName={firstName}
        Tailor_Shop_Name={Tailor_Shop_Name}
      />

      <div className='px-6 py-4 sm:ml-64 bg-gray-100 dark:bg-gray-800 min-h-screen'>
        <h1 className='text-2xl font-semibold mb-2'>Transaction History</h1>
        <div className='rounded-lg'>
          <div className='grid'>
            {filteredJobOrders.length === 0 ? (
              <p className='text-gray-600'>No job orders found.</p>
            ) : (
              filteredJobOrders.map((order, index) => (
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
                          order.Status === "Completed"
                            ? "bg-green-200 text-green-800"
                            : order.Status === "Canceled"
                            ? "bg-red-200 text-red-800"
                            : "bg-yellow-200 text-yellow-800"
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
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>
    </div>
  );
}
