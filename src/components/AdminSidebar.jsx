import React from 'react'
import SewiftLogo from '/src/assets/images/SewiftLogo.png'

export default function AdminSidebar() {
    return (
        <div>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            
            <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-5 py-10 overflow-y-auto bg-[#3f6e85] dark:bg-gray-800">
                  <a href="/AdminHomepage" className="flex items-center ps-2.5 mb-5">
                  <img src={SewiftLogo} className="h-6 me-3 sm:h-7" alt="Sewift Logo" />
                  <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Sewift</span>
                  </a>

                  <div className='pt-5 pb-5 px-2 flex items-center'>
                  <svg className='w-5 h-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="9" r="3" stroke="#f7f7f7" stroke-width="1.5"/>
                  <circle cx="12" cy="12" r="10" stroke="#f7f7f7" stroke-width="1.5"/>
                  <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#f7f7f7" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  <h1 className='pl-3 text-[#f7f7f7]'>Name sa Admin</h1>
                  </div>
                  
                  <ul className="space-y-2 font-medium">
                     <li>
                        <a href="/AdminHomepage" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                           <svg className="w-5 h-5 text-[#f7f7f7] transition duration-75 dark:text-gray-400 group-hover:text-[#2b3a47] dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                           <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                           <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                           </svg>
                           <span className="ms-3 text-[#f7f7f7] group-hover:text-[#2b3a47]">Dashboard</span>
                        </a>
                     </li>
                     <li>
                        <a href="/AdminShopProfile" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className='w-5 h-5 text-[#f7f7f7] transition duration-75 dark:text-gray-400 group-hover:text-[#2b3a47] dark:group-hover:text-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5276 2H7.47201C6.26919 2 5.66778 2 5.18448 2.2987C4.70117 2.5974 4.43221 3.13531 3.8943 4.21114L2.49068 7.75929C2.16639 8.57905 1.88266 9.54525 2.42854 10.2375C2.79476 10.7019 3.36244 11 3.99978 11C5.10435 11 5.99978 10.1046 5.99978 9C5.99978 10.1046 6.89522 11 7.99978 11C9.10435 11 9.99978 10.1046 9.99978 9C9.99978 10.1046 10.8952 11 11.9998 11C13.1044 11 13.9998 10.1046 13.9998 9C13.9998 10.1046 14.8952 11 15.9998 11C17.1044 11 17.9998 10.1046 17.9998 9C17.9998 10.1046 18.8952 11 19.9998 11C20.6371 11 21.2048 10.7019 21.5711 10.2375C22.117 9.54525 21.8333 8.57905 21.509 7.75929L20.1054 4.21114C19.5674 3.13531 19.2985 2.5974 18.8152 2.2987C18.3319 2 17.7305 2 16.5276 2Z" fill="currentColor"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20 21.25H22C22.4142 21.25 22.75 21.5858 22.75 22C22.75 22.4142 22.4142 22.75 22 22.75H2C1.58579 22.75 1.25 22.4142 1.25 22C1.25 21.5858 1.58579 21.25 2 21.25H4L4 12.5C4.74363 12.5 5.43309 12.2681 6 11.8727C6.56692 12.2681 7.25638 12.5 8 12.5C8.74363 12.5 9.43309 12.2681 10 11.8727C10.5669 12.2681 11.2564 12.5 12 12.5C12.7436 12.5 13.4331 12.2681 14 11.8727C14.5669 12.2681 15.2564 12.5 16 12.5C16.7436 12.5 17.4331 12.2681 18 11.8727C18.5669 12.2681 19.2564 12.5 20 12.5L20 21.25ZM9.5 21.25H14.5V18.5C14.5 17.5654 14.5 17.0981 14.299 16.75C14.1674 16.522 13.978 16.3326 13.75 16.2009C13.4019 16 12.9346 16 12 16C11.0654 16 10.5981 16 10.25 16.2009C10.022 16.3326 9.83261 16.522 9.70096 16.75C9.5 17.0981 9.5 17.5654 9.5 18.5V21.25Z" fill="currentColor"/>
                        </svg>
                           <span className="ms-3 text-[#f7f7f7] group-hover:text-[#2b3a47]">Shop Profile</span>
                        </a>
                     </li>
                     <li>
                        <a href="/AdminJobOrder" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 text-[#f7f7f7] transition duration-75 dark:text-gray-400 group-hover:text-[#2b3a47] dark:group-hover:text-white' viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve">
                        <path d="M39.3,26.9c0,1-0.9,1.9-1.9,1.9H14.6c-1,0-1.9-0.9-1.9-1.9V25c0-1,0.9-1.9,1.9-1.9h22.9c1,0,1.9,0.9,1.9,1.9
                        v1.9H39.3z M35.5,38.3c0,1-0.9,1.9-1.9,1.9h-19c-1,0-1.9-0.9-1.9-1.9v-1.9c0-1,0.9-1.9,1.9-1.9h19.1c1,0,1.9,0.9,1.9,1.9v1.9H35.5z
                        M12.7,13.5c0-1,0.9-1.9,1.9-1.9h19.1c1,0,1.9,0.9,1.9,1.9v1.9c0,1-0.9,1.9-1.9,1.9H14.6c-1,0-1.9-0.9-1.9-1.9
                        C12.7,15.4,12.7,13.5,12.7,13.5z M41.2,4H10.8C7.6,4,5,6.6,5,9.7v32.4c0,3.1,2.6,5.7,5.7,5.7h30.5c3.1,0,5.7-2.6,5.7-5.7V9.7
                        C47,6.6,44.4,4,41.2,4z"/>
                        </svg>
                           <span className="ms-3 text-[#f7f7f7] group-hover:text-[#2b3a47]">Job Order</span>
                        </a>
                     </li>
                     <li>
                        <a href="/EmployeesList" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg fill="currentColor" className='w-5 h-5 text-[#f7f7f7] transition duration-75 dark:text-gray-400 group-hover:text-[#2b3a47] dark:group-hover:text-white' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 512.001 512.001" xml:space="preserve">
                           <g>
                              <g>
                                 <path d="M375.071,86.028c-11.366,0-22.143,2.561-31.796,7.122c3.686,4.748,6.998,9.802,9.882,15.121
                                 c2.828,5.216,5.244,10.688,7.214,16.364c3.928,11.321,6.069,23.469,6.069,36.109c0,12.639-2.141,24.788-6.069,36.108
                                 c-1.969,5.678-4.386,11.147-7.214,16.364c-2.884,5.319-6.195,10.372-9.882,15.121c9.653,4.56,20.43,7.123,31.796,7.123
                                 c41.199,0.002,74.716-33.516,74.716-74.714C449.787,119.545,416.27,86.028,375.071,86.028z"/>
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M375.071,271.182c-4.42,0-8.827,0.218-13.206,0.641c6.82,5.311,13.237,11.115,19.187,17.369
                                 c6.005,6.311,11.53,13.079,16.534,20.237c16.349,23.386,27.066,50.987,30.146,80.823c0.607,5.873,0.92,11.83,0.92,17.86
                                 c0,6.261-1.09,12.27-3.072,17.86h68.56c9.864,0,17.86-7.998,17.86-17.86C512.001,332.608,450.574,271.182,375.071,271.182z"/>
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M151.632,196.855c-3.928-11.32-6.069-23.469-6.069-36.108c0-12.64,2.141-24.788,6.069-36.109
                                 c1.971-5.68,4.386-11.15,7.214-16.366c2.884-5.319,6.195-10.372,9.882-15.121c-9.653-4.56-20.43-7.122-31.796-7.122
                                 c-41.199,0-74.716,33.517-74.716,74.716c0,41.198,33.517,74.716,74.716,74.716c11.366,0,22.143-2.562,31.796-7.123
                                 c-3.686-4.749-6.998-9.802-9.882-15.121C156.018,208.002,153.602,202.532,151.632,196.855z"/>
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M136.93,271.182C61.427,271.182,0,332.608,0,408.112c0,9.863,7.997,17.86,17.86,17.86h68.56
                                 c-1.981-5.59-3.071-11.6-3.071-17.86c0-6.031,0.313-11.988,0.919-17.86c3.08-29.836,13.797-57.437,30.146-80.823
                                 c5.005-7.158,10.529-13.926,16.534-20.237c5.95-6.254,12.367-12.058,19.187-17.369C145.757,271.4,141.35,271.182,136.93,271.182z"/>
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M325.393,133.094c-2.509-6.271-5.831-12.13-9.857-17.433c-13.657-17.988-35.257-29.633-59.535-29.633
                                 s-45.878,11.645-59.535,29.635c-4.026,5.303-7.348,11.162-9.857,17.433c-3.421,8.559-5.325,17.883-5.325,27.649
                                 c0,9.765,1.904,19.089,5.325,27.648c2.509,6.271,5.831,12.13,9.857,17.433c13.657,17.988,35.257,29.634,59.535,29.634
                                 s45.878-11.646,59.535-29.636c4.026-5.303,7.348-11.162,9.857-17.433c3.421-8.559,5.325-17.882,5.325-27.648
                                 S328.814,141.653,325.393,133.094z"/>
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M391.768,390.252c-4.11-31.402-18.901-59.488-40.594-80.489c-5.137-4.971-10.656-9.547-16.515-13.672
                                 c-6.044-4.256-12.444-8.04-19.149-11.288c-12.892-6.246-26.905-10.528-41.647-12.457v111.953c0,9.863-7.997,17.86-17.86,17.86
                                 c-9.864,0-17.86-7.998-17.86-17.86V272.346c-14.743,1.929-28.755,6.211-41.648,12.457c-6.705,3.249-13.105,7.032-19.149,11.288
                                 c-5.859,4.126-11.38,8.702-16.515,13.672c-21.695,21-36.485,49.087-40.594,80.489c-0.764,5.846-1.163,11.807-1.163,17.86
                                 c0,9.863,7.997,17.86,17.86,17.86h238.14c9.864,0,17.86-7.998,17.86-17.86C392.933,402.059,392.534,396.098,391.768,390.252z"/>
                              </g>
                           </g>
                           </svg>
                           <span className="ms-3 text-[#f7f7f7] group-hover:text-[#2b3a47]">Employees</span>
                        </a>
                     </li>
                  </ul>
               </div>
            </aside>
         </div>
    )
}