import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import AdminSidebar from '/src/components/AdminSidebar'
import AdminHeader from '/src/components/AdminHeader'
import ProductModal from '../components/ProductModal'
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminShopProfile() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [token, setToken] = useState(null);
    const [tailorShopName, setTailorShopName] = useState('');
    const [completeAddress, setCompleteAddress] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser (user);
                const idToken = await user.getIdToken();
                setToken(idToken);

                const userDoc = await getDoc(doc(db, 'adminUsers', user.uid));
                if (userDoc.exists()) {
                    setName(userDoc.data().name);
                    setTailorShopName(userDoc.data().tailorShopName);
                    setCompleteAddress(userDoc.data().completeAddress);
                    setOpeningHours(userDoc.data().openingHours || '');
                    setDescription(userDoc.data().description || '');
                    
                    const productList = userDoc.data().productList || [];
                    setProducts(productList);
                }

                setUser(user);
            } else {
                navigate('/AdminLogin');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        const userDocRef = doc(db, 'adminUsers', user.uid);
        await updateDoc(userDocRef, {
            openingHours: openingHours,
            description: description,
        });
        setIsEditing(false);
    };

    if (!user) {
        return <p>Loading...</p>
    }

    return (
        <div className='bg-[#FEFEFE] min-h-screen relative'>
            <AdminHeader userName={name || 'admin'}/>
        
            <div className='flex'>
                <AdminSidebar tailorShopName={tailorShopName || 'Tailor Shop Name'}/>

                <div className="p-4 flex-1 w-full">
    <div className="container w-full h-[98vh] sm:h-screen bg-[#FEFEFE]">
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='flex flex-col sm:flex-row gap-3'>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full sm:w-48 h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-center text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
                <div className='pt-2 flex flex-col'>
                    <label className='pt-2 text-xl font-medium'>{tailorShopName}</label>
                    <p className='mb-2 text-sm text-[#9C9C9C]'>Rating</p>
                    <label className='block font-normal text-gray-700 dark:text-gray-400'>{completeAddress || 'Complete Address'}</label>
                    {isEditing ? (
                        <>
                            <input 
                                type="text" 
                                value={openingHours} 
                                onChange={(e) => setOpeningHours(e.target.value)} 
                                placeholder="Opening Hours" 
                                className="block font-normal text-gray-700 mb-2 border border-gray-300 rounded p-1"
                            />
                            <textarea 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                placeholder="Description" 
                                className="block w-full font-normal text-gray-700 mb-2 border border-gray-300 rounded p-1 resize-none"
                            />
                        </>
                    ) : (
                        <>
                            <label className='block font-normal text-gray-700'>{openingHours || 'N/A'}</label>
                            <label className='block font-normal text-gray-700'>{description || 'N/A'}</label>
                        </>
                    )}
                </div>
            </div>
            <div className='flex items-start justify-self-end'>
                <a href='/AddProduct'>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                        <svg className='w-5 h-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6  12H18M12 6V18" stroke="#fefefe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </a>
                {isEditing ? (
                    <button type="button" onClick={handleSave} className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Save</button>
                ) : (
                    <button type="button" onClick={handleEdit} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Edit</button>
                )}
            </div>
        </div>
        <div className="border-t border-gray-100 mt-4 mb-4" />
        <div className='grid gap-3 grid-cols-1 sm:grid-cols-2'>
            {products.map((product, index) => (
                <ProductModal key={index} product={product} />
            ))}
        </div>
    </div>
</div>
                    </div>
                </div>
    )
}