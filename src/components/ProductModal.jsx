import React from "react";
import Placeholder from "/src/assets/images/Placeholder.jpg";
import { useNavigate } from "react-router";

export default function ProductModal({ product, index }) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/EditProduct/${product.id}`);
  };

  return (
    <div onClick={handleEditClick} className='cursor-pointer'>
      <div className='border bg-[#fefefe] shadow'>
        <div className='text-left grid grid-cols-2'>
          <div>
            <img
              src={product.Photo_of_Product || Placeholder}
              className='p-3 rounded-t-lg object-cover w-fit h-fit'
              alt={product.Product_Name}
            />
          </div>
          <div class='px-2 py-3'>
            <p class='mb-2 line-clamp-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {product.Product_Name}
            </p>
            <p class='block font-normal text-gray-700 dark:text-gray-400'>
              {product.Category}
            </p>
            <p class='block font-normal text-gray-700 dark:text-gray-400'>
              {product.Size}
            </p>
            <p class='block font-normal text-gray-700 dark:text-gray-400'>
              ₱{product.Price}
            </p>
            <p
              className={`block font-normal ${
                product.Stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.Stock > 0
                ? `In Stock: ${product.Stock}`
                : "Out of Stock"}
            </p>
            <p class='font-normal text-gray-700 dark:text-gray-400'>
              {product.Description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
