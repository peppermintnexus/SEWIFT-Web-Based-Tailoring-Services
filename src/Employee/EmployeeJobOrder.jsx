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
  const ordersPerPage = 10; // Orders per page

  // Calculate counts for each category based on the selected category
  const getFilteredOrders = (category) => {
    return jobOrders.filter((order) => {
      if (category === "All") {
        return order.Status !== "Completed" && order.Status !== "Canceled";
      } else if (category === "Pending") {
        return order.Status === "Pending";
      } else if (category === "In Progress") {
        return order.Status === "In Progress";
      } else {
        return (
          order.Order_Type?.toLowerCase() === category.toLowerCase() &&
          order.Status !== "Completed" &&
          order.Status !== "Canceled"
        );
      }
    });
  };

  const filteredJobOrders = getFilteredOrders(selectedCategory);

  const totalOrders = jobOrders.filter(
    (order) => order.Status !== "Completed" && order.Status !== "Canceled"
  ).length;
  const pendingOrders = jobOrders.filter(
    (order) => order.Status === "pending"
  ).length;
  const inProgressOrders = jobOrders.filter(
    (order) => order.Status === "In Progress"
  ).length;

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

        {/* Category Buttons */}
        <div className='flex gap-4 mb-4'>
          <div
            onClick={() => handleCategoryClick("All")}
            className='flex-1 p-4 bg-white dark:bg-gray-700 rounded-lg shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-all'
          >
            <h3 className='text-lg font-semibold'>Total Orders</h3>
            <p className='text-2xl'>{totalOrders}</p>
          </div>
          <div
            onClick={() => handleCategoryClick("Pending")}
            className='flex-1 p-4 text-yellow-800 bg-yellow-100 dark:bg-gray-700 rounded-lg shadow cursor-pointer hover:bg-yellow-200 dark:hover:bg-gray-600'
          >
            <h3 className='text-lg font-semibold'>Pending Orders</h3>
            <p className='text-2xl'>{pendingOrders}</p>
          </div>
          <div
            onClick={() => handleCategoryClick("In Progress")}
            className='flex-1 p-4 text-blue-900 bg-blue-100 dark:bg-gray-700 rounded-lg shadow cursor-pointer hover:bg-blue-200 dark:hover:bg-gray-600'
          >
            <h3 className='text-lg font-semibold'>In Progress Orders</h3>
            <p className='text-2xl'>{inProgressOrders}</p>
          </div>
        </div>

        {/* Orders Table */}
        <div
          className='rounded-lg overflow-x-auto bg-white'
          style={{ height: "400px", overflowY: "auto" }}
        >
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr className='bg-[#20262B]'>
                <th className='px-3 py-3 text-left'>Job Order Number</th>
                <th className='py-3 text-center'>Product</th>
                <th className='py-3 text-center'>Quantity</th>
                <th className='py-3 text-center'>Order Type</th>
                <th className='py-3 text-center'>Order Date</th>
                <th className='py-3 text-center'>Total Price</th>
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

                    {/* Quantity */}
                    <td className='text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {order.Quantity || "Untitled Order"}
                    </td>

                    {/* Order Type column */}
                    <td className='px-4 py-2 text-center align-middle'>
                      {order.Order_Type || "N/A"}
                    </td>

                    {/* Created At column */}
                    <td className='text-center py-2 text-center align-middle'>
                      {order.Order_Date?.toDate().toLocaleDateString() || "N/A"}
                    </td>

                    {/* Price */}
                    <td className='px-4 py-2 text-center align-middle'>
                      ₱{(order.Total_Price || 0).toLocaleString()}
                    </td>

                    {/* Status column */}
                    <td className='text-center py-2 text-center align-middle'>
                      <span
                        className={`text-center px-2 py-1 text-xs font-medium rounded capitalize ${
                          order.Status === "Pending"
                            ? ""
                            : order.Status === "In Progress"
                            ? ""
                            : order.Status === "Completed"
                            ? ""
                            : order.Status === "Claimed"
                            ? ""
                            : order.Status === "Canceled"
                            ? ""
                            : ""
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
        <nav aria-label='Page navigation example'>
          <ul className='mt-3 flex items-center -space-x-px h-8 text-sm'>
            {/* Previous Button */}
            <li>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <span className='sr-only'>Previous</span>
                <svg
                  className='w-2.5 h-2.5 rtl:rotate-180'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 6 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 1 1 5l4 4'
                  />
                </svg>
              </button>
            </li>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isCurrentPage = currentPage === pageNumber;

              return (
                <li key={pageNumber}>
                  <button
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      isCurrentPage
                        ? "z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                    aria-current={isCurrentPage ? "page" : undefined}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}

            {/* Next Button */}
            <li>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <span className='sr-only'>Next</span>
                <svg
                  className='w-2.5 h-2.5 rtl:rotate-180'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 6 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 9 4-4-4-4'
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>

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
