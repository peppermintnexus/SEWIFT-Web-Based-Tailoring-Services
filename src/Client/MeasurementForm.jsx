import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, getIdToken } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Header from '/src/components/Header.jsx'
import { db } from '../firebase';

export default function ClientLogin() {
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
        pantsWaist: '',
        pantsHips: '',
        thigh: '',
        knee: '',
        ankleFlare: '',
        poloLength: '',
        poloWaist: '',
        poloHips: '',
    });
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userToken = await getIdToken(user);
                    setToken(userToken);

                    const userDocRef = doc(db, 'clientUsers', user.uid);
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        const userProfile = docSnap.data();
                        if (userProfile.measurements) {
                            setMeasurements(userProfile.measurements);
                        }
                    }
                } else {
                    console.log('User is not signed in');
                }
            });
        };

        fetchUserData();
    }, [auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setMeasurements((prevMeasurements) => ({
            ...prevMeasurements,
            [name]: value,
        }));
    };

    const handleAddLater = () => {
        navigate('/ClientHomepage');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, 'clientUsers', userId);
            await setDoc(userDocRef, { measurements }, { merge: true });
            alert('Measurement profile updated successfully');
            navigate('/ClientHomepage');
        } catch (error) {
            console.error('Error updating document: ', error);
            alert('Failed to save measurements. Please try again.');
        }

        console.log('Measurements submitted:', measurements);
    };

    return (
        <div className='bg-[#10aeb2] min-h-screen'>
            <div className='pt-20'>
            <div className='bg-[#fefefe] rounded-lg mx-40 '>
                <h1 className='text-3xl font-semibold pt-4 pb-5 text-[#171B1F] text-center'>
                    Measurement Profile
                </h1>

                <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-3 mx-12 gap-14'>
                <div className='grid grid-rows-9'>
                    <div className='flex pb-2 justify-between'>
                        <p>Shoulder</p>
                        <input name="shoulder" value={measurements.shoulder} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Sleeve</p>
                        <input name="sleeve" value={measurements.sleeve} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Circumference</p>
                        <input name="circumference" value={measurements.circumference} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Figure</p>
                        <input name="figure" value={measurements.figure} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Blouse Length</p>
                        <input name="blouseLength" value={measurements.blouseLength} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Dress Length</p>
                        <input name="dressLength" value={measurements.dressLength} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Blouse Bust</p>
                        <input name="blouseBust" value={measurements.blouseBust} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Blouse Waist</p>
                        <input name="blouseWaist" value={measurements.blouseWaist} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Blouse Hips</p>
                        <input name="blouseHips" value={measurements.blouseHips} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                </div>

                <div className='grid grid-rows-9'>
                    <div className='flex pb-2 justify-between'>
                        <p>Front Chest</p>
                        <input name="frontChest" value={measurements.frontChest} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Back Chest</p>
                        <input name="backChest" value={measurements.backChest} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Bust Point</p>
                        <input name="bustPoint" value={measurements.bustPoint} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Bust Distance</p>
                        <input name="bustDistance" value={measurements.bustDistance} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Skirt Length</p>
                        <input name="skirtLength" value={measurements.skirtLength} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Skirt Waist</p>
                        <input name="skirtWaist" value={measurements.skirtWaist} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Skirt Hips</p>
                        <input name="skirtHips" value={measurements.skirtHips} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Crotch</p>
                        <input name="crotch" value={measurements.crotch} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Pants Length</p>
                        <input name="pantsLength" value={measurements.pantsLength} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                </div>

                <div className='grid grid-rows-9'>
                    <div className='flex pb-2 justify-between'>
                        <p>Pants Waist</p>
                        <input name="pantsWaist" value={measurements.pantsWaist} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Pants Hips</p>
                        <input name="pantsHips" value={measurements.pantsHips} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Thigh</p>
                        <input name="thigh" value={measurements.thigh} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Knee</p>
                        <input name="knee" value={measurements.knee} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Ankle Flare</p>
                        <input name="ankleFlare" value={measurements.ankleFlare} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Polo Length</p>
                        <input name="poloLength" value={measurements.poloLength} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Polo Waist</p>
                        <input name="poloWaist" value={measurements.poloWaist} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className='flex pb-2 justify-between'>
                        <p>Polo Hips</p>
                        <input name="poloHips" value={measurements.poloHips} onChange={handleChange} className="w-32 h-6 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                </div>
                </div>
                <div>
                    <div className='mt-7 pb-4 flex justify-center items-center'>
                        <button type='submit' className='mx-3 text-center font-semibold rounded-lg px-3 py-1 text-[#fefefe] bg-[#171B1F] hover:text-[#fefefe]'>
                            Submit
                        </button>  
                        <button type='button' onClick={handleAddLater} className='mx-3 text-center font-semibold rounded-lg px-3 py-1 text-[#fefefe] bg-[#171B1F] hover:text-[#fefefe]'>
                            Add Later
                        </button>
                    </div>
            </div>
            </form>
            </div>
            </div>
        </div>
    )
}