import React, { useState, useEffect } from "react";
import ClientHeader from "/src/components/ClientHeader.jsx";
import Sample from "/src/assets/images/Sample.jpg";
import { db } from "/src/firebase";
import Rating from "/src/components/Rating";
import { collection, getDocs } from "firebase/firestore";

export default function TailorShops() {
  const [firstName, setFirstName] = useState("");
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch shops and user data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch shops
        const shopsSnapshot = await getDocs(collection(db, "Administrator"));
        const shopsData = shopsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setShops(shopsData);

        // Fetch user data
        const userSnapshot = await getDocs(collection(db, "Client"));
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setFirstName(userData.firstName || "");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-[#20262B] flex items-center justify-center text-white'>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-[#20262B] flex items-center justify-center text-red-500'>
        {error}
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#20262B]'>
      <ClientHeader username={firstName || "Client"} />

      <div className='py-8'>
        <h1 className='font-bold text-center text-white text-3xl sm:text-4xl mb-8'>
          Tailor Shops
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 sm:mx-10 lg:mx-20'>
          {shops.map((shop) => (
            <div
              key={shop.id}
              className='bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out'
            >
              <a href={`/ViewShopProfile/${shop.id}`} className='block'>
                <img
                  className='w-full h-48 object-cover'
                  src={shop.imageUrl || Sample}
                  alt={shop.Tailor_Shop_Name}
                />
                <div className='p-4'>
                  <h2 className='text-2xl font-bold text-gray-900 dark:text-white line-clamp-2'>
                    {shop.Tailor_Shop_Name}
                  </h2>
                  <div className='my-2'>
                    <Rating />
                  </div>
                  <p className='text-gray-700 dark:text-gray-400'>
                    {shop.Opening_Hours}
                  </p>
                  <p className='text-gray-700 dark:text-gray-400 font-semibold'>
                    {shop.Complete_Address}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
