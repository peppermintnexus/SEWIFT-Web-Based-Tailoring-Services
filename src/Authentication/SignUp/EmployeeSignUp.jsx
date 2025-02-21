import React, { useState, useEffect } from "react";
import Textbox from "/src/components/Textbox.jsx";
import { useNavigate } from "react-router";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  setPersistence,
} from "firebase/auth";
import { auth, db } from "../../firebase";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tailorShopName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [shopNames, setShopNames] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const firestore = getFirestore();
  const firebaseAuth = getAuth();

  // Fetch tailor shop names
  useEffect(() => {
    const fetchShopNames = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "Administrator")
        );
        const shops = querySnapshot.docs
          .map((doc) => doc.data().Tailor_Shop_Name)
          .filter(Boolean);
        setShopNames(shops);
      } catch (err) {
        console.error("Error fetching shop names:", err);
      }
    };
    fetchShopNames();
  }, [firestore]);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Capitalize the first letter for the name field
    if (name === "name") {
      newValue = capitalizeFirstLetter(value);
    }

    // Allow only numeric input for phoneNumber field and limit to 11 digits
    if (name === "phoneNumber") {
      newValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      if (newValue.length > 11) {
        newValue = newValue.slice(0, 11); // Limit to 11 digits
      }
    }

    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const createUserInFirestore = async (user) => {
    try {
      // Find admin document with matching shop name
      const adminQuerySnapshot = await getDocs(
        collection(firestore, "Administrator")
      );
      const adminDoc = adminQuerySnapshot.docs.find(
        (doc) => doc.data().Tailor_Shop_Name === formData.tailorShopName
      );

      if (!adminDoc) {
        throw new Error("Associated tailor shop not found");
      }

      const adminID = adminDoc.id;

      // Create employee document in subcollection
      const employeeRef = doc(
        firestore,
        "Administrator",
        adminID,
        "Tailor_Shop_Employee",
        user.uid
      );
      await setDoc(employeeRef, {
        Email_Address: formData.email,
        Head_ID: adminID,
        Name: formData.name,
        Phone_Number: formData.phoneNumber,
        Tailor_ID: user.uid,
      });
    } catch (err) {
      console.error("Error creating user in Firestore:", err);
      setError("Failed to create employee record");
    }
  };

  const handleEmailVerification = async (user) => {
    try {
      await sendEmailVerification(user);
      console.log("Email verification sent");
    } catch (error) {
      console.error("Error sending email verification:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if password is exactly 10 characters long
    if (formData.password.length !== 10) {
      window.alert("Password must be exactly 10 characters long.");
      return;
    }

    // Check if phone number is exactly 11 digits long
    if (formData.phoneNumber.length !== 11) {
      window.alert("Phone number must be exactly 11 digits.");
      return;
    }

    try {
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Set session persistence
      await setPersistence(firebaseAuth, browserSessionPersistence);

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Create user in Firestore
      await createUserInFirestore(user);

      // Send email verification
      await handleEmailVerification(user);

      // Navigate to the EmployeeJobOrder page
      navigate("/EmployeeJobOrder");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message || "Failed to create account");
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={handleSignUp}>
        <div className='w-full px-1 overflow-hidden box-border'>
          <div className='mb-2'>
            <p className='block mb-1 text-sm font-medium text-gray-900'>Name</p>
            <input
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              required
            />
          </div>

          <div className='grid grid-cols-2 gap-7 mb-2'>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900'>
                Tailor Shop
              </p>
              <select
                name='tailorShopName'
                value={formData.tailorShopName}
                onChange={handleInputChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                required
              >
                <option value=''>Select a Shop</option>
                {shopNames.map((shopName, index) => (
                  <option key={index} value={shopName}>
                    {shopName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900'>
                Phone Number
              </p>
              <input
                type='tel'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleInputChange}
                maxLength={11} // Enforce maximum length of 11 digits
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                required
              />
            </div>
          </div>

          <div className='mb-2'>
            <p className='block mb-1 text-sm font-medium text-gray-900'>
              Email Address
            </p>
            <input
              name='email'
              type='email'
              value={formData.email}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              required
            />
          </div>

          <div className='grid grid-cols-2 gap-7 mb-2'>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900'>
                Password
              </p>
              <input
                name='password'
                type='password'
                placeholder='••••••••'
                value={formData.password}
                onChange={handleInputChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                required
              />
            </div>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900'>
                Confirm Password
              </p>
              <input
                name='confirmPassword'
                type='password'
                placeholder='••••••••'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                required
              />
            </div>
          </div>

          <div className='text-center mt-7 mb-3'>
            <button
              className='font-semibold rounded-lg px-6 py-1.5 text-white bg-blue-700 hover:shadow-md'
              type='submit'
            >
              Sign up
            </button>
            <div className='text-sm pt-2 font-medium text-gray-500 text-center'>
              Already have an account?{" "}
              <a href='/MainLogin' className='text-blue-700 hover:underline'>
                Log in
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
