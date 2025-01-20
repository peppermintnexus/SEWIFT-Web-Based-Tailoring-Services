import React, { useState, useEffect } from 'react'
import Textbox from '/src/components/Textbox.jsx'
import { useNavigate } from 'react-router';
import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, sendEmailVerification, setPersistence } from 'firebase/auth';
import { auth, db } from '../../firebase'

export default function SignUp() {
    const [formData, setFormData] = useState({
            name: '',
            email: '',
            tailorShopName: '',
            phoneNumber: ''        
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
                    const querySnapshot = await getDocs(collection(firestore, 'adminUsers'));
                    const shops = querySnapshot.docs.map(doc => doc.data().tailorShopName).filter(Boolean);
                    console.log('Fetched shop names:', shops);
                    setShopNames(shops);
                } catch (err) {
                    console.error('Error fetching shop names:', err);
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
                const { password, confirmPassword, ...userData } = formData;
                
                const adminUserQuery = await getDocs(collection(firestore, 'adminUsers'));
                const adminUserDoc = adminUserQuery.docs.find(doc => doc.data().tailorShopName === formData.tailorShopName);

                if (adminUserDoc) {
                    const adminUserId = adminUserDoc.id;

                    await setDoc(doc(firestore, 'adminUsers', adminUserId, 'employeeUsers', user.uid), {
                        ...userData,
                        tailorShopName: formData.tailorShopName,
                        adminUserId: adminUserId,
                    });
            } else {
                setError('Admin user not found for the selected tailor shop');
            }
        } catch (err) {
            console.error('Error creating user in Firestore:', err);
            setError('Failed to create an account.');
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
            if (formData.password !== formData.confirmPassword){
                setError('Passwords do not match');
                return;
            }
    
            try {
                await setPersistence(firebaseAuth, browserSessionPersistence);
                const userCredential = await createUserWithEmailAndPassword(firebaseAuth, formData.email, formData.password);
                const user = userCredential.user;

                await createUserInFirestore(user);
                await handleEmailVerification(user);
                navigate('/EmployeeHomepage');
            } catch (error) {
                setError('Failed to create an account.');
            }
    };

    return (
        <div class="flex justify-center items-center">
            <form onSubmit={handleSignUp}>
                    <div class="w-full px-1 overflow-hidden box-border">
                        <div className='mb-2'>
                            <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Name</p>
                            <Textbox name='name' value={formData.name} onChange={handleInputChange} />
                        </div>
                        <div className='grid grid-cols-2 gap-7 mb-2'>
                            <div>
                            <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Tailor Shop</p>
                            <div>
                            <select name='tailorShopName' value={formData.tailorShopName} onChange={handleInputChange} className="w-full border rounded-lg p-2">
                                <option value="">Select a Shop</option>
                                {shopNames.map((shopName, index) => (
                                    <option key={index} value={shopName}>
                                        {shopName}
                                    </option>
                                ))}
                            </select>

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
                                <Textbox name='phoneNumber' value={formData.phoneNumber} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='mb-2'>
                            <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Email Address</p>
                            <Textbox name='email' value={formData.email} onChange={handleInputChange}/>
                        </div>
                        <div className='grid grid-cols-2 gap-7 mb-2'>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Password</p>
                                <Textbox name='password' value={formData.password} onChange={handleInputChange}/>
                            </div>
                            <div>
                                <p className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Confirm Password</p>
                                <Textbox name='confirmPassword' value={formData.confirmPassword} onChange={handleInputChange} />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
        
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