import React, { useState } from "react";
import StickerClose from "/src/assets/images/StickerClose.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  collectionGroup,
} from "firebase/firestore";

export default function MainLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Sign in the user using Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // 1. Check if the user is a Client (assuming you have a "Client" collection)
      const clientRef = doc(db, "Client", user.uid);
      const clientDoc = await getDoc(clientRef);
      if (clientDoc.exists()) {
        navigate("/ClientHomepage");
        return;
      }

      // 2. Check if the user is an Administrator
      // We assume that your Administrator documents have a field `Head_ID` equal to the admin's UID.
      const adminQuery = query(
        collection(db, "Administrator"),
        where("Head_ID", "==", user.uid)
      );
      const adminQuerySnapshot = await getDocs(adminQuery);
      if (!adminQuerySnapshot.empty) {
        navigate("/AdminJobOrder");
        return;
      }

      // 3. Check if the user is a Tailor Shop Employee
      // Using a collection group query to search across all Tailor_Shop_Employee subcollections
      const employeeQuery = query(
        collectionGroup(db, "Tailor_Shop_Employee"),
        where("Tailor_ID", "==", user.uid)
      );
      const employeeQuerySnapshot = await getDocs(employeeQuery);
      if (!employeeQuerySnapshot.empty) {
        navigate("/EmployeeJobOrder");
        return;
      }

      // If the user is not found in any of the collections
      setError("Error logging in: User type not found.");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setError("User not found");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect email or password.");
      } else {
        setError("Error logging in.");
      }
    }
  };

  return (
    <div className='min-h-screen place-items-center flex justify-center bg-[#20262B]'>
      <div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8'>
        <div className='flex justify-end'>
          <a href='/'>
            <button className='flex bg-[#fefefe] rounded-full'>
              <img
                src={StickerClose}
                className='w-10 p-2 rounded-full hover:bg-[#f6f6f6]'
                alt='Close'
              />
            </button>
          </a>
        </div>
        <form className='space-y-5' onSubmit={handleLogin}>
          <div className='flex items-center'>
            <h5 className='text-xl font-medium text-gray-900'>
              Log in to Sewift
            </h5>
          </div>

          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={formData.email}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              required
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='••••••••'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              required
            />
          </div>
          <div className='flex items-start'>
            <a
              href='#'
              className='ms-auto text-sm text-blue-700 hover:underline'
            >
              Lost Password?
            </a>
          </div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                       px-5 py-2.5 text-center'
          >
            Login to your account
          </button>
          <div className='text-sm font-medium text-gray-500 text-center'>
            Not registered?{" "}
            <a href='/Signup' className='text-blue-700 hover:underline'>
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
