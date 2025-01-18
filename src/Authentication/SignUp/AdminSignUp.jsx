import React, { useState } from 'react'
import Textbox from '/src/components/Textbox.jsx'
import { useNavigate } from 'react-router'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, sendEmailVerification, setPersistence } from 'firebase/auth'
import { auth, db } from '../../firebase'

export default function SignUp() {
        const [formData, setFormData] = useState({
            name: '',
            tailorShopName: '',
            completeAddress: '',
            email: '',
            phoneNumber: '',
        });
    
        const [error, setError] = useState(null);
        const navigate = useNavigate();
        const db = getFirestore();
        const auth = getAuth();
    
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        };
    
        const createAdminInFirestore = async (user) => {
            try {
                const adminRef = doc(db, "adminUsers", user.uid);
                const { password, confirmPassword, ...adminData } = formData;
                await setDoc(adminRef, adminData);
            } catch (err) {
                console.error('Error creating admin in Firestore:', err);
                setError('Failed to create an account.');
            }
        };
    
        const handleEmailVerification = async (user) => {
            try {
                await sendEmailVerification(user);
                console.log("Email verification sent");
            } catch (error) {
                console.error('Error sending email verification:', error);
            }
        };
    
        const handleSignUp = async (e) => {
            e.preventDefault();
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            try {
                await setPersistence(auth, browserSessionPersistence);    
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;
        
                await createAdminInFirestore(user);
                await handleEmailVerification(user);
                navigate('/AdminHomepage');
            } catch (err) {
                console.error('Error creating user:', err);
                setError('Failed to create an account.');
            }
        };

    return (
        <div class="flex justify-center items-center">
            <form onSubmit={handleSignUp}>
                    <div class="w-full px-1 overflow-hidden box-border">
                    <div className='grid grid-cols-2 gap-7 mb-2'>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Name</p>
                                <Textbox name='name' value={formData.name} onChange={(e) => handleInputChange(e)} />
                            </div>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Tailor Shop Name</p>
                                <Textbox name='tailorShopName' value={formData.tailorShopName} onChange={(e) => handleInputChange(e)}/>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-7 mb-2'>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Complete Address</p>
                                <Textbox name='completeAddress' value={formData.completeAddress} onChange={(e) => handleInputChange(e)}/>
                            </div>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Phone Number</p>
                                <Textbox name='phoneNumber' value={formData.phoneNumber} onChange={(e) => handleInputChange(e)}/>
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
                                <Textbox name='confirmPassword' value={formData.confirmPassword} onChange={(e) => handleInputChange(e)}/>
                            </div>
                        </div>
                        
        
                        <div className='text-center mt-7 mb-3'>
                            <a href='/AdminHomepage'>
                            <button className='text-center font-semibold rounded-lg px-6 py-1.5 text-[#fefefe] bg-blue-700 hover:text-[#fefefe] hover:shadow-md' type='submit'>Sign up</button></a>
                            <div class="text-sm pt-2 font-medium text-gray-500 dark:text-gray-300 text-center">
                                Already have an account? <a href="/MainLogin" class="text-blue-700 hover:underline dark:text-blue-500">Log in</a>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
    )
}