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
  updateDoc,
} from "firebase/firestore";
import EmployeeSidebar from "/src/components/EmployeeSidebar";
import EmployeeJoModal from "/src/components/EmployeeJoModal";

export default function EmployeeJobOrder() {
  const [user, setUser] = useState(null);
  const [jobOrders, setJobOrders] = useState([]);
  const [Tailor_Shop_Name, setTailorShopName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [selectedJobOrder, setSelectedJobOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [headID, setHeadID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const navigate = useNavigate();
  const ordersPerPage = 12; // Orders per page

  // Handler to update status (and Firestore) for a job order.
  const handleUpdateStatus = async (jobOrderNumber, newStatus) => {
    const updatedJobOrders = jobOrders.map((order) => {
      if (order.Job_Order_Number === jobOrderNumber) {
        return { ...order, Status: newStatus };
      }
      return order;
    });

    if (headID) {
      try {
        // 1. Update Administrator's Order_List
        const headDocRef = doc(db, "Administrator", headID);
        await updateDoc(headDocRef, {
          Order_List: updatedJobOrders,
          Tailor_Shop_Name: Tailor_Shop_Name,
        });

        // 2. Find the updated order to get clientId and orderId
        const updatedOrder = updatedJobOrders.find(
          (order) => order.Job_Order_Number === jobOrderNumber
        );

        // 3. Update Client's Orders subcollection if IDs exist
        if (updatedOrder && updatedOrder.clientId && updatedOrder.orderId) {
          const clientOrderRef = doc(
            db,
            "Client",
            updatedOrder.clientId,
            "Orders",
            updatedOrder.orderId
          );
          await updateDoc(clientOrderRef, { Status: newStatus });
        }
      } catch (error) {
        console.error("Firestore update error:", error);
      }
    }

    // Update local state
    if (newStatus === "Completed" || newStatus === "Canceled") {
      setJobOrders((prevOrders) =>
        prevOrders.filter((order) => order.Job_Order_Number !== jobOrderNumber)
      );
    } else {
      setJobOrders(updatedJobOrders);
    }

    closeJobOrderModal();
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
          // Save Head_ID to state for future Firestore updates.
          setHeadID(Head_ID);

          // Fetch the Head_ID document from Administrator collection.
          const headDocRef = doc(db, "Administrator", Head_ID);
          const headDoc = await getDoc(headDocRef);

          if (headDoc.exists()) {
            const headData = headDoc.data();
            setTailorShopName(headData.Tailor_Shop_Name || "Tailor Shop Name");

            // Extract Order_List (array of maps)
            const orders = headData.Order_List || [];

            // Auto-assign job order numbers if they aren’t provided.
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when the category changes
  };

  // Filter job orders based on the selected category and exclude orders that are already Completed/Canceled.
  const filteredJobOrders = (
    selectedCategory === "All"
      ? jobOrders
      : jobOrders.filter(
          (order) =>
            order.Order_Type?.toLowerCase() === selectedCategory.toLowerCase()
        )
  ).filter(
    (order) => order.Status !== "Completed" && order.Status !== "Canceled"
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredJobOrders.length / ordersPerPage);
  const currentOrders = filteredJobOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
        <h1 className='text-2xl font-semibold mb-2'>Orders</h1>

        <div className='flex items-center justify-between'>
          {/* Display Category-Specific Messages */}
          {selectedCategory === "All" && (
            <div className='mb-4'>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                You have <strong>{filteredJobOrders.length}</strong> orders.
              </p>
            </div>
          )}
          {selectedCategory === "Premade" && (
            <div className='mb-4'>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                You have{" "}
                <strong>
                  {
                    filteredJobOrders.filter(
                      (order) => order.Order_Type === "premade"
                    ).length
                  }
                </strong>{" "}
                premade orders.
              </p>
            </div>
          )}
          {selectedCategory === "Customized" && (
            <div className='mb-4'>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                You have{" "}
                <strong>
                  {
                    filteredJobOrders.filter(
                      (order) => order.Order_Type === "customized"
                    ).length
                  }
                </strong>{" "}
                customized orders.
              </p>
            </div>
          )}
          {selectedCategory === "Adjust" && (
            <div className='mb-4'>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                You have{" "}
                <strong>
                  {
                    filteredJobOrders.filter(
                      (order) => order.Order_Type === "adjust"
                    ).length
                  }
                </strong>{" "}
                adjust orders.
              </p>
            </div>
          )}

          {/* Dropdown for Category Selection */}
          <div className='mb-4 flex items-center gap-4'>
            <select
              onChange={(e) => handleCategoryClick(e.target.value)}
              value={selectedCategory}
              className='py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:focus:ring-blue-500'
            >
              {["All", "Premade", "Customized", "Adjust"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className='rounded-lg overflow-x-auto'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr className='bg-[#20262B]'>
                <th className='px-6 py-3 text-left'>Job Order Number</th>
                <th className='py-3 text-center'>Product</th>
                <th className='py-3 text-center'>Order Type</th>
                <th className='py-3 text-center'>Order Date</th>
                <th className='py-3 text-center'>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length === 0 ? (
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
                  <td
                    colSpan='7'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    No job orders found.
                  </td>
                </tr>
              ) : (
                currentOrders.map((order, index) => (
                  <tr
                    key={index}
                    onClick={() => handleJobOrderClick(order)}
                    className='cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                  >
                    {/* Job Order column */}
                    <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      JO{" "}
                      {order.Job_Order_Number
                        ? order.Job_Order_Number.toString().padStart(4, "0")
                        : ""}
                    </td>

                    {/* Product Name column */}
                    <td className='text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {order.Product_Name || "Untitled Order"}
                    </td>

                    {/* Order Type column */}
                    <td className='px-4 py-2 text-center align-middle'>
                      {order.Order_Type || "N/A"}
                    </td>

                    {/* Created At column */}
                    <td className='text-center py-2 text-center align-middle'>
                      {order.Order_Date?.toDate().toLocaleDateString() || "N/A"}
                    </td>

                    {/* Status column */}
                    <td className='text-center py-2 text-center align-middle'>
                      <span
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
                        {order.Status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className='flex justify-end mt-4 gap-2'>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className='px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className='px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Next
          </button>
        </div>

        {selectedJobOrder && (
          <EmployeeJoModal
            order={selectedJobOrder}
            onClose={closeJobOrderModal}
            onUpdateStatus={handleUpdateStatus}
            Tailor_Shop_Name={Tailor_Shop_Name}
          />
        )}
      </div>
    </div>
  );
}
