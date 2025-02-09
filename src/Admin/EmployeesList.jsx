import React, { useState, useEffect } from "react";
import AdminSidebar from "/src/components/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "../firebase";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import EmployeeModal from "../components/EmployeeModal";

export default function EmployeesList() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);
  const [Tailor_Shop_Name, setTailorShopName] = useState("");
  const [Complete_Address, setCompleteAddress] = useState("");
  const [Tailor_Shop_Employee, setEmployees] = useState([]); // State for employees
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
          setCompleteAddress(userDoc.data().Complete_Address);
        }

        setUser(user);

        // Fetch employees data
        fetchEmployees(user.uid);
      } else {
        navigate("/AdminLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Function to fetch employees from Firestore
  const fetchEmployees = async (adminId) => {
    try {
      // Reference to the subcollection
      const employeesRef = collection(
        db,
        "Administrator",
        adminId,
        "Tailor_Shop_Employee"
      );

      // Get all documents from the subcollection
      const querySnapshot = await getDocs(employeesRef);

      // Extract employee data
      const employeesData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Include document ID
        ...doc.data(),
      }));

      setEmployees(employeesData);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
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

      <div class='p-4 sm:ml-64 bg-gray-100 dark:bg-gray-800 h-screen'>
        <h1 className='text-2xl font-semibold mb-2'>Employees</h1>

        <div class='mt-6 relative overflow-x-auto'>
          <table class='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' class='px-6 py-3'>
                  Name
                </th>
                <th scope='col' class='px-6 py-3'>
                  Email
                </th>
                <th scope='col' class='px-6 py-3'>
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody>
              {Tailor_Shop_Employee.length > 0 ? (
                Tailor_Shop_Employee.map((employee) => (
                  <EmployeeModal key={employee.id} employee={employee} />
                ))
              ) : (
                <tr>
                  <td className='px-6 py-4' colSpan='3'>
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
