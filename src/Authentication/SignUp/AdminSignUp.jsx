import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getFirestore, doc, setDoc } from "firebase/firestore";
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
    Tailor_Shop_Name: "",
    Complete_Address: "",
    Email: "",
    Phone_Number: "",
    Password: "",
    Confirm_Password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Capitalize the first letter for Tailor_Shop_Name and Complete_Address fields
    if (name === "Tailor_Shop_Name" || name === "Complete_Address") {
      newValue = capitalizeFirstLetter(value);
    }

    // Allow only numeric input for Phone_Number field and limit to 11 digits
    if (name === "Phone_Number") {
      newValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      if (newValue.length > 11) {
        newValue = newValue.slice(0, 11); // Limit to 11 digits
      }
    }

    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  // Create admin in Firestore
  const createAdminInFirestore = async (user) => {
    try {
      const adminRef = doc(db, "Administrator", user.uid);
      const { Password, Confirm_Password, ...adminData } = formData;

      // Initialize the admin document with an empty employees array and include Head_ID
      await setDoc(adminRef, {
        ...adminData,
        Head_ID: user.uid, // Store the admin user ID in Head_ID
      });
    } catch (err) {
      console.error("Error creating admin in Firestore:", err);
      setError("Failed to create an account.");
    }
  };

  // Handle email verification
  const handleEmailVerification = async (user) => {
    try {
      await sendEmailVerification(user);
      console.log("Email verification sent");
    } catch (error) {
      console.error("Error sending email verification:", error);
    }
  };

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if password is exactly 10 characters long
    if (formData.Password.length !== 10) {
      window.alert("Password must be exactly 10 characters long.");
      return;
    }

    // Check if phone number is exactly 11 digits long
    if (formData.Phone_Number.length !== 11) {
      window.alert("Phone number must be exactly 11 digits.");
      return;
    }

    try {
      // Check if passwords match
      if (formData.Password !== formData.Confirm_Password) {
        setError("Passwords do not match");
        return;
      }

      // Set session persistence
      await setPersistence(auth, browserSessionPersistence);

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.Email,
        formData.Password
      );
      const user = userCredential.user;

      // Create admin in Firestore
      await createAdminInFirestore(user);

      // Send email verification
      await handleEmailVerification(user);

      // Navigate to the AdminJobOrder page
      navigate("/AdminJobOrder");
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Failed to create an account.");
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={handleSignUp}>
        <div className='w-full px-1 overflow-hidden box-border'>
          <div className='grid grid-cols-2 gap-7 mb-2'>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>
                Tailor Shop Name
              </p>
              <input
                name='Tailor_Shop_Name'
                value={formData.Tailor_Shop_Name}
                onChange={(e) => handleInputChange(e)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                required
              />
            </div>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>
                Complete Address
              </p>
              <input
                name='Complete_Address'
                value={formData.Complete_Address}
                onChange={(e) => handleInputChange(e)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                required
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-7 mb-2'>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>
                Phone Number
              </p>
              <input
                type='tel'
                name='Phone_Number'
                value={formData.Phone_Number}
                onChange={(e) => handleInputChange(e)}
                maxLength={11} // Enforce maximum length of 11 digits
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                required
              />
            </div>
          </div>
          <div className='mb-2'>
            <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>
              Email Address
            </p>
            <input
              name='Email'
              value={formData.Email}
              onChange={(e) => handleInputChange(e)}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              required
            />
          </div>
          <div className='grid grid-cols-2 gap-7 mb-2'>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>
                Password
              </p>
              <input
                name='Password'
                value={formData.Password}
                onChange={(e) => handleInputChange(e)}
                type='password'
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                required
              />
            </div>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>
                Confirm Password
              </p>
              <input
                name='Confirm_Password'
                value={formData.Confirm_Password}
                onChange={(e) => handleInputChange(e)}
                type='password'
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                required
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
