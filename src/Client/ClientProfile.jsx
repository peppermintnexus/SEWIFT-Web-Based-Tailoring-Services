import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, getIdToken } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ClientProfile() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    const [measurements, setMeasurements] = useState({
        shoulder: '',
        sleeve: '',
        circumference: '',
        figure: '',
        blouseLength: '',
        dressLength: '',
        blouseBust: '',
        blouseWaist: '',
        blouseHips: '',
        frontChest: '',
        backChest: '',
        bustPoint: '',
        bustDistance: '',
        skirtLength: '',
        skirtWaist: '',
        skirtHips: '',
        crotch: '',
        pantsLength: '',
        thigh: '',
        knee: '',
        ankleFlare: '',
        poloLength: '',
        poloWaist: '',
        poloHips: '',
    });
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const auth = getAuth();
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    // Get the user's token
                    const userToken = await getIdToken(user);
                    setToken(userToken);

                    // Fetch additional user data from Firestore
                    const userDocRef = doc(db, 'clientUsers', user.uid);
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        const { displayName, phoneNumber } = user;
                        const userProfile = docSnap.data();
                        setUserData({
                            firstName: displayName ? displayName.split(' ')[0] : userProfile.firstName || '',
                            lastName: displayName ? displayName.split(' ').slice(1).join(' ') : userProfile.lastName || '',
                            phone: phoneNumber || userProfile.phoneNumber || '',
                            address: userProfile.completeAddress || '',
                        });

                        if (userProfile.measurements) {
                            setMeasurements(userProfile.measurements);
                        }
                    }
                } else {
                    console.error('User is not authenticated');
                }
            });
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name in userData) {
            setUserData((prevUserData) => ({
                ...prevUserData,
                [name]: value,
            }));
        } else {
            setMeasurements((prevMeasurements) => ({
                ...prevMeasurements,
                [name]: value,
            }));
        }
    };

    const handleSave = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userDocRef = doc(db, 'clientUsers', user.uid);
            try {
                console.log('Saving user data:', {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    phoneNumber: userData.phone,
                    completeAddress: userData.address,
                    measurements: measurements,
                });
                
                await setDoc(userDocRef, {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    phoneNumber: userData.phone,
                    completeAddress: userData.address,
                    measurements: measurements,
                }, { merge: true });

                alert('User data saved successfully!');
                setIsEditing(false);
            } catch (error) {
                console.error('Error updating user data: ', error);
            }
        } else {
            console.error('User is not authenticated');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave();
    };

    return (
        <div className='place-items-center flex justify-center bg-[#20262B] min-h-screen'>
            <div className='rounded-lg px-5 py-4 container mx-auto bg-[#fefefe]'>
                <p className='font-semibold text-3xl mb-3'>Account</p>
                <div className='text-lg grid grid-cols-4 gap-3'>
                    <div>
                        <div className='container hover:bg-[#10aeb2] hover:rounded-lg hover:text-white hover:font-medium mb-1 p-2'>Profile</div>
                        <div className='container hover:bg-[#10aeb2] hover:rounded-lg hover:text-white hover:font-medium mb-1 p-2'>Settings</div>
                    </div>
                    <div className='grid grid-rows-2'>
                        <div className='mb-2'>
                            <label>First Name</label>
                            <input
                            type='text'
                            name='firstName'
                            value={userData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className='border border-gray-300 rounded px-2 py-1'
                            />
                        </div>
                        <div>
                            <label>Complete Address</label>
                            <input
                            type='text'
                            name='address'
                            value={userData.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className='border border-gray-300 rounded px-2 py-1'
                            />
                        </div>
                    </div>

                    <div className='grid grid-rows-2'>
                        <div>
                            <label>Last Name</label>
                            <input
                            type='text'
                            name='lastName'
                            value={userData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className='border border-gray-300 rounded px-2 py-1'
                            />
                        </div>
                        <div>
                            <label>Phone</label>
                            <input
                            type='tel'
                            name='phone'
                            value={userData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className='border border-gray-300 rounded px-2 py-1'
                            />
                        </div>
                    </div>

                    <div className='mt-2 space-x-4'>
                    <button 
                    type="button" 
                    onClick={() => setIsEditing(!isEditing)} 
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                        {isEditing && (
                        <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                            Save
                        </button>
                        )}
                    </div>
                </div>

                <div className='grid grid-cols-4 mt-3'>
                    <div className='text-2xl mb-2 font-medium col-start-2'>
                        Measurement Profile
                    </div>
                    <div className='col-start-2'>
                    <div className='flex pb-2 pr-5 justify-between'>
                        <p>Shoulder</p>
                        <input 
                        name="shoulder"
                        value={measurements.shoulder}
                        onChange={handleInputChange}
                        className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 pr-5 justify-between'>
                        <p>Sleeve</p>
                        <input 
                        name="sleeve"
                        value={measurements.shoulder}
                        onChange={handleInputChange}
                        className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 pr-5 justify-between'>
                        <p>Circumference</p>
                        <input 
                        name="circumference"
                        value={measurements.shoulder}
                        onChange={handleInputChange}
                        className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 pr-5 justify-between'>
                        <p>Figure</p>
                        <input 
                        name="figure"
                        value={measurements.shoulder}
                        onChange={handleInputChange}
                        className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 pr-5 justify-between'>
                        <p>Blouse Length</p>
                        <input 
                        name="blouseLength"
                        value={measurements.shoulder}
                        onChange={handleInputChange}
                        className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 pr-5 justify-between'>
                        <p>Dress Length</p>
                        <input 
                        name="dressLength"
                        value={measurements.shoulder}
                        onChange={handleInputChange}
                        className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 pr-5 justify-between'>
                        <p>Blouse Bust</p>
                        <input 
                        name="blouseBust"
                        value={measurements.shoulder}
                        onChange={handleInputChange}
                        className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 pr-5 justify-between'>
                        <p>Blouse Waist</p>
                        <input 
                        name="blouseWaist"
                        value={measurements.shoulder}
                        onChange={handleInputChange}
                        className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 pr-5 justify-between'>
                        <p>Blouse Hips</p>
                        <input 
                        name="blouseHips"
                        value={measurements.shoulder}
                        onChange={handleInputChange}
                        className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}