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

export default function EmployeeTransactionHistory() {
  const [user, setUser] = useState(null);
  const [jobOrders, setJobOrders] = useState([]);
  const [Tailor_Shop_Name, setTailorShopName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [selectedJobOrder, setSelectedJobOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        const employeeQuery = query(
          collectionGroup(db, "Tailor_Shop_Employee"),
          where("Tailor_ID", "==", user.uid)
        );
        const querySnapshot = await getDocs(employeeQuery);

        if (!querySnapshot.empty) {
          const employeeDoc = querySnapshot.docs[0];
          const employeeData = employeeDoc.data();
          setFirstName(employeeData.name || "Employee Name");
          const Head_ID = employeeData.Head_ID;

          if (!Head_ID) return;

          const headDocRef = doc(db, "Administrator", Head_ID);
          const headDoc = await getDoc(headDocRef);

          if (headDoc.exists()) {
            const headData = headDoc.data();
            setTailorShopName(headData.Tailor_Shop_Name || "Tailor Shop Name");
            setJobOrders(headData.Order_List || []);
          }
        }
      } else {
        navigate("/EmployeeLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredJobOrders = (
    selectedCategory === "All"
      ? jobOrders
      : jobOrders.filter(
          (order) =>
            order.Order_Type?.toLowerCase() === selectedCategory.toLowerCase()
        )
  ).filter(
    (order) => order.Status === "Completed" || order.Status === "Canceled"
  );

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <EmployeeSidebar
        firstName={firstName}
        Tailor_Shop_Name={Tailor_Shop_Name}
      />
      <div className='px-6 py-4 sm:ml-64 bg-gray-100 dark:bg-gray-800 min-h-screen'>
        <h1 className='text-2xl font-semibold mb-2'>Transaction History</h1>
        <div className='flex mb-2'>
          {["All", "Premade", "Customized", "Adjust"].map((category) => (
            <button
              key={category}
              type='button'
              onClick={() => handleCategoryClick(category)}
              className={`py-2 px-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-200 ${
                selectedCategory === category ? "bg-gray-200" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className='rounded-lg'>
          <div className='grid'>
            {filteredJobOrders.length === 0 ? (
              <p className='text-gray-600'>No job orders found.</p>
            ) : (
              filteredJobOrders.map((order, index) => (
                <div
                  key={index}
                  className='mb-3 flex rounded-lg gap-4 shadow bg-white border p-4'
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
                            : "bg-red-200 text-red-800"
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
                      {order.Order_Date?.toDate().toLocaleDateString() || "N/A"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
