import React, { useEffect, useState } from "react";
import OrderModal from "../components/OrderModal";
import ClientHeader from "/src/components/ClientHeader.jsx";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "../firebase";
import {
  getDoc,
  doc,
  collectionGroup,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

export default function ClientHomepage() {
  const [user, setUser] = useState(null);
  const [First_Name, setFirstName] = useState("");
  const [token, setToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userToken = await getIdToken(user);
        setToken(userToken);

        const userDoc = await getDoc(doc(db, "Client", user.uid));
        if (userDoc.exists()) {
          setFirstName(userDoc.data().First_Name);
        }

        setUser(user);
      } else {
        navigate("/ClientLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build the base query
      let productsQuery = query(
        collectionGroup(db, "Product"),
        where("Product_Name", ">=", searchTerm.trim()),
        where("Product_Name", "<=", searchTerm.trim() + "\uf8ff")
      );

      // Add category filter if a category is selected
      if (selectedCategory) {
        productsQuery = query(
          productsQuery,
          where("Category", "==", selectedCategory)
        );
      }

      const querySnapshot = await getDocs(productsQuery);
      const results = [];
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        results.push({
          id: doc.id,
          ...productData,
          Head_ID: productData.Head_ID,
        });
      });

      // Fetch tailor shop names
      const headIds = [...new Set(results.map((p) => p.Head_ID))];
      const shopPromises = headIds.map((id) =>
        getDoc(doc(db, "Administrator", id))
      );
      const shopSnapshots = await Promise.all(shopPromises);

      const shopMap = {};
      shopSnapshots.forEach((snap, index) => {
        if (snap.exists()) {
          shopMap[headIds[index]] = snap.data().Tailor_Shop_Name;
        }
      });

      const mergedResults = results.map((product) => ({
        ...product,
        Tailor_Shop_Name: shopMap[product.Head_ID] || "Unknown Tailor Shop",
      }));

      setSearchResults(mergedResults);
    } catch (error) {
      console.error("Error searching products: ", error);
      setError("Failed to search products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(
      (prevCategory) => (prevCategory === category ? null : category) // Toggle category selection
    );
  };

  // Clear search results when category is changed
  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch({ preventDefault: () => {} }); // Trigger search when category changes
    }
  }, [selectedCategory]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='bg-[f7f7f7]'>
      <div>
        <ClientHeader userName={First_Name || ""} />
      </div>

      <div className='px-10 sm:px-10 py-7'>
        {/* Search form */}
        <form className='w-full mx-auto' onSubmit={handleSearch}>
          <label
            htmlFor='default-search'
            className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
          >
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='search'
              id='default-search'
              className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
              placeholder='Search for apparel or tailor shop...'
              required
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type='submit'
              className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Search
            </button>
          </div>
        </form>

        {/* Loading and error messages */}
        {loading && <p className='mt-4 text-gray-600'>Searching...</p>}
        {error && <p className='mt-4 text-red-500'>{error}</p>}

        {/* Search results */}
        <div className='mt-5'>
          {searchResults.map((product) => (
            <div key={product.id} className='p-4 border-b border-gray-200'>
              <h3 className='text-lg font-semibold'>{product.Product_Name}</h3>
              <p className='text-sm text-gray-600'>{product.Description}</p>
              <p className='text-sm text-gray-600'>Price: ₱{product.Price}</p>
              <p className='text-sm text-gray-600'>
                Tailor Shop: {product.Tailor_Shop_Name}
              </p>
              <p className='text-sm text-gray-600'>
                Category: {product.Category}
              </p>
            </div>
          ))}
        </div>

        <div className='py-3 w-full'>
          <OrderModal
            products={searchResults}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
}
