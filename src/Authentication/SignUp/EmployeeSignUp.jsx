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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await setPersistence(firebaseAuth, browserSessionPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      await createUserInFirestore(user);
      await handleEmailVerification(user);

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
            <Textbox
              name='name'
              value={formData.name}
              onChange={handleInputChange}
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
                className='w-full border rounded-lg p-2'
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
              <Textbox
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='mb-2'>
            <p className='block mb-1 text-sm font-medium text-gray-900'>
              Email Address
            </p>
            <Textbox
              name='email'
              type='email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className='grid grid-cols-2 gap-7 mb-2'>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900'>
                Password
              </p>
              <Textbox
                name='password'
                type='password'
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p className='block mb-1 text-sm font-medium text-gray-900'>
                Confirm Password
              </p>
              <Textbox
                name='confirmPassword'
                type='password'
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}

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
