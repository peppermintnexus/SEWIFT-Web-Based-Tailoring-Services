import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import EmployeeSidebar from "/src/components/EmployeeSidebar";

export default function EmployeeSettings() {
  const [employee, setEmployee] = useState({
    Name: "",
    Phone_Number: "",
    Email_Address: "",
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const adminID = "Administrator"; // Replace with actual admin ID
      const employeeID = "Tailor_Shop_Employee"; // Replace with actual employee ID

      const employeeRef = doc(
        db,
        "Administrator",
        adminID,
        "Tailor_Shop_Employee",
        employeeID
      );

      try {
        const employeeSnap = await getDoc(employeeRef);

        if (employeeSnap.exists()) {
          console.log("Employee Data:", employeeSnap.data()); // ✅ Debugging
          setEmployee(employeeSnap.data());
        } else {
          console.log("No such employee!");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <div>
      <EmployeeSidebar />
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
                value={employee?.Name || ""}
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
                value={employee?.Phone_Number || ""}
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
                value={employee?.Email_Address || ""}
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
                type='text'
                value={employee?.Phone_Number || ""}
                readOnly
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>

            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Confirm Password
              </label>
              <input
                type='text'
                value={employee?.Email_Address || ""}
                readOnly
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
