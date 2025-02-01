import React, { useEffect, useState } from "react";
import SchoolBlouse from '/src/assets/images/SchoolBlouse.jpg';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore'; // Added addDoc
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";

export default function OrderModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderType, setOrderType] = useState("premade");
  const [clientMeasurements, setClientMeasurements] = useState({});
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !selectedProduct) return;

    setIsSubmitting(true);

    try {
      const form = e.target;
      const formData = new FormData(form);

      if (!selectedProduct.name || !selectedProduct.price) {
        alert("Selected product is invalid. Please try again.");
        return;
      }

      const quantity = parseInt(formData.get("quantity"), 10);
      if (isNaN(quantity) || quantity < 1) {
        alert("Please enter a valid quantity.");
        return;
      }

      const orderData = {
        product: {
          id: selectedProduct.id || `fallback-id-${Date.now()}`,
          name: selectedProduct.name || "Unnamed Product",
          price: selectedProduct.price || 0,
          size: selectedProduct.size || "Not Specified",
          category: selectedProduct.category || "Uncategorized",
          imageUrl: selectedProduct.imageUrl || SchoolBlouse,
        },
        client: {
          uid: user.uid,
          email: user.email,
          measurements: clientMeasurements || {},
        },
        orderDetails: {
          type: orderType || "premade",
          quantity: quantity,
          size: formData.get("size") || "Not Specified",
          remarks: formData.get("remarks") || "No Remarks",
          status: "pending",
        },
        createdAt: new Date(),
      };

      console.log("Order Data:", orderData);

      // Add the order to the 'orders' subcollection under the selected adminUser
      const ordersRef = collection(db, "adminUsers", selectedProduct.adminId, "orders");
      await addDoc(ordersRef, orderData);

      setIsModalVisible(false);
      alert("Order submitted successfully!");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Error submitting order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "adminUsers"));
        const allProducts = [];

        querySnapshot.forEach((adminDoc) => {
          const userProducts = adminDoc.data().productList || [];
          userProducts.forEach((product) => {
            allProducts.push({
              ...product,
              adminId: adminDoc.id, // Store adminId for reference
              tailorShopName: adminDoc.data().tailorShopName,
            });
          });
        });

        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch client measurements
  useEffect(() => {
    const fetchClientMeasurements = async () => {
      if (selectedProduct && user) {
        try {
          const clientDoc = await getDoc(doc(db, 'clientUsers', user.uid));
          if (clientDoc.exists()) {
            setClientMeasurements(clientDoc.data().measurements || {});
          }
        } catch (error) {
          console.error("Error fetching client measurements:", error);
        }
      }
    };

    fetchClientMeasurements();
  }, [selectedProduct, user]);

  // Toggle modal visibility
  const toggleModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(!isModalVisible);
  };

  // Handle order type change
  const handleOrderTypeChange = (event) => {
    setOrderType(event.target.value);
  };

  // Render measurement fields based on product category
  const renderMeasurementFields = () => {
    if (!selectedProduct || !selectedProduct.category) return null;

    const fields = {
      blouse: ["shoulder", "sleeve", "circumference", "figure", "blouseLength", "blouseBust", "blouseWaist", "blouseHips", "frontChest", "backChest", "bustPoint", "bustDistance"],
      skirt: ["skirtLength", "skirtWaist", "skirtHips"],
      pants: ["crotch", "pantsLength", "knee", "ankleFlare"],
      blazer: ["shoulder", "sleeve", "circumference", "figure", "frontChest", "backChest", "bustPoint", "bustDistance"],
      shirt: ["shoulder", "sleeve", "circumference", "figure", "frontChest", "backChest", "poloLength", "poloWaist", "poloHips"],
    };

    const categoryFields = fields[selectedProduct.category.toLowerCase()] || [];

    return (
        <>
          {categoryFields.map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                type="text"
                name={field}
                className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="cm"
                value={clientMeasurements[field] || ""} // Auto-fill with client measurements
                required
                readOnly // Make fields read-only if needed
              />
            </div>
          ))}
        </>
      );
    };

    return ( 
        <div>
            {products.map((product) => (
            <button 
                key={product.id}
                class="text-left w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                onClick={() => toggleModal(product)}
            >
                <img 
                class="p-3 rounded-t-lg object-cover w-fit h-fit" 
                src={product.imageUrl || SchoolBlouse} 
                alt={product.name} 
                />
                <div class="px-4 py-3">
                    <h5 class="mb-2 line-clamp-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {product.name}
                    </h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        Size: {product.size}
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        Price: ₱{product.price}
                    </p>
                </div>
            </button>
            ))}

            {isModalVisible && ( // Render modal conditionally based on state
            <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-4xl max-h-full">
                    <div className="px-5 py-3 bg-white rounded-lg">
                        <button
                        type="button"
                        onClick={() => setIsModalVisible(false)}
                        className="grid place-self-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg mb-2 text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                            >
                            <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="grid grid-cols-2">
                            <div>
                            <img src={selectedProduct.imageUrl || SchoolBlouse } className="m-2 w-full" alt={selectedProduct.name}/>
                            </div>
                            <div className="pl-5 container w-full h-full">
                            <label className="text-xl font-medium">{selectedProduct.name} </label><span className="text-[#22B14C]">Available</span>
                                <div className="flex items-center">
                                <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.5 11V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5C16.2712 22 18.1569 22 19.3284 20.8284C20.5 19.6569 20.5 17.7712 20.5 14V11" stroke="#7F7F7F" stroke-width="1.5"/>
                                <path d="M9.4998 2H14.4998L15.1515 8.51737C15.338 10.382 13.8737 12 11.9998 12C10.1259 12 8.6616 10.382 8.84806 8.51737L9.4998 2Z" stroke="#7F7F7F" stroke-width="1.5"/>
                                <path d="M3.32975 5.35133C3.50783 4.46093 3.59687 4.01573 3.77791 3.65484C4.15938 2.89439 4.84579 2.33168 5.66628 2.10675C6.05567 2 6.50969 2 7.41771 2H9.50002L8.77549 9.24527C8.61911 10.8091 7.30318 12 5.73155 12C3.8011 12 2.35324 10.2339 2.73183 8.34093L3.32975 5.35133Z" stroke="#7F7F7F" stroke-width="1.5"/>
                                <path d="M20.6703 5.35133C20.4922 4.46093 20.4031 4.01573 20.2221 3.65484C19.8406 2.89439 19.1542 2.33168 18.3337 2.10675C17.9443 2 17.4903 2 16.5823 2H14.5L15.2245 9.24527C15.3809 10.8091 16.6968 12 18.2685 12C20.1989 12 21.6468 10.2339 21.2682 8.34093L20.6703 5.35133Z" stroke="#7F7F7F" stroke-width="1.5"/>
                                <path d="M9.5 21.5V18.5C9.5 17.5654 9.5 17.0981 9.70096 16.75C9.83261 16.522 10.022 16.3326 10.25 16.201C10.5981 16 11.0654 16 12 16C12.9346 16 13.4019 16 13.75 16.201C13.978 16.3326 14.1674 16.522 14.299 16.75C14.5 17.0981 14.5 17.5654 14.5 18.5V21.5" stroke="#7F7F7F" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                                <label className="pt-2 pl-1 pb-2 text-[#7F7F7F]">{selectedProduct.tailorShopName} </label>
                                </div>
                                

                                <form className="pt-2 overflow-y-auto max-h-[59vh] pr-2">
                                <div className="gap-3 grid grid-cols-3">
                                    <div>
                                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                            <select
                                            id="quantity"
                                            name="quantity"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            required
                                            >
                                            <option value="">-</option>
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                            </select>
                                    </div>
                                    <div>
                                        <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type of Order</label>
                                            <select
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            onChange={handleOrderTypeChange}
                                            value={orderType}
                                            >
                                            <option selected>-</option>
                                            <option value="premade">Premade</option>
                                            <option value="customized">Customized</option>
                                            <option value="adjust">Adjust</option>
                                            </select>
                                    </div>
                                    {orderType !== "adjust" && (
                                    <div>
                                        <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                                            <select
                                            id="size"
                                            name="size"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            >
                                            <option selected>-</option>
                                            <option>Extra Small</option>
                                            <option>Small</option>
                                            <option>Medium</option>
                                            <option>Large</option>
                                            <option>Extra Large</option>
                                            </select>
                                    </div>
                                    )}
                                </div>
                                <div className="border-t border-gray-100 mt-4 mb-2" />
                                {orderType === "customized" && (
                                    <div className="gap-5 grid grid-cols-3">
                                        {renderMeasurementFields()}
                                    </div>
                                )}                                    

                                <div className="border-t border-gray-100 mt-4 mb-2" />
                                <label htmlFor="shoulder" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Remarks</label>
                                <textarea 
                                id="message" 
                                rows="4" 
                                className="block px-1.5 py-1 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" 
                                placeholder="Enter remarks here..."
                                ></textarea>
                                
                                <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-3 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Order'}
                                </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
