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
        <div className='bg-[#d9edf4] min-h-screen'>

            <div className='pt-10 mx-32'>
                <div className='bg-[#fefefe] shadow-lg rounded-lg'>

                    <div className='grid grid-cols-4 flex text-[#fefefe]'>
                        <div className='bg-[#6793a8] px-4 py-10'>
                            <a href='/ClientProfile'>
                            <h1 className='text-lg font-medium underline mb-5'>
                                Profile
                            </h1>
                            </a>
                            <a href='/ClientSettings'>
                            <h1 className='text-lg font-medium hover:underline mb-60'>
                                Settings
                            </h1>
                            </a>
                            <a href='/'>
                            <h1 className='text-lg font-medium hover:underline'>
                                Log out
                            </h1>
                            </a>
                        </div>
                        <div className='bg-[#fefefe] col-span-3 p-4 text-[#6f6f6f]'>
                            <h1 className='text-3xl font-semibold mb-5'>
                                My Profile
                            </h1>
                            <form onSubmit={handleSubmit}>
                            <div className='grid grid-cols-2'>
                            {/* Start */}
                            <div className=''>
                                <label>First Name:</label>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={userData.firstName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className='border border-gray-300 rounded px-2 py-1'
                                />
                            </div>
                            <div className=''>
                            <div className=''>
                                <label>Last Name:</label>
                                <input
                                    type='text'
                                    name='lastName'
                                    value={userData.lastName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className='border border-gray-300 rounded px-2 py-1'
                                />
                            </div>
                                <label>Phone:</label>
                                <input
                                    type='tel'
                                    name='phone'
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className='border border-gray-300 rounded px-2 py-1'
                                />
                            </div>
                            <div className=''>
                                <label>Complete Address:</label>
                                <input
                                    type='text'
                                    name='address'
                                    value={userData.address}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className='border border-gray-300 rounded px-2 py-1'
                                />
                            </div>
                            <button type="button" onClick={() => setIsEditing(!isEditing)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                            {isEditing && (
                                <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                                    Save
                                </button>
                            )}
                            </div>
                            </form>
                            <h1 className='text-xl font-semibold mb-2'>
                                Measurement Profile
                            </h1>
                            
                            <form onSubmit={handleSubmit}>
                            <div className='grid grid-cols-3'>
                                <div className='grid grid-rows-9'>
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
                                    value={measurements.sleeve}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Circumference</p>
                                    <input 
                                    name="circumference"
                                    value={measurements.circumference}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Figure</p>
                                    <input 
                                    name="figure"
                                    value={measurements.figure}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Blouse Length</p>
                                    <input 
                                    name="blouseLength"
                                    value={measurements.blouseLength}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Dress Length</p>
                                    <input 
                                    name="dressLength"
                                    value={measurements.dressLength}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Blouse Bust</p>
                                    <input 
                                    name="blouseBust"
                                    value={measurements.blouseBust}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Blouse Waist</p>
                                    <input 
                                    name="blouseWaist"
                                    value={measurements.blouseWaist}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Blouse Hips</p>
                                    <input 
                                    name="blouseHips"
                                    value={measurements.blouseHips}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                </div>

                                <div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Front Chest</p>
                                    <input 
                                    name="frontChest"
                                    value={measurements.frontChest}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Back Chest</p>
                                    <input 
                                    name="backChest"
                                    value={measurements.backChest}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Bust Point</p>
                                    <input 
                                    name="bustPoint"
                                    value={measurements.bustPoint}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Bust Distance</p>
                                    <input 
                                    name="bustDistance"
                                    value={measurements.bustDistance}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Skirt Length</p>
                                    <input 
                                    name="skirtLength"
                                    value={measurements.skirtLength}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Skirt Waist</p>
                                    <input 
                                    name="skirtWaist"
                                    value={measurements.skirtWaist}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Skirt Hips</p>
                                    <input 
                                    name="skirtHips"
                                    value={measurements.skirtHips}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Crotch</p>
                                    <input 
                                    name="crotch"
                                    value={measurements.crotch}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Pants Length</p>
                                    <input 
                                    name="pantsLength"
                                    value={measurements.pantsLength}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                </div>

                                <div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Thigh</p>
                                    <input 
                                    name="thigh"
                                    value={measurements.thigh}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Knee</p>
                                    <input 
                                    name="knee"
                                    value={measurements.knee}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Ankle Flare</p>
                                    <input 
                                    name="ankleFlare"
                                    value={measurements.ankleFlare}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Polo Length</p>
                                    <input 
                                    name="poloLength"
                                    value={measurements.poloLength}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Polo Waist</p>
                                    <input 
                                    name="poloWaist"
                                    value={measurements.poloWaist}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                                <div className='flex pb-2 pr-5 justify-between'>
                                    <p>Polo Hips</p>
                                    <input 
                                    name="poloHips"
                                    value={measurements.poloHips}
                                    onChange={handleInputChange}
                                    className="text-left w-24 h-5 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                </div>
                               
                                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                                    Save Measurements {/* Button to submit the form */}
                                </button>
                                </div>
                            </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}