import React from 'react';

export default function AdminHomepage() {
  return (
      <div>
        <ol class="relative border-s border-gray-200 dark:border-gray-700">                  
          <li class="mb-10 ms-6">            
            <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <img class="rounded-full shadow-lg" src="#"/>
            </span>
            <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
              <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">17/10/2024</time>
            <div class="text-sm font-normal text-gray-500 dark:text-gray-300">Monica Zerrudo accepted <a class="font-semibold text-black dark:text-blue-500 hover:underline">JO 12345</a></div>
            </div>
          </li>
        </ol>
      </div>
  )
}