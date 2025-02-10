import React, { useState } from "react";
import Textbox from "/src/components/Textbox.jsx";
import {
  createUserWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, sendEmailVerification } from "firebase/auth";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    completeAddress: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();

  // Textbox
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createUserInFirestore = async (user, formData) => {
    try {
      await setDoc(doc(db, "Client", user.uid), {
        Client_ID: user.uid, // Add the user.uid as Client_ID
        Complete_Address: formData.completeAddress, // Map to Complete_Address
        Email_Address: formData.email, // Map to Email_Address
        First_Name: formData.firstName, // Map to First_Name
        Last_Name: formData.lastName, // Map to Last_Name
        Phone_Number: formData.phoneNumber, // Map to Phone_Number
      });
    } catch (err) {
      console.error(err);
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

  // Form
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      await setPersistence(auth, browserSessionPersistence);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await createUserInFirestore(user, formData);
      await handleEmailVerification(user); // Email Verification
      navigate("/MeasurementForm");
    } catch (err) {
      setError("Failed to create an account.");
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={handleSignUp}>
        <div className='h-90 px-1 overflow-hidden box-border'>
          <div className='grid grid-cols-2 gap-7 mb-2'>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>
                First Name
              </p>
              <input
                name='firstName'
                value={formData.firstName}
                onChange={(e) => handleInputChange(e)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              />
            </div>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>
                Last Name
              </p>
              <input
                name='lastName'
                value={formData.lastName}
                onChange={(e) => handleInputChange(e)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-7 mb-2'>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>
                Complete Address
              </p>
              <input
                name='completeAddress'
                value={formData.completeAddress}
                onChange={(e) => handleInputChange(e)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              />
            </div>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>
                Phone Number
              </p>
              <input
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange(e)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              />
            </div>
          </div>
          <div className='mb-2'>
            <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>
              Email Address
            </p>
            <input
              name='email'
              value={formData.email}
              onChange={(e) => handleInputChange(e)}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            />
          </div>
          <div className='grid grid-cols-2 gap-7 mb-2'>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>
                Password
              </p>
              <input
                name='password'
                value={formData.password}
                onChange={(e) => handleInputChange(e)}
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              />
            </div>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>
                Confirm Password
              </p>
              <input
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange(e)}
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              />
            </div>
          </div>

          <div className='text-center mt-7 mb-3'>
            <button
              className='text-center font-semibold rounded-lg px-6 py-1.5 text-[#fefefe] bg-blue-700 hover:text-[#fefefe] hover:shadow-md'
              type='submit'
            >
              Sign up
            </button>
            <div className='text-sm pt-2 font-medium text-gray-500 dark:text-gray-300 text-center'>
              Already have an account?{" "}
              <a
                href='/MainLogin'
                className='text-blue-700 hover:underline dark:text-blue-500'
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
