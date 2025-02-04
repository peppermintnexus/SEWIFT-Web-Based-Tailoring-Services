import React, { useState, useEffect } from "react";
import AdminSidebar from "/src/components/AdminSidebar";
import OrderModal from "/src/components/OrderModal";
import { useNavigate } from "react-router";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminTransactionHistory() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);
  const [Tailor_Shop_Name, setTailorShopName] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userToken = await getIdToken(user);
        setToken(userToken);

        const userDoc = await getDoc(doc(db, "Administrator", user.uid));
        if (userDoc.exists()) {
          setName(userDoc.data().name);
          setTailorShopName(userDoc.data().Tailor_Shop_Name);
        }

        setUser(user);
      } else {
        navigate("/AdminLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AdminSidebar Tailor_Shop_Name={Tailor_Shop_Name || "Tailor Shop Name"} />

      <div class='p-4 sm:ml-64 bg-gray-100 dark:bg-gray-800 h-screen'>
        <h1 className='text-2xl font-semibold mb-2'>Transaction History</h1>
        <div className='flex mb-2'>
          <button
            type='button'
            class='py-2 px-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-00 hover:bg-[#4dd0e1] focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
          >
            All
          </button>
          <button
            type='button'
            class='py-2 px-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-00 hover:bg-[#ffbe88] focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
          >
            Claimed
          </button>
          <button
            type='button'
            class='py-2 px-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-00 hover:bg-[#fa897b] focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
          >
            Canceled
          </button>
        </div>
        <div class='rounded-lg'>
          <div class='grid mb-4'>
            <div class='flex rounded-sm gap-4 bg-white-50 dark:bg-white-800'>
              <OrderModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
