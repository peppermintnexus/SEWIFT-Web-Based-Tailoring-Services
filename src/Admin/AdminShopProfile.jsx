import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import ProductModal from "../components/ProductModal";
import Rating from "/src/components/Rating";
import Placeholder from "/src/assets/images/Placeholder.jpg";
import SchoolSkirt from "/src/assets/images/SchoolSkirt.jpg";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

export default function AdminShopProfile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);
  const [Tailor_Shop_Name, setTailorShopName] = useState("");
  const [Complete_Address, setCompleteAddress] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([]); // Renamed to `products` for clarity
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const idToken = await user.getIdToken();
        setToken(idToken);

        const userDoc = await getDoc(doc(db, "Administrator", user.uid));
        if (userDoc.exists()) {
          setName(userDoc.data().name);
          setTailorShopName(userDoc.data().Tailor_Shop_Name);
          setCompleteAddress(userDoc.data().Complete_Address);
          setOpeningHours(userDoc.data().openingHours || "");
          setDescription(userDoc.data().description || "");

          // Fetch products from the `Product` subcollection
          const productsCollection = collection(
            db,
            "Administrator",
            user.uid,
            "Product"
          );
          const productsSnapshot = await getDocs(productsCollection);
          const productsList = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productsList); // Set the fetched products
        }
      } else {
        navigate("/AdminLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const userDocRef = doc(db, "Administrator", user.uid);
    await updateDoc(userDocRef, {
      openingHours: openingHours,
      description: description,
    });
    setIsEditing(false);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AdminSidebar
        Tailor_Shop_Name={Tailor_Shop_Name || ""}
        Complete_Address={Complete_Address || ""}
      />

      <div className='p-4 sm:ml-64 bg-gray-100 dark:bg-gray-800 min-h-screen h-full'>
        <div className='shadow w-full p-5 bg-white'>
          <div className='grid grid-cols-3'>
            <div className='col-span-2 flex'>
              <img src={Placeholder} className='w-48 h-48' alt='Tailor Shop' />
              <div className='flex flex-col ml-5 justify-between'>
                <div>
                  <h1 className='text-xl font-medium'>{Tailor_Shop_Name}</h1>
                  <Rating />
                </div>

                {isEditing ? (
                  <div>
                    <input
                      type='text'
                      value={openingHours}
                      onChange={(e) => setOpeningHours(e.target.value)}
                      placeholder='Opening Hours ( 00:00 AM - 00:00 PM )'
                      className='w-full sm:w-96 block font-normal text-gray-700 mb-2 border border-gray-300 rounded p-1'
                    />
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder='Enter your shop description'
                      className='block w-full sm:w-96 font-normal text-gray-700 mb-2 border border-gray-300 rounded p-1 resize-none'
                    />
                  </div>
                ) : (
                  <>
                    <label className='text-[#7f7f7f] font-medium'>
                      {openingHours || ""}
                    </label>
                    <label className='text-[#7f7f7f]'>
                      {description || ""}
                    </label>
                  </>
                )}
                <h1 className='flex truncate items-center text-sm text-[#c3c3c3]'>
                  <svg
                    className='w-5 h-5 mr-1'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z'
                      stroke='#c3c3c3'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z'
                      stroke='#c3c3c3'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  {Complete_Address || "Complete Address"}
                </h1>
              </div>
            </div>
            <div className='flex items-start justify-self-end'>
              {isEditing ? (
                <button
                  type='button'
                  onClick={handleSave}
                  className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                >
                  Save
                </button>
              ) : (
                <button
                  type='button'
                  onClick={handleEdit}
                  className='text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <div className='border-t border-gray-100 mt-3 mb-3' />
          <div className='grid gap-5 grid-cols-1 sm:grid-cols-2'>
            {products.map((product) => (
              <ProductModal key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
