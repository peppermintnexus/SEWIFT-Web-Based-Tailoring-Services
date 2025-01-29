import React, { useEffect, useState } from 'react'
import ClientHeader from '/src/components/ClientHeader.jsx'
import { getAuth, onAuthStateChanged, getIdToken, updateEmail, sendEmailVerification, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function ClientSettings() {
    const [user, setUser] = useState(null)
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await getIdToken(user);
                setUserToken(token);
                setUser(user);

                const userDoc = await getDoc(doc(db, 'clientUsers', user.uid));
                if (userDoc.exists()) {
                    setUserInfo(userDoc.data());
                }
            } else {
                setUserToken(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const reauthenticate = async (currentPassword) => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        return await reauthenticateWithCredential(user, credential);
    }

    const handleSave = async () => {
        try {
            if (user) {
                // Prompt for current password to authenticate
                const currentPassword = prompt('Please enter your current password');
                await reauthenticate(currentPassword);

                // Check if the email has changed
                if (user.email !== userInfo.email) {
                    // Update user email
                    await updateEmail(user, userInfo.email);

                    // Send email verification
                    await sendEmailVerification(user);
                    alert('Email update successfully! Please verify your new email address.');
                }

                // Update user data in Firestore
                await setDoc(doc(db, 'clientUsers', user.uid), userInfo, { merge: true });
                alert('Settings updated successfully!');
            }
        } catch (error) {
            alert(`Error updating settings: ${error.message}`);
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    };

    return (
        <div className="bg-[#F3F4F6] min-h-screen">
            <ClientHeader />

            <div className="bg-white mx-72 mt-10 pb-5 shadow-lg">
            <h1 className='px-7 py-3 text-xl font-medium'>Account Information</h1>

            <div className="border-t border-gray-100 mb-3" />
            <div className='px-7 grid grid-cols-2'>
                        <div>
                            <h1 className='mb-2 font-medium'>First Name</h1>
                            <input
                                type='text'
                                name='firstName'
                                value={userInfo.firstName}
                                onChange={handleChange}
                                className='text-[#6F6F6F] bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-64 p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white'
                            />
                        </div>
                        <div>
                        <h1 className='mb-2 font-medium'>Last Name</h1>
                            <input
                                type='text'
                                name='lastName'
                                value={userInfo.lastName}
                                onChange={handleChange}
                                className='text-[#6F6F6F] bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-64 p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white'
                            />
                        </div>

                        <div>
                        <h1 className='mt-4 mb-2 font-medium'>Email</h1>
                            <input
                                type='text'
                                name='email'
                                value={userInfo.email}
                                onChange={handleChange}
                                className='text-[#7f7f7f] bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-64 p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white'
                            />
                            <button type="button" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
                        </div>
                    </div>

            </div>

            <div className="bg-white mx-72 mt-5 pb-5 shadow-lg">
            <h1 className='px-7 py-3 text-xl font-medium'>Change Password</h1>

            <div className="border-t border-gray-100 mb-3" />
            <div className='px-7 grid grid-cols-2'>
                        <div>
                            <h1 className='mb-2 font-medium'>New Password</h1>
                            <input
                                className='text-[#6F6F6F] bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-64 p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white'
                            />

                            <button type="button" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Reset Password</button>
                        </div>
                        <div>
                        <h1 className='mb-2 font-medium'>Confirm Password</h1>
                            <input
                                className='text-[#6F6F6F] bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-64 p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white'
                            />
                            
                        </div>

                        
                    </div>

            </div>

        </div>
    )
}