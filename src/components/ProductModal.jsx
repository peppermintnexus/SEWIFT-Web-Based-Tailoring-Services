import React from "react";
import SchoolSkirt from "/src/assets/images/SchoolSkirt.jpg";
import { useNavigate } from "react-router";

export default function ProductModal({ product, index }) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/EditProduct/${index}`);
  };

  return (
    <a
      href='/EditProduct'
      class='flex flex-col items-center bg-white rounded-lg shadow-sm md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800'
    >
      <div className='border bg-[#fefefe] shadow'>
        <div className='text-left grid grid-cols-2'>
          <div>
            <img
              src={SchoolSkirt}
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
            <p class='font-normal text-gray-700 dark:text-gray-400'>
              {product.Description}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
