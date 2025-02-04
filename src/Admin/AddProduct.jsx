import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "../firebase";

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

export default function ClientProfile() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] =
    useState(false);
  const [newProduct, setNewProduct] = useState({
    Product_Name: "",
    Description: "",
    Fabric: "",
    Price: "",
    Photo_of_Product: "",
    Head_ID: "",
    Product_Measurement: {
      Measurement: {}, // Store measurements as a key-value map
      Size: "",
      Unit_of_Measurement: "cm", // Default unit
    },
  });
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userToken = await getIdToken(user);
        setToken(userToken);
        setUser(user);
        setNewProduct((prev) => ({ ...prev, Head_ID: user.uid })); // Set Head_ID to the user's UID
      } else {
        navigate("/AdminLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownVisible(!isCategoryDropdownVisible);
  };

  const handleCategorySelect = (category) => {
    const measurements = categoryFields[category].reduce((acc, field) => {
      acc[field] = ""; // Initialize each measurement field with an empty string
      return acc;
    }, {});

    setNewProduct((prev) => ({
      ...prev,
      Category: category, // Changed from `category` to `Category`
      Product_Measurement: {
        ...prev.Product_Measurement,
        Measurement: measurements, // Update the Measurement field
      },
    }));
    setIsCategoryDropdownVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleMeasurementChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      Product_Measurement: {
        ...prev.Product_Measurement,
        Measurement: {
          ...prev.Product_Measurement.Measurement,
          [name]: value, // Update the specific measurement field
        },
      },
    }));
  };

  const handleSizeChange = (e) => {
    const { value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      Product_Measurement: {
        ...prev.Product_Measurement,
        Size: value,
      },
    }));
  };

  const handleUnitChange = (e) => {
    const { value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      Product_Measurement: {
        ...prev.Product_Measurement,
        Unit_of_Measurement: value,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview URL
        setNewProduct((prev) => ({
          ...prev,
          Photo_of_Product: reader.result, // Store the Base64 string
        }));
      };
      reader.readAsDataURL(file); // Convert the image to Base64
    }
  };

  const handleAddProduct = async () => {
    try {
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      // Add the product to the Product subcollection
      const productRef = collection(db, "Administrator", user.uid, "Product");
      const docRef = await addDoc(productRef, {
        ...newProduct,
        Product_ID: "", // Firestore will auto-generate the ID
        Category: newProduct.Category, // Changed from `category` to `Category`
      });

      // Update the Product_ID field with the auto-generated ID
      await updateDoc(docRef, {
        Product_ID: docRef.id,
      });

      console.log("Product added successfully with ID:", docRef.id);
      navigate("/AdminShopProfile");
    } catch (e) {
      console.error("Error adding product:", e);
    }
  };

  return (
    <div className='bg-[#fefefe] min-h-screen'>
      <div className='h-full'>
        <div className='pl-4 py-2 flex items-center gap-5'>
          <a href='/AdminShopProfile'>
            <svg
              fill='#000000'
              className='w-12 h-12 hover:bg-[#f7f7f7] py-2 pr-1 rounded-full'
              viewBox='0 0 32 32'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g data-name='arrow left' id='arrow_left'>
                <path
                  className='cls-1'
                  d='M22,29.73a1,1,0,0,1-.71-.29L9.93,18.12a3,3,0,0,1,0-4.24L21.24,2.56A1,1,0,1,1,22.66,4L11.34,15.29a1,1,0,0,0,0,1.42L22.66,28a1,1,0,0,1,0,1.42A1,1,0,0,1,22,29.73Z'
                />
              </g>
            </svg>
          </a>
          <h1 className='text-xl'>New Product</h1>
        </div>

        <div className='bg-[#EBEBEB] px-10 py-7'>
          <div className='grid grid-cols-2 gap-3'>
            <div className='space-y-1 p-4 bg-[#fefefe]'>
              <p>Product Name</p>
              <input
                name='Product_Name'
                value={newProduct.Product_Name}
                onChange={handleInputChange}
                className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              />

              <p>Description</p>
              <textarea
                name='Description'
                value={newProduct.Description}
                onChange={handleInputChange}
                rows='4'
                className='block px-1.5 py-1 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none'
                placeholder='Enter description here...'
              />

              <p>Fabric</p>
              <input
                name='Fabric'
                value={newProduct.Fabric}
                onChange={handleInputChange}
                className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              />

              <p>Price</p>
              <input
                name='Price'
                value={newProduct.Price}
                onChange={handleInputChange}
                className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              />

              <p>Category</p>
              <div className='relative'>
                <button
                  onClick={toggleCategoryDropdown}
                  className='w-full text-gray-400 bg-gray-50 border border-gray-300 text-sm px-3 py-1.5 justify-between text-center inline-flex items-center'
                  type='button'
                  aria-expanded={isCategoryDropdownVisible}
                >
                  {newProduct.Category || "Select Category"}{" "}
                  {/* Updated to `Category` */}
                  <svg
                    className='w-2.5 h-2.5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 1 4 4 4-4'
                    />
                  </svg>
                </button>

                {isCategoryDropdownVisible && (
                  <div
                    id='dropdown'
                    className='absolute top-full mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44'
                  >
                    <ul className='py-2 text-sm text-gray-700'>
                      {Object.keys(categoryFields).map((category) => (
                        <li key={category}>
                          <button
                            onClick={() => handleCategorySelect(category)}
                            className='block px-4 py-2 hover:bg-gray-100 w-full text-left'
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className='px-4 py-2 space-y-1 bg-[#fefefe]'>
              <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-48 h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt='Preview'
                    className='w-full h-full object-cover rounded-lg'
                  />
                ) : (
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <svg
                      className='w-8 h-8 mb-4 text-gray-500'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 16'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                      />
                    </svg>
                    <p className='mb-2 text-xs text-gray-500'>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-center text-xs text-gray-500'>
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
                <input
                  id='dropzone-file'
                  type='file'
                  className='hidden'
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <div className='bg-[#fefefe] space-y-1 p-4 mt-3'>
            <p className='text-xl mb-3 font-medium'>Product Measurements</p>
            <div className='grid grid-cols-2 gap-3'>
              <div className='space-y-1'>
                <p>Size</p>
                <select
                  name='Size'
                  value={newProduct.Product_Measurement.Size}
                  onChange={handleSizeChange}
                  className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                >
                  <option value=''>Select Size</option>
                  <option value='Extra Small'>Extra Small</option>
                  <option value='Small'>Small</option>
                  <option value='Medium'>Medium</option>
                  <option value='Large'>Large</option>
                  <option value='Extra Large'>Extra Large</option>
                </select>
              </div>
              <div className='space-y-1'>
                <p>Unit of Measurement</p>
                <input
                  name='Unit_of_Measurement'
                  value={newProduct.Product_Measurement.Unit_of_Measurement}
                  onChange={handleUnitChange}
                  className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
            </div>

            {/* Display measurement fields based on the selected category */}
            {newProduct.Category && ( // Updated to `Category`
              <div className='mt-4'>
                <p className='text-lg font-medium'>Measurements</p>
                {Object.entries(newProduct.Product_Measurement.Measurement).map(
                  ([field, value]) => (
                    <div key={field} className='space-y-1'>
                      <p>{field}</p>
                      <input
                        name={field}
                        value={value}
                        onChange={handleMeasurementChange}
                        className='w-full px-1.5 py-1 text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <div className='grid justify-items-end pt-6'>
            <button
              type='button'
              onClick={handleAddProduct}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
