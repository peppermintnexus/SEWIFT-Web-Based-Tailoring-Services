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
                
                <div className="bg-white mx-72 mt-10 pb-5 rounded-t-xl shadow-lg">
                    <div className='shadow-sm'>
                        <p className='px-5 py-3 text-2xl font-semibold'>Settings</p>
                    </div>

                    <div>
                    <div className='px-7 pt-6 grid grid-cols-3 gap-10'>
                        <div className='mb-2'>
                            <label className='block mb-1 font-medium'>First Name</label>
                            <input
                            type='text'
                            name='firstName'
                            value={userInfo.firstName}
                            onChange={handleChange}
                            className='text-[#6F6F6F]'
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='block mb-1 font-medium'>Last Name</label>
                            <input
                            type='text'
                            name='lastName'
                            value={userInfo.lastName}
                            onChange={handleChange}
                            className='text-[#6F6F6F]'
                            />
                        </div>
                    </div>

                    <div className='px-7'>
                        <div className='mb-2'>
                            <label className='block mb-1 font-medium'>Email</label>
                            <input
                            type='text'
                            name='email'
                            value={userInfo.email}
                            onChange={handleChange}
                            className='text-[#6F6F6F] w-full'
                            />
                        </div>

                        <p className='mt-7 mb-3 text-xl font-medium'>Change Password</p>
                        <div className='mb-5'>
                            <label className='block mb-1 font-medium'>Current Password</label>
                            <input
                            type='text'
                            className='text-[#6F6F6F] border border-gray-300 rounded px-2 py-1'
                            placeholder='••••••••'
                            />
                        </div>

                        <div className='mb-2'>
                            <label className='block mb-1 font-medium'>New Password</label>
                            <input
                            type='text'
                            className='text-[#6F6F6F] border border-gray-300 rounded px-2 py-1'
                            />
                            <h1 className='text-xs mb-3 italic'>
                                *Password must be more than ten characters*
                            </h1>
                        </div>
                        <div className='mb-2'>
                            <label className='block mb-1 font-medium'>Confirm Password</label>
                            <input
                            type='text'
                            className='text-[#6F6F6F] border border-gray-300 rounded px-2 py-1'
                            />
                        </div>

                        <button 
                        type="" 
                        className="mt-4 bg-[#171B1F] text-white px-6 py-2 rounded">
                        Reset Password
                        </button>
                    </div>
                    </div>
                </div>
        </div>
    )
}