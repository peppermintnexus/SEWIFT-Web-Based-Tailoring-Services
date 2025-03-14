import React, { useState } from "react";
import LogoBlack from "/src/assets/images/LogoBlack.png";

export default function AdminSidebar({ Tailor_Shop_Name, Complete_Address }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        aria-controls='sidebar-multi-level-sidebar'
        type='button'
        className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
      >
        <span class='sr-only'>Open sidebar</span>
        <svg
          className='w-6 h-6'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            clip-rule='evenodd'
            fill-rule='evenodd'
            d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
          ></path>
        </svg>
      </button>

      <aside
        id='sidebar-multi-level-sidebar'
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto bg-white-50 dark:bg-white-800'>
          <a href='/AdminJobOrder'>
            <img src={LogoBlack} className='mt-3 h-14 place-self-center' />
          </a>
          <div className='border mt-5 space-y-2 px-5 py-2 text-gray-900 rounded-lg dark:text-white'>
            <h1 className='truncate text-lg font-medium'>
              {Tailor_Shop_Name}
              <span className='truncate text-[#777777] font-normal block text-sm'>
                {Complete_Address || "Complete Address"}
              </span>
            </h1>
          </div>
          <ul class='mt-4 space-y-2 font-medium'>
            <li>
              <a
                href='/AdminJobOrder'
                className='flex items-center px-5 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <svg
                  className='shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 52 52'
                  enable-background='new 0 0 52 52'
                  xml:space='preserve'
                >
                  <path
                    d='M39.3,26.9c0,1-0.9,1.9-1.9,1.9H14.6c-1,0-1.9-0.9-1.9-1.9V25c0-1,0.9-1.9,1.9-1.9h22.9c1,0,1.9,0.9,1.9,1.9
                             v1.9H39.3z M35.5,38.3c0,1-0.9,1.9-1.9,1.9h-19c-1,0-1.9-0.9-1.9-1.9v-1.9c0-1,0.9-1.9,1.9-1.9h19.1c1,0,1.9,0.9,1.9,1.9v1.9H35.5z
                             M12.7,13.5c0-1,0.9-1.9,1.9-1.9h19.1c1,0,1.9,0.9,1.9,1.9v1.9c0,1-0.9,1.9-1.9,1.9H14.6c-1,0-1.9-0.9-1.9-1.9
                             C12.7,15.4,12.7,13.5,12.7,13.5z M41.2,4H10.8C7.6,4,5,6.6,5,9.7v32.4c0,3.1,2.6,5.7,5.7,5.7h30.5c3.1,0,5.7-2.6,5.7-5.7V9.7
                             C47,6.6,44.4,4,41.2,4z'
                  />
                </svg>
                <span className='ms-3'>Orders</span>
              </a>
            </li>
            <li>
              <button
                id='dropdownButton'
                type='button'
                onClick={toggleDropdown}
                className='flex items-center w-full px-5 py-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
              >
                <svg
                  className='shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M16.5276 2H7.47201C6.26919 2 5.66778 2 5.18448 2.2987C4.70117 2.5974 4.43221 3.13531 3.8943 4.21114L2.49068 7.75929C2.16639 8.57905 1.88266 9.54525 2.42854 10.2375C2.79476 10.7019 3.36244 11 3.99978 11C5.10435 11 5.99978 10.1046 5.99978 9C5.99978 10.1046 6.89522 11 7.99978 11C9.10435 11 9.99978 10.1046 9.99978 9C9.99978 10.1046 10.8952 11 11.9998 11C13.1044 11 13.9998 10.1046 13.9998 9C13.9998 10.1046 14.8952 11 15.9998 11C17.1044 11 17.9998 10.1046 17.9998 9C17.9998 10.1046 18.8952 11 19.9998 11C20.6371 11 21.2048 10.7019 21.5711 10.2375C22.117 9.54525 21.8333 8.57905 21.509 7.75929L20.1054 4.21114C19.5674 3.13531 19.2985 2.5974 18.8152 2.2987C18.3319 2 17.7305 2 16.5276 2Z'
                    fill='currentColor'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M20 21.25H22C22.4142 21.25 22.75 21.5858 22.75 22C22.75 22.4142 22.4142 22.75 22 22.75H2C1.58579 22.75 1.25 22.4142 1.25 22C1.25 21.5858 1.58579 21.25 2 21.25H4L4 12.5C4.74363 12.5 5.43309 12.2681 6 11.8727C6.56692 12.2681 7.25638 12.5 8 12.5C8.74363 12.5 9.43309 12.2681 10 11.8727C10.5669 12.2681 11.2564 12.5 12 12.5C12.7436 12.5 13.4331 12.2681 14 11.8727C14.5669 12.2681 15.2564 12.5 16 12.5C16.7436 12.5 17.4331 12.2681 18 11.8727C18.5669 12.2681 19.2564 12.5 20 12.5L20 21.25ZM9.5 21.25H14.5V18.5C14.5 17.5654 14.5 17.0981 14.299 16.75C14.1674 16.522 13.978 16.3326 13.75 16.2009C13.4019 16 12.9346 16 12 16C11.0654 16 10.5981 16 10.25 16.2009C10.022 16.3326 9.83261 16.522 9.70096 16.75C9.5 17.0981 9.5 17.5654 9.5 18.5V21.25Z'
                    fill='currentColor'
                  />
                </svg>
                <span className='flex-1 ms-3 text-left rtl:text-right whitespace-nowrap'>
                  Tailor Shop
                </span>
                <svg
                  class='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='m1 1 4 4 4-4'
                  />
                </svg>
              </button>
              {isDropdownVisible && (
                <ul id='dropdown-addProduct' class='p-2 space-y-2'>
                  <li>
                    <a
                      href='/AdminShopProfile'
                      className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                    >
                      Shop Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href='/AddProduct'
                      className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                    >
                      Add Product
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <a
                href='/AdminTransactionHistory'
                class='flex items-center px-5 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <svg
                  className='shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white group-focus:text-white'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M2 0H14V16H12L10 14L8 16L6 14L4 16H2V0ZM5 4H11V6H5V4ZM11 8H5V10H11V8Z'
                    fill='currentColor'
                  />
                </svg>
                <span class='flex-1 ms-3 whitespace-nowrap'>
                  Transaction History
                </span>
              </a>
            </li>
            <li>
              <a
                href='/EmployeesList'
                class='flex items-center px-5 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <svg
                  className='shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white group-focus:text-white'
                  version='1.1'
                  id='Layer_1'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlns:xlink='http://www.w3.org/1999/xlink'
                  viewBox='0 0 512.001 512.001'
                  xml:space='preserve'
                  fill='currentColor'
                >
                  <g>
                    <g>
                      <path
                        d='M375.071,86.028c-11.366,0-22.143,2.561-31.796,7.122c3.686,4.748,6.998,9.802,9.882,15.121
                    c2.828,5.216,5.244,10.688,7.214,16.364c3.928,11.321,6.069,23.469,6.069,36.109c0,12.639-2.141,24.788-6.069,36.108
                    c-1.969,5.678-4.386,11.147-7.214,16.364c-2.884,5.319-6.195,10.372-9.882,15.121c9.653,4.56,20.43,7.123,31.796,7.123
                    c41.199,0.002,74.716-33.516,74.716-74.714C449.787,119.545,416.27,86.028,375.071,86.028z'
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d='M375.071,271.182c-4.42,0-8.827,0.218-13.206,0.641c6.82,5.311,13.237,11.115,19.187,17.369
                    c6.005,6.311,11.53,13.079,16.534,20.237c16.349,23.386,27.066,50.987,30.146,80.823c0.607,5.873,0.92,11.83,0.92,17.86
                    c0,6.261-1.09,12.27-3.072,17.86h68.56c9.864,0,17.86-7.998,17.86-17.86C512.001,332.608,450.574,271.182,375.071,271.182z'
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d='M151.632,196.855c-3.928-11.32-6.069-23.469-6.069-36.108c0-12.64,2.141-24.788,6.069-36.109
                    c1.971-5.68,4.386-11.15,7.214-16.366c2.884-5.319,6.195-10.372,9.882-15.121c-9.653-4.56-20.43-7.122-31.796-7.122
                    c-41.199,0-74.716,33.517-74.716,74.716c0,41.198,33.517,74.716,74.716,74.716c11.366,0,22.143-2.562,31.796-7.123
                    c-3.686-4.749-6.998-9.802-9.882-15.121C156.018,208.002,153.602,202.532,151.632,196.855z'
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d='M136.93,271.182C61.427,271.182,0,332.608,0,408.112c0,9.863,7.997,17.86,17.86,17.86h68.56
                    c-1.981-5.59-3.071-11.6-3.071-17.86c0-6.031,0.313-11.988,0.919-17.86c3.08-29.836,13.797-57.437,30.146-80.823
                    c5.005-7.158,10.529-13.926,16.534-20.237c5.95-6.254,12.367-12.058,19.187-17.369C145.757,271.4,141.35,271.182,136.93,271.182z'
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d='M325.393,133.094c-2.509-6.271-5.831-12.13-9.857-17.433c-13.657-17.988-35.257-29.633-59.535-29.633
                    s-45.878,11.645-59.535,29.635c-4.026,5.303-7.348,11.162-9.857,17.433c-3.421,8.559-5.325,17.883-5.325,27.649
                    c0,9.765,1.904,19.089,5.325,27.648c2.509,6.271,5.831,12.13,9.857,17.433c13.657,17.988,35.257,29.634,59.535,29.634
                    s45.878-11.646,59.535-29.636c4.026-5.303,7.348-11.162,9.857-17.433c3.421-8.559,5.325-17.882,5.325-27.648
                    S328.814,141.653,325.393,133.094z'
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d='M391.768,390.252c-4.11-31.402-18.901-59.488-40.594-80.489c-5.137-4.971-10.656-9.547-16.515-13.672
                    c-6.044-4.256-12.444-8.04-19.149-11.288c-12.892-6.246-26.905-10.528-41.647-12.457v111.953c0,9.863-7.997,17.86-17.86,17.86
                    c-9.864,0-17.86-7.998-17.86-17.86V272.346c-14.743,1.929-28.755,6.211-41.648,12.457c-6.705,3.249-13.105,7.032-19.149,11.288
                    c-5.859,4.126-11.38,8.702-16.515,13.672c-21.695,21-36.485,49.087-40.594,80.489c-0.764,5.846-1.163,11.807-1.163,17.86
                    c0,9.863,7.997,17.86,17.86,17.86h238.14c9.864,0,17.86-7.998,17.86-17.86C392.933,402.059,392.534,396.098,391.768,390.252z'
                      />
                    </g>
                  </g>
                </svg>
                <span class='flex-1 ms-3 whitespace-nowrap'>My Employees</span>
              </a>
            </li>
            <li>
              <a
                href='/AdminSettings'
                class='flex items-center px-5 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <svg
                  className='shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white group-focus:text-white'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12.7848 0.449982C13.8239 0.449982 14.7167 1.16546 14.9122 2.15495L14.9991 2.59495C15.3408 4.32442 17.1859 5.35722 18.9016 4.7794L19.3383 4.63233C20.3199 4.30175 21.4054 4.69358 21.9249 5.56605L22.7097 6.88386C23.2293 7.75636 23.0365 8.86366 22.2504 9.52253L21.9008 9.81555C20.5267 10.9672 20.5267 13.0328 21.9008 14.1844L22.2504 14.4774C23.0365 15.1363 23.2293 16.2436 22.7097 17.1161L21.925 18.4339C21.4054 19.3064 20.3199 19.6982 19.3382 19.3676L18.9017 19.2205C17.1859 18.6426 15.3408 19.6754 14.9991 21.405L14.9122 21.845C14.7167 22.8345 13.8239 23.55 12.7848 23.55H11.2152C10.1761 23.55 9.28331 22.8345 9.08781 21.8451L9.00082 21.4048C8.65909 19.6754 6.81395 18.6426 5.09822 19.2205L4.66179 19.3675C3.68016 19.6982 2.59465 19.3063 2.07505 18.4338L1.2903 17.1161C0.770719 16.2436 0.963446 15.1363 1.74956 14.4774L2.09922 14.1844C3.47324 13.0327 3.47324 10.9672 2.09922 9.8156L1.74956 9.52254C0.963446 8.86366 0.77072 7.75638 1.2903 6.8839L2.07508 5.56608C2.59466 4.69359 3.68014 4.30176 4.66176 4.63236L5.09831 4.77939C6.81401 5.35722 8.65909 4.32449 9.00082 2.59506L9.0878 2.15487C9.28331 1.16542 10.176 0.449982 11.2152 0.449982H12.7848ZM12 15.3C13.8225 15.3 15.3 13.8225 15.3 12C15.3 10.1774 13.8225 8.69998 12 8.69998C10.1774 8.69998 8.69997 10.1774 8.69997 12C8.69997 13.8225 10.1774 15.3 12 15.3Z'
                    fill='currentColor'
                  />
                </svg>
                <span class='flex-1 ms-3 whitespace-nowrap'>Settings</span>
              </a>
            </li>
            <li>
              <a
                href='/'
                class='flex items-center px-5 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <svg
                  className='shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white group-focus:text-white'
                  viewBox='0 -0.5 25 25'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11.75 9.874C11.75 10.2882 12.0858 10.624 12.5 10.624C12.9142 10.624 13.25 10.2882 13.25 9.874H11.75ZM13.25 4C13.25 3.58579 12.9142 3.25 12.5 3.25C12.0858 3.25 11.75 3.58579 11.75 4H13.25ZM9.81082 6.66156C10.1878 6.48991 10.3542 6.04515 10.1826 5.66818C10.0109 5.29121 9.56615 5.12478 9.18918 5.29644L9.81082 6.66156ZM5.5 12.16L4.7499 12.1561L4.75005 12.1687L5.5 12.16ZM12.5 19L12.5086 18.25C12.5029 18.25 12.4971 18.25 12.4914 18.25L12.5 19ZM19.5 12.16L20.2501 12.1687L20.25 12.1561L19.5 12.16ZM15.8108 5.29644C15.4338 5.12478 14.9891 5.29121 14.8174 5.66818C14.6458 6.04515 14.8122 6.48991 15.1892 6.66156L15.8108 5.29644ZM13.25 9.874V4H11.75V9.874H13.25ZM9.18918 5.29644C6.49843 6.52171 4.7655 9.19951 4.75001 12.1561L6.24999 12.1639C6.26242 9.79237 7.65246 7.6444 9.81082 6.66156L9.18918 5.29644ZM4.75005 12.1687C4.79935 16.4046 8.27278 19.7986 12.5086 19.75L12.4914 18.25C9.08384 18.2892 6.28961 15.5588 6.24995 12.1513L4.75005 12.1687ZM12.4914 19.75C16.7272 19.7986 20.2007 16.4046 20.2499 12.1687L18.7501 12.1513C18.7104 15.5588 15.9162 18.2892 12.5086 18.25L12.4914 19.75ZM20.25 12.1561C20.2345 9.19951 18.5016 6.52171 15.8108 5.29644L15.1892 6.66156C17.3475 7.6444 18.7376 9.79237 18.75 12.1639L20.25 12.1561Z'
                    fill='currentColor'
                  />
                </svg>
                <span class='flex-1 ms-3 whitespace-nowrap'>Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
