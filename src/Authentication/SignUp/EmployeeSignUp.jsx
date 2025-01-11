import React, { useState } from 'react'
import Textbox from '/src/components/Textbox.jsx'
import { useNavigate } from 'react-router';
import { getFirestore } from 'firebase/firestore';
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, sendEmailVerification, setPersistence } from 'firebase/auth';
import { auth, db } from '../../firebase'
import { setDoc, doc } from 'firebase/firestore';

export default function SignUp() {
    const [formData, setFormData] = useState({
            name: '',
            email: '',
            phoneNumber: '',        
        });
    
        const [error, setError] = useState(null);
        const navigate = useNavigate();
        const db = getFirestore();
        const auth = getAuth();
    
        const handleInputChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
    
        const createUserInFirestore = async (user, formData) => {
            try {
                await setDoc(doc(db, 'employeeUsers', user.uid), {
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
    
                await setPersistence(auth, browserSessionPersistence);
    
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;
    
                const userData = {
                    name: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                };
    
                await createUserInFirestore(user, userData);
                await handleEmailVerification(user);
                navigate('/EmployeeHomepage');
            } catch (err) {
                setError('Failed to create an account.');
            }
        };

    return (
        <div class="flex justify-center items-center">
            <form onSubmit={handleSignUp}>
                    <div class="w-full px-1 overflow-hidden box-border">
                        <div className='mb-2'>
                            <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Name</p>
                            <Textbox name='name' value={formData.name} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className='grid grid-cols-2 gap-7 mb-2'>
                            <div>
                            <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Tailor Shop</p>
                            <div>
                                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-[#b5b5b5] bg-[#fefefe] hover:bg-[#f7f7f7] border font-medium rounded-lg text-sm w-full px-1.5 py-1 text-center inline-flex items-center" type="button">Dropdown<svg class="w-2.5 h-2.5 ms-3 justify-self-end" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                                </svg>
                                </button>

                                <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a></li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </div>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Phone Number</p>
                                <Textbox name='phoneNumber' value={formData.phoneNumber} onChange={(e) => handleInputChange(e)} />
                            </div>
                        </div>
                        <div className='mb-2'>
                            <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Email Address</p>
                            <Textbox name='email' value={formData.email} onChange={(e) => handleInputChange(e)}/>
                        </div>
                        <div className='grid grid-cols-2 gap-7 mb-2'>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Password</p>
                                <Textbox name='password' value={formData.password} onChange={(e) => handleInputChange(e)}/>
                            </div>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Confirm Password</p>
                                <Textbox name='confirmPassword' value={formData.confirmPassword} onChange={(e) => handleInputChange(e)} />
                            </div>
                        </div>
        
                        <div className='text-center mt-7 mb-3'>
                            <button className='text-center font-semibold rounded-lg px-6 py-1.5 text-[#fefefe] bg-blue-700 hover:text-[#fefefe] hover:shadow-md' type='submit'>Sign up</button>
                        <div class="text-sm pt-2 font-medium text-gray-500 dark:text-gray-300 text-center">
                            Already have an account? <a href="/MainLogin" class="text-blue-700 hover:underline dark:text-blue-500">Log in</a>
                        </div>
                        </div>
                    
                    </div>
                    </form>
                </div>
    )
}