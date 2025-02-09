import React, { useEffect, useState } from "react";
import ClientHeader from "/src/components/ClientHeader.jsx";
import {
  getAuth,
  onAuthStateChanged,
  getIdToken,
  updateEmail,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ClientSettings() {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [First_Name, setFirstName] = useState("");
  const [userInfo, setUserInfo] = useState({
    First_Name: "",
    Last_Name: "",
    Email_Address: "",
    Complete_Address: "",
    Phone_Number: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await getIdToken(user);
        setUserToken(token);
        setUser(user);

        const userDoc = await getDoc(doc(db, "Client", user.uid));
        if (userDoc.exists()) {
          setUserInfo(userDoc.data());
        }
      } else {
        setUserToken(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const fullName = `${userInfo.First_Name} ${userInfo.Last_Name}`.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const reauthenticate = async (currentPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      userInfo.Email_Address,
      currentPassword
    );
    return await reauthenticateWithCredential(user, credential);
  };

  const handleSave = async () => {
    try {
      if (user) {
        // Prompt for current password to authenticate
        const currentPassword = prompt("Please enter your current password");
        await reauthenticate(currentPassword);

        // Check if the email has changed
        if (user.Email_Address !== userInfo.Email_Address) {
          // Update user email
          await updateEmail(user, userInfo.Email_Address);

          // Send email verification
          await sendEmailVerification(user);
          alert(
            "Email update successfully! Please verify your new email address."
          );
        }

        // Update user data in Firestore
        await setDoc(doc(db, "Client", user.uid), userInfo, {
          merge: true,
        });
        alert("Settings updated successfully!");
      }
    } catch (error) {
      alert(`Error updating settings: ${error.message}`);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  };

  return (
    <div className='bg-[#F3F4F6] min-h-screen'>
      <ClientHeader userName={userInfo.First_Name || ""} />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <div className='bg-white rounded-lg shadow'>
            <div className='px-6 py-5 border-b border-gray-200'>
              <h1 className='text-2xl font-semibold text-gray-900'>
                Account Information
              </h1>
            </div>

            <div className='p-6 space-y-2'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Name
                </label>
                <input
                  name='fullName'
                  value={fullName}
                  onChange={handleChange}
                  className='w-full bg-white'
                  readonly
                  disabled
                />
              </div>
              <div className='grid grid-cols-2 md:grid-cols-2 gap-6'>
                <div className='block'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email
                    </label>
                    <input
                      name='Email_Address'
                      value={userInfo.Email_Address}
                      onChange={handleChange}
                      className='w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone Number
                    </label>
                    <input
                      name='Phone_Number'
                      value={userInfo.Phone_Number}
                      onChange={handleChange}
                      className='w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none'
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Location
                    </label>
                    <input
                      name='Complete_Address'
                      value={userInfo.Complete_Address}
                      onChange={handleChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                    />
                  </div>
                </div>
              </div>

              <div className='flex justify-end'>
                <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700'>
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow'>
            <div className='px-6 py-5 border-b border-gray-200'>
              <h1 className='text-2xl font-semibold text-gray-900'>
                Change Password
              </h1>
              <ul class='max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400'></ul>
            </div>

            <div className='p-6 space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    New Password
                  </label>
                  <input
                    type='password'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                    placeholder='••••••••'
                  />
                  <p className='pl-2 pt-0.5 text-xs italic text-[#7f7f7f]'>
                    * Your password must be at least 10 characters *
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none'
                    placeholder='••••••••'
                  />
                </div>
              </div>

              <div className='flex justify-end'>
                <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700'>
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
