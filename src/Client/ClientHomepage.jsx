import React, { useEffect, useState } from 'react'
import ClientHeader from '/src/components/ClientHeader.jsx'
import SchoolBlouse from '/src/assets/images/SchoolBlouse.jpg'
import Explore from '/src/assets/images/Explore.png'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, getIdToken } from 'firebase/auth'
import { auth } from '../firebase'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const slides = [
    "/src/assets/images/Slide1.png",
    "/src/assets/images/Slide2.png",
    "/src/assets/images/Slide3.png"
]

export default function ClientHomepage() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('')
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userToken = await getIdToken(user);
                setToken(userToken);
                
                const userDoc = await getDoc(doc(db, 'clientUsers', user.uid));
                if (userDoc.exists()) {
                    setFirstName(userDoc.data().firstName);
                }

                setUser(user);
                } else {
                navigate('/ClientLogin');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (!user) {
        return <p>Loading...</p>
    }
    
    return (
        <div className='bg-[f7f7f7]'>
            <div>
            <ClientHeader userName={firstName || 'Client'}/>
            </div>

            <div className='px-9 pt-9'>
                <div className='grid grid-cols-2'>
                <div className='bg-cover bg-center' style={{ backgroundImage: `url(${Explore})` }}>
                    <p className='font-bold text-3xl px-16 pt-11'>Explore<br />Tailor Shops</p>
                    <a href='/TailorShops'>
                    <button type="button" class="mx-16 mt-4 mb-11 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        Start here
                    </button>
                    </a>
                </div>
                </div>
            </div>

            <div>
                <p className='px-9 pt-5 pb-5 font-semibold text-xl'>Discover Apparels</p>

                <div className='px-9 grid grid-cols-5 gap-5'>
                    <div className='w-56 h-56 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                        <img src={SchoolBlouse} className='mb-2 rounded-lg w-full h-full' />
                        <p className='font-bold'>Liceo JHS Uniform Blouse</p>
                        <p>Description</p>
                        <p className='text-[#867E7B]'>Size: S, M, L, XL</p>
                        <p className='mb-2 font-medium'>Price</p>

                        <a href='#'>
                        <button type="button" className="place-self-end text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Order
                        </button>
                        </a>
                    </div>

                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}