import React, { useState } from "react";
import StickerClose from "/src/assets/images/StickerClose.png";
import ClientSignUp from "./ClientSignUp.jsx";
import AdminSignUp from "./AdminSignUp.jsx";
import EmployeeSignUp from "./EmployeeSignUp.jsx";

const SignUp = () => {
  const [selectedItem, setSelectedItem] = useState(<ClientSignUp />);
  const [selectedTab, setSelectedTab] = useState("Client"); // Track the active tab

  const handleItemClick = (item, tabName) => {
    setSelectedItem(item); // Update state with the clicked item's content
    setSelectedTab(tabName); // Set the active tab
  };

  return (
    <div className="min-h-screen place-items-center flex justify-center bg-[#20262B]">
      <div className="px-10 py-5 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-2 mb-5 flex justify-between">
          <div className="justify-self-start p-2 text-xl font-medium text-gray-900 dark:text-white">
            Create your account
          </div>
          <div>
            <button className="flex justify-self-end bg-[#fefefe] rounded-full">
              <a href="/">
                <img
                  src={StickerClose}
                  className="w-10 p-2 rounded-full hover:bg-[#f6f6f6]"
                  alt="Close"
                />
              </a>
            </button>
          </div>
        </div>

        <div className="sm:hidden">
          <select
            id="tabs"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Client</option>
            <option>Employee</option>
            <option>Admin</option>
          </select>
        </div>

        <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li
            onClick={() => handleItemClick(<ClientSignUp />, "Client")}
            className={`w-full inline-block p-3 border-r border-gray-200 rounded-s-lg dark:border-gray-700 ${
              selectedTab === "Client"
                ? "bg-[#10aeb2] text-white"
                : "hover:bg-[#10aeb2] hover:text-white"
            }`}
          >
            Client
          </li>
          <li
            onClick={() => handleItemClick(<EmployeeSignUp />, "Employee")}
            className={`w-full inline-block p-3 border-r border-gray-200 dark:border-gray-700 ${
              selectedTab === "Employee"
                ? "bg-[#ef9f5c] text-white"
                : "hover:bg-[#ef9f5c] hover:text-white"
            }`}
          >
            Employee
          </li>
          <li
            onClick={() => handleItemClick(<AdminSignUp />, "Admin")}
            className={`w-full inline-block p-3 border-r border-gray-200 rounded-e-lg dark:border-gray-700 ${
              selectedTab === "Admin"
                ? "bg-[#20262B] text-white"
                : "hover:bg-[#20262B] hover:text-white"
            }`}
          >
            Admin
          </li>
        </ul>

        <div className="mt-4">{selectedItem}</div>
      </div>
    </div>
  );
};

export default SignUp;
