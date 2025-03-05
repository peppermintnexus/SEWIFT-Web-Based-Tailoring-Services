import React, { useState, useEffect } from "react";
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

export default function EmployeeSettings() {
  const [employee, setEmployee] = useState({
    Name: "",
    Phone_Number: "",
    Email_Address: "",
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

          // Set the employee data in the state
          setEmployee({
            Name: employeeData.Name || "",
            Phone_Number: employeeData.Phone_Number || "",
            Email_Address: employeeData.Email_Address || "",
          });
        }
      } else {
        navigate("/EmployeeLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <EmployeeSidebar firstName={employee.Name} />

      <div className='p-4 sm:ml-64 bg-gray-100 dark:bg-gray-800 min-h-screen'>
        <h1 className='text-2xl font-semibold mb-2'>Settings</h1>

        <div className='shadow w-full p-5 bg-white'>
          <h1 className='text-xl'>Personal Information</h1>
          <div className='border-t border-gray-100 mt-4 mb-3' />

          <div className='grid grid-cols-2 gap-9'>
            <div className='mb-3'>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Name
              </label>
              <input
                type='text'
                value={employee.Name}
                readOnly
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-9'>
            <div className='mb-6'>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Phone Number
              </label>
              <input
                type='text'
                value={employee.Phone_Number}
                readOnly
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>

            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Email Address
              </label>
              <input
                type='text'
                value={employee.Email_Address}
                readOnly
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
          </div>
          <div className='mt-6 justify-self-end'>
            <button className='text-white text-sm px-4 rounded-lg py-3 bg-[#111827] font-medium'>
              Edit
            </button>
          </div>
        </div>

        <div className='shadow w-full mt-5 p-5 bg-white'>
          <h1 className='text-xl'>Change Password</h1>
          <div className='border-t border-gray-100 mt-4 mb-3' />

          <div className='grid grid-cols-2 gap-9'>
            <div className='mb-6'>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                New Password
              </label>
              <input
                type='password'
                placeholder='New Password'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>

            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Confirm Password
              </label>
              <input
                type='password'
                placeholder='Confirm Password'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
          </div>
          <div className='mt-6 justify-self-end'>
            <button className='text-white text-sm px-4 rounded-lg py-3 bg-[#111827] font-medium'>
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
