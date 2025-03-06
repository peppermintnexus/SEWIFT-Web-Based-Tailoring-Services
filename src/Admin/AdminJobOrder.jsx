import React, { useState, useEffect } from "react";
import AdminSidebar from "/src/components/AdminSidebar";
import JobOrderModal from "/src/components/JobOrderModal";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import moment from "moment"; // Import moment for date comparison

export default function AdminOrders() {
  const [user, setUser] = useState(null);
  const [Tailor_Shop_Name, setTailorShopName] = useState("");
  const [Complete_Address, setCompleteAddress] = useState("");
  const [jobOrders, setJobOrders] = useState([]);
  const [selectedJobOrder, setSelectedJobOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10); // Number of orders per page
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const adminDocRef = doc(db, "Administrator", user.uid);
        const adminDoc = await getDoc(adminDocRef);

        if (adminDoc.exists()) {
          const adminData = adminDoc.data();
          setTailorShopName(adminData.Tailor_Shop_Name || "Tailor Shop Name");
          setCompleteAddress(adminData.Complete_Address || "Address Not Set");
          setJobOrders(adminData.Order_List || []);
        }

        setUser(user);
      } else {
        navigate("/AdminLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Function to handle category clicks
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  // Filter orders based on selected category, date, and exclude Completed/Canceled orders
  const filteredJobOrders = jobOrders.filter((order) => {
    const orderDate = order.Order_Date?.toDate();
    const isDateMatch = selectedDate
      ? moment(orderDate).isSame(selectedDate, "day")
      : true;

    if (selectedCategory === "All") {
      return (
        order.Status !== "Completed" &&
        order.Status !== "Canceled" &&
        isDateMatch
      );
    } else if (selectedCategory === "Pending") {
      return order.Status === "Pending" && isDateMatch;
    } else if (selectedCategory === "In Progress") {
      return order.Status === "In Progress" && isDateMatch;
    } else {
      return (
        order.Order_Type?.toLowerCase() === selectedCategory.toLowerCase() &&
        order.Status !== "Completed" &&
        order.Status !== "Canceled" &&
        isDateMatch
      );
    }
  });

  // Calculate counts for each category
  const totalOrders = jobOrders.filter(
    (order) => order.Status !== "Completed" && order.Status !== "Canceled"
  ).length;
  const pendingOrders = jobOrders.filter(
    (order) => order.Status === "Pending"
  ).length;
  const inProgressOrders = jobOrders.filter(
    (order) => order.Status === "In Progress"
  ).length;

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredJobOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredJobOrders.length / ordersPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleJobOrderClick = (order) => {
    setSelectedJobOrder(order);
  };

  const closeJobOrderModal = () => {
    setSelectedJobOrder(null);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AdminSidebar
        Tailor_Shop_Name={Tailor_Shop_Name || ""}
        Complete_Address={Complete_Address || ""}
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
                    colSpan='5'
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
                    {/* Job Order Number column */}
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
                    <td className='px-4 py-2 text-center align-middle capitalize'>
                      {order.Order_Type || "N/A"}
                    </td>

                    {/* Order Date column */}
                    <td className='text-center py-2 text-center align-middle'>
                      {order.Order_Date?.toDate().toLocaleDateString() || "N/A"}
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
                    onClick={() => handlePageChange(pageNumber)}
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
