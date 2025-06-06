import React, { useEffect, useState } from "react";
import Placeholder from "/src/assets/images/Placeholder.jpg";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import emailjs from "@emailjs/browser";

emailjs.init("ctn-kzvtxyyiPma5K");

const categoryFields = {
  Blouse: [
    "Shoulder",
    "Sleeve",
    "Circumference",
    "Figure",
    "Blouse Length",
    "Blouse Bust",
    "Blouse Waist",
    "Blouse Hips",
    "Front Chest",
    "Back Chest",
    "Bust Point",
    "Bust Distance",
  ],
  Skirt: ["Skirt Length", "Skirt Waist", "Skirt Hips"],
  Pants: ["Crotch", "Pants Length", "Knee", "Ankle Flare"],
  Blazer: [
    "Shoulder",
    "Sleeve",
    "Circumference",
    "Figure",
    "Front Chest",
    "Back Chest",
    "Bust Point",
    "Bust Distance",
  ],
  Shirt: [
    "Shoulder",
    "Sleeve",
    "Circumference",
    "Figure",
    "Front Chest",
    "Back Chest",
    "Polo Length",
    "Polo Waist",
    "Polo Hips",
  ],
};

export default function OrderModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clientName, setClientName] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderType, setOrderType] = useState("premade");
  const [clientMeasurements, setClientMeasurements] = useState({});
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productMeasurements, setProductMeasurements] = useState({});
  const [userMeasurements, setUserMeasurements] = useState({});
  const [receiptImage, setReceiptImage] = useState("");
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [quantity, setQuantity] = useState("");

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const adminUsersRef = collection(db, "Administrator");
        const adminUsersSnapshot = await getDocs(adminUsersRef);
        const allProducts = [];

        for (const adminDoc of adminUsersSnapshot.docs) {
          const productsRef = collection(
            db,
            "Administrator",
            adminDoc.id,
            "Product"
          );
          const productsSnapshot = await getDocs(productsRef);

          productsSnapshot.forEach((productDoc) => {
            const productData = productDoc.data();
            allProducts.push({
              id: productDoc.id,
              adminId: adminDoc.id,
              tailorShopName: adminDoc.data().Tailor_Shop_Name,
              ...productData,
            });
          });
        }

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

  // Fetch client measurements and product measurements
  useEffect(() => {
    const fetchClientAndProductMeasurements = async () => {
      if (selectedProduct && user) {
        try {
          // Fetch client measurements
          const clientDoc = await getDoc(doc(db, "Client", user.uid));
          if (clientDoc.exists()) {
            setClientMeasurements(clientDoc.data().measurements || {});
            setClientName(clientDoc.data().First_Name || "Client");
          }

          // Fetch product measurements
          const productDoc = await getDoc(
            doc(
              db,
              "Administrator",
              selectedProduct.adminId,
              "Product",
              selectedProduct.id
            )
          );
          if (productDoc.exists()) {
            const productData = productDoc.data();
            setProductMeasurements(
              productData.Product_Measurement?.Measurement || {}
            );
          }
        } catch (error) {
          console.error("Error fetching measurements:", error);
        }
      }
    };

    fetchClientAndProductMeasurements();
  }, [selectedProduct, user]);

  // Toggle modal visibility
  const toggleModal = async (product) => {
    setSelectedProduct(product);
    setIsModalVisible(!isModalVisible);

    try {
      const adminDoc = await getDoc(doc(db, "Administrator", product.adminId));
      if (adminDoc.exists()) {
        setAdminEmail(adminDoc.data().Email);
        console.log("Admin Email:", adminDoc.data().Email);
      }
    } catch (error) {
      console.error("Error fetching admin email:", error);
    }
  };

  // Handle order type change
  const handleOrderTypeChange = async (event) => {
    const selectedOrderType = event.target.value;
    setOrderType(selectedOrderType);

    if (selectedOrderType === "customized" && user) {
      try {
        const clientDoc = await getDoc(doc(db, "Client", user.uid));
        if (clientDoc.exists()) {
          const measurementProfile = clientDoc.data().Measurement_Profile || {};
          setUserMeasurements(measurementProfile);
        }
      } catch (error) {
        console.error("Error fetching user measurements:", error);
      }
    }
  };

  // New: Handle receipt image upload (similar to AddProduct.jsx)
  const handleReceiptImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result); // Set the preview
        setReceiptImage(reader.result); // Store the Base64 string in state
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.target);
      const quantity = parseInt(formData.get("quantity"), 10);
      const totalPrice = selectedProduct.Price * quantity;

      //Validate quantity
      if (quantity > selectedProduct.Stock) {
        alert("Quantity exceeds available stock");
        return;
      }

      const orderData = {
        Product_Id: selectedProduct.id,
        Product_Name: selectedProduct.Product_Name,
        Quantity: formData.get("quantity"),
        Total_Price: totalPrice,
        Order_Type: orderType,
        Size: formData.get("size"),
        Measurements:
          orderType === "customized" ? userMeasurements : clientMeasurements,
        Remarks: formData.get("message"),
        Receipt_Image_Verification: receiptImage,
        Client_Id: user.uid, // Include clientId
        Client_Name: clientName,
        Client_Email: user.email,
        Tailor_Shop_Id: selectedProduct.adminId,
        Status: "pending",
        Order_Date: new Date(),
      };

      const productRef = doc(
        db,
        "Administrator",
        selectedProduct.adminId,
        "Product",
        selectedProduct.id
      );

      await updateDoc(productRef, {
        Stock: increment(-quantity),
      });

      // 1. Create a document in the Client's Orders subcollection and get its ID
      const clientOrderRef = await addDoc(
        collection(db, "Client", user.uid, "Orders"),
        orderData
      );
      const orderId = clientOrderRef.id;

      // 2. Update Administrator's Order_List with clientId and orderId
      const adminOrderData = {
        ...orderData,
        clientId: user.uid, // Explicitly include clientId
        orderId: orderId, // Include the Client's Orders document ID
      };

      const adminRef = doc(db, "Administrator", selectedProduct.adminId);
      await updateDoc(adminRef, {
        Order_List: arrayUnion(adminOrderData),
      });

      const emailParams = {
        to_email: adminEmail,
        product_name: selectedProduct.Product_Name,
        client_name: clientName || "Client",
        order_type: orderType,
        size: formData.get("size"),
        remarks: formData.get("message"),
        tailor_shop_name: selectedProduct.tailorShopName,
        order_date: new Date().toLocaleDateString(),
      };

      console.log("Email Params:", emailParams);

      await emailjs.send("service_3v21zqa", "template_rqiso1o", emailParams);

      alert(
        "Order submitted successfully! An email has been sent to the administrator."
      );
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error submitting order or sending email:", error);
      alert("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPremadeMeasurementFields = () => {
    if (!selectedProduct || !productMeasurements) return null;

    return (
      <div className='gap-5 grid grid-cols-3'>
        {Object.entries(productMeasurements).map(([field, value]) => (
          <div key={field}>
            <label
              htmlFor={field}
              className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'
            >
              {field
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </label>
            <input
              type='text'
              name={field}
              className='text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              placeholder='cm'
              value={value || ""}
              required
              readOnly
            />
          </div>
        ))}
      </div>
    );
  };

  const renderCustomizedMeasurementFields = () => {
    if (!userMeasurements) return null;

    return (
      <div className='gap-5 grid grid-cols-3'>
        {Object.entries(userMeasurements).map(([field, value]) => (
          <div key={field}>
            <label
              htmlFor={field}
              className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'
            >
              {field
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </label>
            <input
              type='text'
              name={field}
              className='text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mb-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              placeholder='cm'
              value={value || ""}
              required
              readOnly
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='grid grid-cols-5 gap-4'>
      {products.map((product) => (
        <button
          key={product.Product_ID}
          className={`text-left w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700' ${
            product.Stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => toggleModal(product)}
        >
          <img
            className='p-3 rounded-t-lg object-cover w-full h-52'
            src={product.Photo_of_Product || Placeholder}
            alt={product.Product_Name}
          />
          <div className='px-4 py-3'>
            <h5 className='truncate mb-2 line-clamp-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {product.Product_Name}
            </h5>
            <p className='font-normal text-gray-700 dark:text-gray-400'>
              Size: {product.Product_Measurement?.Size || "Not Specified"}
            </p>
            <p className='font-normal text-gray-700 dark:text-gray-400'>
              Price: ₱{product.Price}
            </p>
            <p
              className={`font-normal ${
                product.Stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.Stock > 0
                ? `Available: ${product.Stock}`
                : "Out of Stock"}
            </p>
          </div>
        </button>
      ))}

      {isModalVisible && (
        <div className='fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50'>
          <div className='relative p-4 w-full max-w-4xl max-h-full'>
            <div className='px-5 py-3 bg-white h-full rounded-lg'>
              <button
                type='button'
                onClick={() => setIsModalVisible(false)}
                className='grid place-self-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg mb-2 text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              >
                <svg
                  className='w-4 h-4'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
              <div className='grid grid-cols-2'>
                <div>
                  <img
                    src={selectedProduct.Photo_of_Product || Placeholder}
                    className='rounded-t-lg object-cover w-fit h-fit'
                    alt={selectedProduct.Product_Name}
                  />
                </div>
                <div className='pl-5 container w-full h-full'>
                  <label className='text-xl font-medium'>
                    {selectedProduct.Product_Name}{" "}
                  </label>
                  <span
                    className={`block ${
                      selectedProduct.Stock > 0
                        ? "text-[#22B14C]"
                        : "text-red-600"
                    }`}
                  >
                    {selectedProduct.Stock > 0 ? "Available" : "Out of Stock"}
                  </span>
                  <div className='flex flex-col'>
                    <div className='flex items-center'>
                      <svg
                        className='w-4 h-4'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M3.5 11V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5C16.2712 22 18.1569 22 19.3284 20.8284C20.5 19.6569 20.5 17.7712 20.5 14V11'
                          stroke='#7F7F7F'
                          strokeWidth='1.5'
                        />
                        <path
                          d='M9.4998 2H14.4998L15.1515 8.51737C15.338 10.382 13.8737 12 11.9998 12C10.1259 12 8.6616 10.382 8.84806 8.51737L9.4998 2Z'
                          stroke='#7F7F7F'
                          strokeWidth='1.5'
                        />
                        <path
                          d='M3.32975 5.35133C3.50783 4.46093 3.59687 4.01573 3.77791 3.65484C4.15938 2.89439 4.84579 2.33168 5.66628 2.10675C6.05567 2 6.50969 2 7.41771 2H9.50002L8.77549 9.24527C8.61911 10.8091 7.30318 12 5.73155 12C3.8011 12 2.35324 10.2339 2.73183 8.34093L3.32975 5.35133Z'
                          stroke='#7F7F7F'
                          strokeWidth='1.5'
                        />
                        <path
                          d='M20.6703 5.35133C20.4922 4.46093 20.4031 4.01573 20.2221 3.65484C19.8406 2.89439 19.1542 2.33168 18.3337 2.10675C17.9443 2 17.4903 2 16.5823 2H14.5L15.2245 9.24527C15.3809 10.8091 16.6968 12 18.2685 12C20.1989 12 21.6468 10.2339 21.2682 8.34093L20.6703 5.35133Z'
                          stroke='#7F7F7F'
                          strokeWidth='1.5'
                        />
                        <path
                          d='M9.5 21.5V18.5C9.5 17.5654 9.5 17.0981 9.70096 16.75C9.83261 16.522 10.022 16.3326 10.25 16.201C10.5981 16 11.0654 16 12 16C12.9346 16 13.4019 16 13.75 16.201C13.978 16.3326 14.1674 16.522 14.299 16.75C14.5 17.0981 14.5 17.5654 14.5 18.5V21.5'
                          stroke='#7F7F7F'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                        />
                      </svg>
                      <label className='pt-2 pl-1 pb-2 text-[#7F7F7F]'>
                        {selectedProduct.tailorShopName}{" "}
                      </label>
                    </div>
                    <div className='text-[#7f7f7f]'>
                      {selectedProduct.Description}{" "}
                    </div>
                  </div>

                  <form
                    className='pt-2 overflow-y-auto max-h-[59vh] pr-2'
                    onSubmit={handleSubmit}
                  >
                    <div className='gap-3 grid grid-cols-3'>
                      <div>
                        <label
                          htmlFor='quantity'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Quantity
                        </label>
                        <input
                          min={1}
                          max={selectedProduct.Stock}
                          type='number'
                          id='quantity'
                          name='quantity'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                          required
                          placeholder='-'
                          disabled={selectedProduct.Stock <= 0}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value) || 1)
                          }
                        ></input>
                      </div>
                      <div>
                        <label
                          htmlFor='order_type'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Type of Order
                        </label>
                        <select
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                          onChange={handleOrderTypeChange}
                          value={orderType}
                          required
                        >
                          <option value=''>-</option>
                          <option value='premade'>Premade</option>
                          <option value='customized'>Customized</option>
                          <option value='adjust'>Adjust</option>
                        </select>
                      </div>
                      {orderType !== "adjust" && (
                        <div>
                          <label
                            htmlFor='size'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                          >
                            Size
                          </label>
                          <select
                            id='size'
                            name='size'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-600'
                          >
                            <option value=''>-</option>
                            <option>Extra Small</option>
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                            <option>Extra Large</option>
                          </select>
                        </div>
                      )}
                    </div>
                    <div className='border-t border-gray-100 mt-4 mb-2' />

                    {orderType === "premade" &&
                      renderPremadeMeasurementFields()}
                    {orderType === "customized" &&
                      renderCustomizedMeasurementFields()}

                    <div className='border-t border-gray-100 mt-4 mb-2' />
                    <label
                      htmlFor='message'
                      className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Remarks
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      rows='4'
                      className='block px-1.5 py-1 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none'
                      placeholder='Enter remarks here...'
                    ></textarea>
                    <div className='mt-4 mb-2 font-semibold text-gray-900 dark:text-white'>
                      Total Price: ₱
                      {(selectedProduct.Price * quantity).toLocaleString()}
                    </div>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='mt-3 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                      {isSubmitting ? "Submitting..." : "Submit Order"}
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
