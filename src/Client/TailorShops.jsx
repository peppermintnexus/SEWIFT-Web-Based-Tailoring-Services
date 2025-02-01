import React, { useState, useEffect } from "react";
import ClientHeader from "/src/components/ClientHeader.jsx";
import Sample from "/src/assets/images/Sample.jpg";
import { db } from "/src/firebase";
import Rating from "/src/components/Rating";
import { collection, getDocs } from "firebase/firestore";

export default function TailorShops() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [shops, setShops] = useState([]);

  // Fetch shops from Firebase
  useEffect(() => {
    const fetchShops = async () => {
      const querySnapshot = await getDocs(collection(db, "adminUsers"));
      const shopsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setShops(shopsData);
    };

    fetchShops();
  }, []);

  const openModal = (shop) => {
    setSelectedShop(shop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShop(null);
  };

  return (
    <div className='min-h-screen bg-[#20262B]'>
      <div>
        <ClientHeader />
      </div>

      <p className='font-bold text-center text-white pt-5 pb-9 text-3xl sm:text-4xl'>
        Tailor Shops
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-4 sm:mx-10 lg:mx-40 rounded-lg p-3 gap-5'>
        {shops.map((shop) => (
          <div
            key={shop.id}
            className='shadow-lg hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-lg'
          >
            <a href={`/ViewShopProfile/${shop.id}`} className='block'>
              <div className='max-w-sm h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                <img
                  className='rounded-t-lg object-cover w-full h-48'
                  src={shop.imageUrl || Sample}
                  alt='Tailor Shop'
                />
                <div className='p-4'>
                  <div className='container w-full h-16 overflow-hidden'>
                    <h5 className='line-clamp-2 text-2xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                      {shop.tailorShopName}
                    </h5>
                    <Rating />
                  </div>
                  <p className='font-normal text-gray-700 dark:text-gray-400'>
                    {shop.openingHours}
                  </p>
                  <p className='font-semibold text-gray-700 dark:text-gray-400'>
                    {shop.completeAddress}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
