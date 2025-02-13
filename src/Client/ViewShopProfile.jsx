import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientHeader from "/src/components/ClientHeader.jsx";
import { db } from "/src/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Rating from "/src/components/Rating";
import OrderModal from "../components/OrderModal";

export default function ViewShopProfile() {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchShopDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "Administrator", shopId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setShop(docSnap.data());
          setIsModalVisible(true); // Automatically open modal when shop data is available

          const productsColRef = collection(
            db,
            `Administrator/${shopId}/Product`
          );
          const productsSnapshot = await getDocs(productsColRef);
          const productsData = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productsData);
        } else {
          setError("Shop not found");
          setProducts([]);
        }
      } catch (error) {
        setError("Failed to load shop details");
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

  if (error) {
    return <div className='bg-[#FEFEFE] min-h-screen relative'>{error}</div>;
  }

  if (!shop) {
    return (
      <div className='bg-[#FEFEFE] min-h-screen relative'>Shop not found</div>
    );
  }

  return (
    <div className='bg-[#20262B] min-h-screen '>
      <ClientHeader />
      <div className='mx-4 sm:mx-10 md:mx-20 lg:mx-26 pt-10 flex'>
        <div className='p-6 rounded-t-lg bg-white flex-1 w-full'>
          <div className='container w-full bg-[#FEFEFE]'>
            <div className='grid grid-cols-2'>
              <div className='col-start-1'>
                <img
                  src={shop.imageUrl || "/src/assets/images/Placeholder.jpg"}
                  alt={shop.Tailor_Shop_Name}
                  className='w-full fit h-56 object-cover rounded-lg'
                />
              </div>
              <div className='justify-between ml-5 flex flex-col'>
                <div>
                  <h1 className='b-0.5 text-xl font-bold'>
                    {shop.Tailor_Shop_Name}
                  </h1>
                  <Rating />
                </div>
                <div className='space-y-4'>
                  {shop.openingHours && (
                    <div>
                      <p className='text-[#2b3a47] font-semibold'>
                        {shop.openingHours}
                      </p>
                    </div>
                  )}
                  {shop.description && (
                    <div>
                      <p className='text-[#7f7f7f]'>{shop.description}</p>
                    </div>
                  )}

                  <div className='mt-3 flex'>
                    <svg
                      className='w-5 h-5 mr-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z'
                        stroke='#c3c3c3'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z'
                        stroke='#c3c3c3'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                    <label className='block font-normal text-[#c3c3c3] dark:text-gray-400'>
                      {shop.Complete_Address || "Complete Address"}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className='border-t border-gray-100 mt-4 mb-4' />
            <div className='pb-10'>
              <h2 className='text-2xl font-bold mb-4'>Our Products</h2>
              <div>
                {products.map((product) => (
                  <div key={product.id}>
                    {() => {
                      setSelectedProduct(product);
                      setIsModalVisible(true);
                    }}
                  </div>
                ))}
              </div>
              {isModalVisible && (
                <OrderModal
                  product={selectedProduct}
                  shopId={shopId}
                  shopName={shop.Tailor_Shop_Name}
                  onClose={() => {
                    setIsModalVisible(false);
                    setSelectedProduct(null);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
