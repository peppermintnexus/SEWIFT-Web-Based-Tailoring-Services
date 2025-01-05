import React, { useState } from 'react'
import Textbox from '/src/components/Textbox.jsx'
import ClientHomepage from '/src/Client/ClientHomepage'
import { createUserWithEmailAndPassword, setPersistence } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { setDoc, doc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { getAuth, sendEmailVerification } from 'firebase/auth'

export default function SignUp() {
        const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            completeAddress: '',
            email: '',
            phoneNumber: '',
        });

        const [error, setError] = useState(null);
        const navigate = useNavigate();
        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;

        // Textbox
        const handleInputChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const createUserInFirestore = async (user, formData) => {
            try {
                await setDoc(doc(db, 'users', user.uid), {
                    ...formData,
                });
            } catch (err) {
                console.error(err);
            }
        };

        const handleEmailVerification = async (user) => {
            try {
              await sendEmailVerification(user);
              console.log('Email verification sent');
            } catch (error) {
              console.error('Error sending email verification:', error);
            }
          };

        // Form
        const handleSignUp = async (e) => {
            e.preventDefault();
            try {
                if (formData.password !== formData.confirmPassword){
                    setError('Passwords do not match');
                    return;
                }
                
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;

                const userData = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    completeAddress: formData.completeAddress,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                };

                await createUserInFirestore(user, userData);
                await handleEmailVerification(user); // Email Verification
                navigate('/ClientHomepage');
            } catch (err) {
                setError('Failed to create an account.');
            }
        };

    return (
        <div className='flex justify-center items-center'>
            <div class="w-full h-90 px-1 overflow-hidden box-border">
                <div className='grid grid-cols-2 gap-7 mb-2'>
                    <div>
                        <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>First Name</p>
                        <Textbox />
                    </div>
                    <div>
                        <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Last Name</p>
                        <Textbox />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-7 mb-2'>
                    <div>
                        <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Complete Address</p>
                        <Textbox />
                    </div>
                    <div>
                        <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Phone Number</p>
                        <Textbox />
                    </div>
                </div>
                <div className='mb-2'>
                    <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Email Address</p>
                    <Textbox />
                </div>
                <div className='grid grid-cols-2 gap-7 mb-2'>
                    <div>
                        <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Password</p>
                        <Textbox />
                    </div>
                    <div>
                        <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Confirm Password</p>
                        <Textbox />
                    </div>
                </div>

                <div className='text-center mt-7 mb-3'>
                    <a href='/ClientHomepage'>
                    <button className='text-center font-semibold rounded-lg px-6 py-1.5 text-[#fefefe] bg-blue-700 hover:text-[#fefefe] hover:shadow-md'>Sign up</button></a>
                    <div class="text-sm pt-2 font-medium text-gray-500 dark:text-gray-300 text-center">
                        Already have an account? <a href="/MainLogin" class="text-blue-700 hover:underline dark:text-blue-500">Log in</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
