import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClientHeader from '/src/components/ClientHeader.jsx';
import { db } from '/src/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import Rating from '/src/components/Rating';

export default function ViewShopProfile() {
    const { shopId } = useParams();
    const [products, setProducts] = useState([]);
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShopDetails = async () => {
            try {
                const docRef = doc(db, 'adminUsers', shopId);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setShop(docSnap.data());
                    // Fetch products after confirming shop exists
                    const productsColRef = collection(db, `adminUsers/${shopId}/productList`);
                    const productsSnapshot = await getDocs(productsColRef);
                    const productsData = productsSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setProducts(productsData);
                    console.log('Fetched products:', productsData); // Debug log
                } else {
                    console.log('No such document!');
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        if (shopId) {
            fetchShopDetails();
        }
    }, [shopId]);

    if (loading) {
        return <div className='bg-[#FEFEFE] min-h-screen relative'>Loading...</div>;
    }

    if (!shop) {
        return <div className='bg-[#FEFEFE] min-h-screen relative'>Shop not found</div>;
    }

    return (
        <div className='bg-[#20262B]'>
            <ClientHeader />
            <div className='h-full mx-4 sm:mx-10 md:mx-20 lg:mx-48 pt-10 flex'>
                <div className="p-6 rounded-t-lg bg-white flex-1 w-full">
                    <div className="container w-full h-auto sm:h-screen bg-[#FEFEFE]">
                        {/* Shop Profile Section */}
                        <div className='flex flex-col sm:flex-row gap-3 col-span-2'>
                            <img 
                                src={shop.imageUrl || '/src/assets/images/Sample.jpg'} 
                                alt={shop.tailorShopName}
                                className='w-full sm:w-48 h-48 object-cover rounded-lg'
                            />
                            <div className='flex flex-col'>
                                <h1 className='mt-1 mb-1.5 text-2xl font-bold'>{shop.tailorShopName}</h1>
                                <Rating />
                                <label className='mt-5 block font-normal text-[#c3c3c3] dark:text-gray-400'>
                                    {shop.completeAddress || 'Complete Address'}
                                </label>
                                
                                <div className='space-y-1'>
                                    {shop.openingHours && (
                                        <div>
                                            <h1 className='text-md font-medium'>Opening Hours:</h1>
                                            <p className='text-[#2b3a47]'>{shop.openingHours}</p>
                                        </div>
                                    )}
                                    {shop.description && (
                                        <div>
                                            <p className='text-[#2b3a47]'>{shop.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Products Section */}
                        <div className="border-t border-gray-100 mt-4 mb-4" />
                        <h2 className="text-2xl font-bold mb-4">Our Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                                        <img 
                                            src={product.imageUrl || '/src/assets/images/Sample.jpg'} 
                                            alt={product.name}
                                            className="w-full h-48 object-cover rounded-md mb-4"
                                        />
                                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                        <p className="text-gray-600 mb-2">{product.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-600 font-bold">₱{product.price}</span>
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No products available yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}