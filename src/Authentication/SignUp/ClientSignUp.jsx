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
        <div className='flex justify-center items-center pb-10'>
                <form onSubmit={handleSignUp}>
                <div className='px-24 bg-[#fefefe]'>
                    <div>
                    <div className='grid grid-cols-2 mb-1'>
                        <div className='mr-6'>
                            <p>First Name:</p>
                            <Textbox 
                                name='firstName'
                                value={formData.firstName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>

                        <div>
                            <p>Last Name:</p>
                            <Textbox 
                                name='lastName'
                                value={formData.lastName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>

                    <div className='col-span-2 mb-1'>
                        <p>Complete Address:</p>
                        <Textbox 
                            name='completeAddress'
                            value={formData.completeAddress}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <div className='grid grid-cols-2 mb-1'>
                        <div className='mr-6'>
                            <p>Email:</p>
                            <Textbox 
                                name='email'
                                value={formData.email}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div>
                            <p>Phone Number:</p>
                            <Textbox 
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 mb-1'>
                        <div className='mr-6'>
                            <p>Password:</p>
                            <Textbox 
                                name='password'
                                value={formData.password}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>

                        <div>
                            <p>Confirm Password:</p>
                            <Textbox 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                </div>
                </div>

                <div className='text-center mt-7 pb-3'>
                    <button className='text-center font-semibold rounded-lg px-3 py-1 text-[#fefefe] bg-[#10aeb2] hover:text-[#fefefe] hover:shadow-md' type='submit'>Sign up</button>
                    <p>Already have an account? <a href='/ClientLogin' className='underline hover:text-[#6793a8]'>Log in</a></p>
                </div>
                </form>
                </div>
    );
}