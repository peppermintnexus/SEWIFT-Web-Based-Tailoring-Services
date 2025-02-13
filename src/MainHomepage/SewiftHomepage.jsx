import React from "react";
import Header from "/src/components/Header.jsx";
import SewiftPicture from "/src/assets/images/SewiftPicture.png";
import ViewSample from "/src/assets/images/ViewSample.png";

export default function SewiftHomepage() {
  return (
    <div className='min-h-screen'>
      <Header />

      <div
        className='min-h-screen bg-cover bg-center flex justify-center items-center pt-0 px-4 sm:px-16'
        style={{ backgroundImage: `url(${SewiftPicture})` }}
      >
        <div className='text-center'>
          <h1 className='text-5xl sm:text-8xl font-semibold text-[#fefefe] mb-3'>
            Sewift Solutions
          </h1>
          <p className='text-lg sm:text-xl text-[#fefefe] mb-7'>
            SEWIFT is an online application that will provide swift
            <br />
            solutions for your tailoring needs.
          </p>
          <a href='/SignUp'>
            <button className='font-semibold px-4 sm:px-6 py-2 sm:py-4 text-[#fefefe] text-lg sm:text-xl bg-[#171B1F] hover:bg-[#40bec1] hover:text-[#fefefe] hover:shadow-xl'>
              Try it now!
            </button>
          </a>
        </div>
      </div>

      <div className='p-4 sm:p-10 bg-[#FEFEFE]'>
        <h1 className='text-center text-3xl mb-5 font-bold'>
          Order Apparels from Tailor Shops
        </h1>
        <img src={ViewSample} className=' shadow' />
      </div>

      <div className='p-4 sm:p-14 bg-[#171B1F]'>
        <h1 className='text-center text-[#fefefe] text-3xl sm:text-5xl font-bold'>
          Features
        </h1>
        <p className='text-center pt-2 text-[#fefefe]'>
          Explore what you can do with SEWIFT we like to provide our users with
          the best features
        </p>
        <h1 className='text-[#fefefe] text-3xl sm:text-4xl pt-10 px-5'>
          Client
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 justify-items-center my-5 px-5 pt-12 gap-10 text-[#fefefe]'>
          <div className='grid justify-items-center'>
            <svg
              className='mb-2 w-9 h-9'
              viewBox='0 0 24 24'
              fill='#fefefe'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g id='Interface / Shopping_Cart_02'>
                <path
                  id='Vector'
                  d='M3 3H3.26835C3.74213 3 3.97943 3 4.17267 3.08548C4.34304 3.16084 4.48871 3.28218 4.59375 3.43604C4.71269 3.61026 4.75564 3.8429 4.84137 4.30727L7.00004 16L17.4218 16C17.875 16 18.1023 16 18.29 15.9199C18.4559 15.8492 18.5989 15.7346 18.7051 15.5889C18.8252 15.4242 18.8761 15.2037 18.9777 14.7631L18.9785 14.76L20.5477 7.95996L20.5481 7.95854C20.7023 7.29016 20.7796 6.95515 20.6947 6.69238C20.6202 6.46182 20.4635 6.26634 20.2556 6.14192C20.0184 6 19.6758 6 18.9887 6H5.5M18 21C17.4477 21 17 20.5523 17 20C17 19.4477 17.4477 19 18 19C18.5523 19 19 19.4477 19 20C19 20.5523 18.5523 21 18 21ZM8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20C9 20.5523 8.55228 21 8 21Z'
                  stroke='#fefefe'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </g>
            </svg>
            <h1 className='pt-3 text-lg'>Instant Purchase</h1>
          </div>
          <div className='grid justify-items-center'>
            <svg
              className='mb-2 w-9 h-9'
              fill='#fefefe'
              version='1.1'
              id='Layer_1'
              xmlns='http://www.w3.org/2000/svg'
              xmlns:xlink='http://www.w3.org/1999/xlink'
              viewBox='0 0 472.615 472.615'
              xml:space='preserve'
            >
              <g>
                <g>
                  <path
                    d='M357.916,38.637h-60.825c0.005,33.572-27.212,60.788-60.784,60.788c-33.573,0-60.789-27.216-60.748-60.788h-60.861
                    L0,153.336l63.137,63.137l51.551-51.545v269.049h243.24V164.929l51.549,51.545l63.138-63.137L357.916,38.637z'
                  />
                </g>
              </g>
            </svg>
            <h1 className='pt-3 text-lg'>Customized Order</h1>
          </div>
          <div className='grid justify-items-center'>
            <svg
              className='mb-2 w-9 h-9'
              fill='#fefefe'
              viewBox='0 0 36 36'
              version='1.1'
              preserveAspectRatio='xMidYMid meet'
              xmlns='http://www.w3.org/2000/svg'
              xmlns:xlink='http://www.w3.org/1999/xlink'
            >
              <path
                class='clr-i-solid clr-i-solid-path-1'
                d='M33.81,8.13,31.63,6.48a1.92,1.92,0,0,0-2.36,0L10,22.06a5.46,5.46,0,1,0,2,1.81l3.9-3.12L29.27,31.52a1.92,1.92,0,0,0,2.36,0l2.18-1.64L20.94,19ZM7.45,29.75a2.86,2.86,0,1,1,2.86-2.86A2.87,2.87,0,0,1,7.45,29.75Z'
              ></path>
              <path
                class='clr-i-solid clr-i-solid-path-2'
                d='M14.3,15.24,12,13.38a5.46,5.46,0,1,0-2,1.81L12.16,17Zm-6.85-2a2.86,2.86,0,1,1,2.86-2.86A2.86,2.86,0,0,1,7.45,13.23Z'
              ></path>
              <rect x='0' y='0' width='36' height='36' fill-opacity='0' />
            </svg>
            <h1 className='pt-3 text-lg'>Alteration</h1>
          </div>
          <div className='grid justify-items-center'>
            <svg
              className='mb-2 w-9 h-9'
              viewBox='0 0 20 20'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              xmlns:xlink='http://www.w3.org/1999/xlink'
            >
              <g
                id='Page-1'
                stroke='#fefefe'
                stroke-width='0'
                fill-rule='evenodd'
              >
                <g
                  id='Dribbble-Light-Preview'
                  transform='translate(-380.000000, -2199.000000)'
                  fill='#fefefe'
                >
                  <g id='icons' transform='translate(56.000000, 160.000000)'>
                    <path
                      d='M342,2055.615 C342,2055.722 341.97,2055.821 341.939,2055.918 C341.723,2052.974 339.918,2050.482 337.375,2049.283 C338.368,2048.369 339,2047.071 339,2045.615 C339,2043.534 337.728,2041.753 335.92,2041 L341,2041 C341.552,2041 342,2041.063 342,2041.615 L342,2055.615 Z M339.963,2057 L327.975,2057 C327.974,2057 327.969,2056.741 327.969,2056.701 C327.969,2053.605 330.326,2050.96 333.339,2050.645 C334,2050.733 334.255,2050.622 334.623,2050.576 C337.625,2050.902 339.969,2053.623 339.969,2056.71 C339.969,2056.75 339.964,2057 339.963,2057 L339.963,2057 Z M326,2055.615 L326,2041.615 C326,2041.063 326.448,2041 327,2041 L332.08,2041 C330.272,2041.753 329,2043.534 329,2045.615 C329,2047.06 329.622,2048.351 330.602,2049.264 C328.107,2050.422 326.307,2052.82 326.012,2055.675 C326.011,2055.654 326,2055.636 326,2055.615 L326,2055.615 Z M337,2045.615 C337,2047.055 335.979,2048.26 334.623,2048.548 C334.033,2048.5 333.868,2048.508 333.368,2048.545 C332.017,2048.254 331,2047.052 331,2045.615 C331,2043.961 332.346,2042.615 334,2042.615 C335.654,2042.615 337,2043.961 337,2045.615 L337,2045.615 Z M342,2039 L326,2039 C324.895,2039 324,2039.895 324,2041 L324,2057 C324,2058.104 324.895,2059 326,2059 L342,2059 C343.105,2059 344,2058.104 344,2057 L344,2041 C344,2039.895 343.105,2039 342,2039 L342,2039 Z'
                      id='profile_image_round-[#1326]'
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            <h1 className='pt-3 text-lg'>Profiling</h1>
          </div>
          <div className='grid justify-items-center'>
            <svg
              className='mb-2 w-9 h-9'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill='#fefefe'
                fill-rule='evenodd'
                d='M0,8 C0,6.34315 1.34315,5 3,5 L13,5 C14.6569,5 16,6.34315 16,8 C16,9.65685 14.6569,11 13,11 L3,11 C1.34315,11 0,9.65685 0,8 Z M10,7 L13,7 C13.5523,7 14,7.44772 14,8 C14,8.55228 13.5523,9 13,9 L8,9 L10,7 Z'
              />
            </svg>
            <h1 className='pt-3 text-lg'>Track Order Progress</h1>
          </div>
        </div>

        <h1 className='text-[#fefefe] text-3xl sm:text-4xl pt-10 px-5'>
          Tailor Shop
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 justify-items-center my-5 px-5 pt-12 gap-10 text-[#fefefe]'>
          <div className='grid justify-items-center'>
            <svg
              className='mb-2 w-9 h-9'
              viewBox='0 0 24 24'
              id='_24x24_On_Light_Queue-In'
              data-name='24x24/On Light/Queue-In'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect id='view-box' width='24' height='24' fill='none' />
              <path
                id='Shape'
                d='M3.75,19.5A3.75,3.75,0,0,1,0,15.75V6.607A2.607,2.607,0,0,1,2.607,4H4V2.75A2.754,2.754,0,0,1,6.75,0h10A2.753,2.753,0,0,1,19.5,2.75v10a2.752,2.752,0,0,1-2.75,2.75H15.5v1.393A2.607,2.607,0,0,1,12.892,19.5ZM1.5,6.607V15.75A2.25,2.25,0,0,0,3.75,18h9.142A1.108,1.108,0,0,0,14,16.893V15.5H6.75A2.753,2.753,0,0,1,4,12.75V5.5H2.607A1.107,1.107,0,0,0,1.5,6.607Zm4-3.857v10A1.252,1.252,0,0,0,6.75,14h10A1.251,1.251,0,0,0,18,12.75v-10A1.251,1.251,0,0,0,16.75,1.5h-10A1.252,1.252,0,0,0,5.5,2.75ZM9.25,10.5a.75.75,0,1,1,0-1.5h5a.75.75,0,1,1,0,1.5Z'
                transform='translate(2.25 2.25)'
                fill='#fefefe'
              />
              <path
                id='Shape-2'
                data-name='Shape'
                d='M.75,1.5h5a.75.75,0,0,0,0-1.5h-5a.75.75,0,0,0,0,1.5Z'
                transform='translate(17.25 8.75) rotate(-180)'
                fill='#fefefe'
              />
            </svg>
            <h1 className='pt-3 text-lg'>Job Order Queue</h1>
          </div>
          <div className='grid justify-items-center'>
            <svg
              className='mb-2 w-9 h-9'
              fill='#fefefe'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
              xmlns:xlink='http://www.w3.org/1999/xlink'
              enable-background='new 0 0 512 512'
            >
              <g>
                <g>
                  <g>
                    <path d='M480.6,11H31.4C20.1,11,11,20.1,11,31.4v449.2c0,11.3,9.1,20.4,20.4,20.4h449.2c11.3,0,20.4-9.1,20.4-20.4V31.4     C501,20.1,491.9,11,480.6,11z M460.2,51.8v133.8c-67.3,8.2-119.4,31.2-159.7,60.9C181.2,235.6,96.9,302,51.8,350.8V51.8H460.2z      M51.8,416.1c15-22.2,87-119,203.8-129.1c-58,63.7-79.4,139.1-86.5,173.1H51.8V416.1z M210.5,460.2     c12.7-58.1,63.5-208.3,249.7-233.4v233.4H210.5z' />
                    <path d='m153.8,213.4c35.2,0 63.9-28.7 63.9-63.9 0-35.2-28.6-63.9-63.9-63.9-35.2,0-63.9,28.7-63.9,63.9 0.1,35.2 28.7,63.9 63.9,63.9zm0-86.9c12.7,0 23,10.3 23,23 0,12.7-10.3,23-23,23-12.7,0-23-10.3-23-23 0-12.7 10.3-23 23-23z' />
                  </g>
                </g>
              </g>
            </svg>
            <h1 className='pt-3 text-lg'>Apparel Showcase</h1>
          </div>
          <div className='grid justify-items-center'>
            <svg
              className='mb-2 w-9 h-9'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill='#fefefe'
                fill-rule='evenodd'
                d='M0,8 C0,6.34315 1.34315,5 3,5 L13,5 C14.6569,5 16,6.34315 16,8 C16,9.65685 14.6569,11 13,11 L3,11 C1.34315,11 0,9.65685 0,8 Z M10,7 L13,7 C13.5523,7 14,7.44772 14,8 C14,8.55228 13.5523,9 13,9 L8,9 L10,7 Z'
              />
            </svg>
            <h1 className='pt-3 text-lg'>Update Order Progress</h1>
          </div>
          <div className='grid justify-items-center'>
            <svg
              className='mb-2 w-9 h-9'
              viewBox='0 0 24 24'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              xmlns:xlink='http://www.w3.org/1999/xlink'
            >
              <g
                id='Page-1'
                stroke='none'
                stroke-width='1'
                fill='none'
                fill-rule='evenodd'
              >
                <g id='Shop'>
                  <rect
                    id='Rectangle'
                    fill-rule='nonzero'
                    x='0'
                    y='0'
                    width='24'
                    height='24'
                  ></rect>
                  <path
                    d='M4,12 L4,19 C4,20.1046 4.89543,21 6,21 L18,21 C19.1046,21 20,20.1046 20,19 L20,12'
                    id='Path'
                    stroke='#fefefe'
                    stroke-width='2'
                    stroke-linecap='round'
                  ></path>
                  <path
                    d='M9,8 L15,8 L15,9 C15,10.6569 13.6569,12 12,12 L12,12 C10.3431,12 9,10.6569 9,9 L9,8 Z'
                    id='Path'
                    stroke='#fefefe'
                    stroke-width='2'
                    stroke-linecap='round'
                  ></path>
                  <path
                    d='M15,8 L20.5556,8 C20.801,8 21,8.19898 21,8.44444 L21,9 C21,10.6569 19.6569,12 18,12 L18,12 C16.3431,12 15,10.6569 15,9 L15,8 Z'
                    id='Path'
                    stroke='#fefefe'
                    stroke-width='2'
                    stroke-linecap='round'
                  ></path>
                  <path
                    d='M3,8.44444 C3,8.19898 3.19898,8 3.44444,8 L9,8 L9,9 C9,10.6569 7.65685,12 6,12 L6,12 C4.34315,12 3,10.6569 3,9 L3,8.44444 Z'
                    id='Path'
                    stroke='#fefefe'
                    stroke-width='2'
                    stroke-linecap='round'
                  ></path>
                  <path
                    d='M3.82594,3.41142 C3.86881,3.17328 4.07606,3 4.31804,3 L19.682,3 C19.9239,3 20.1312,3.17328 20.1741,3.41142 L20.8941,7.41142 C20.9493,7.71809 20.7136,8 20.402,8 L3.59804,8 C3.28644,8 3.05074,7.71809 3.10594,7.41142 L3.82594,3.41142 Z'
                    id='Path'
                    stroke='#fefefe'
                    stroke-width='2'
                    stroke-linecap='round'
                  ></path>
                  <path
                    d='M9,16 C9,15.4477 9.44772,15 10,15 L14,15 C14.5523,15 15,15.4477 15,16 L15,21 L9,21 L9,16 Z'
                    id='Path'
                    stroke='#fefefe'
                    stroke-width='2'
                    stroke-linecap='round'
                  ></path>
                </g>
              </g>
            </svg>
            <h1 className='pt-3 text-lg'>Manage Shop Profile</h1>
          </div>
          <div className='grid justify-items-center'>
            <svg
              className='mb-2 w-9 h-9'
              fill='#fefefe'
              viewBox='0 0 32 32'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M23 11.031c0-0.553-0.448-1-1-1h-3c0 0 0.033-1.204 0.033-2.954 0-1.625-1.346-3.108-3.033-3.108s-2.988 1.411-2.988 3.099c0 1.625-0.012 2.964-0.012 2.964h-3c-0.553 0-1 0.447-1 1 0 0.552 0 1.938 0 1.938h14c0-0.001 0-1.387 0-1.939zM16 8.969c-0.553 0-1-0.448-1-1 0-0.553 0.447-1 1-1 0.552 0 1 0.447 1 1s-0.448 1-1 1zM28 11.031l-4-0.062 0.021 3.104h-16.021v-2.979l-4-0.062c-1.104 0-2 0.896-2 2v14c0 1.104 0.896 2 2 2h24c1.104 0 2-0.896 2-2v-14c0-1.105-0.896-2.001-2-2.001zM10 16.844c1.208 0 2.188 1.287 2.188 2.875s-0.98 2.875-2.188 2.875-2.188-1.287-2.188-2.875 0.98-2.875 2.188-2.875zM5.667 25.979c0 0 0.237-1.902 0.776-2.261s2.090-0.598 2.090-0.598 1.006 1.075 1.434 1.075c0.427 0 1.433-1.075 1.433-1.075s1.552 0.238 2.091 0.598c0.633 0.422 0.791 2.261 0.791 2.261h-8.615zM26 25.031h-9v-1h9v1zM26 23.031h-9v-1h9v1zM26 21.031h-9v-1h9v1zM26 19.031h-9v-1h9v1z'></path>
            </svg>
            <h1 className='pt-3 text-lg'>Efficient Profile Review</h1>
          </div>
        </div>
      </div>

      <div className='bg-[#f7f7f7] py-8 sm:py-16'>
        <h1 className='text-[#171B1F] text-center font-semibold text-3xl sm:text-4xl'>
          Web Application
        </h1>
        <div className='grid justify-items-center my-5 pt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-[#171B1F]'>
          <div className='text-center grid justify-items-center'>
            <svg
              className='mb-1 w-9 h-9'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16.5276 2H7.47201C6.26919 2 5.66778 2 5.18448 2.2987C4.70117 2.5974 4.43221 3.13531 3.8943 4.21114L2.49068 7.75929C2.16639 8.57905 1.88266 9.54525 2.42854 10.2375C2.79476 10.7019 3.36244 11 3.99978 11C5.10435 11 5.99978 10.1046 5.99978 9C5.99978 10.1046 6.89522 11 7.99978 11C9.10435 11 9.99978 10.1046 9.99978 9C9.99978 10.1046 10.8952 11 11.9998 11C13.1044 11 13.9998 10.1046 13.9998 9C13.9998 10.1046 14.8952 11 15.9998 11C17.1044 11 17.9998 10.1046 17.9998 9C17.9998 10.1046 18.8952 11 19.9998 11C20.6371 11 21.2048 10.7019 21.5711 10.2375C22.117 9.54525 21.8333 8.57905 21.509 7.75929L20.1054 4.21114C19.5674 3.13531 19.2985 2.5974 18.8152 2.2987C18.3319 2 17.7305 2 16.5276 2Z'
                fill='#171B1F'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M20 21.25H22C22.4142 21.25 22.75 21.5858 22.75 22C22.75 22.4142 22.4142 22.75 22 22.75H2C1.58579 22.75 1.25 22.4142 1.25 22C1.25 21.5858 1.58579 21.25 2 21.25H4L4 12.5C4.74363 12.5 5.43309 12.2681 6 11.8727C6.56692 12.2681 7.25638 12.5 8 12.5C8.74363 12.5 9.43309 12.2681 10 11.8727C10.5669 12.2681 11.2564 12.5 12 12.5C12.7436 12.5 13.4331 12.2681 14 11.8727C14.5669 12.2681 15.2564 12.5 16 12.5C16.7436 12.5 17.4331 12.2681 18 11.8727C18.5669 12.2681 19.2564 12.5 20 12.5L20 21.25ZM9.5 21.25H14.5V18.5C14.5 17.5654 14.5 17.0981 14.299 16.75C14.1674 16.522 13.978 16.3326 13.75 16.2009C13.4019 16 12.9346 16 12 16C11.0654 16 10.5981 16 10.25 16.2009C10.022 16.3326 9.83261 16.522 9.70096 16.75C9.5 17.0981 9.5 17.5654 9.5 18.5V21.25Z'
                fill='#171B1F'
              />
            </svg>
            <h1 className='font-semibold pt-3 pb-3 text-lg'>
              Multiple Tailor Shops
            </h1>
            <p>
              Sewift caters multiple tailor shops
              <br />
              within Cagayan de Oro City
            </p>
          </div>
          <div className='grid text-center justify-items-center'>
            <svg
              className='mb-1 w-9 h-9'
              viewBox='0 0 24 24'
              fill='#171B1F'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z'
                stroke='#1C274C'
                stroke-width='1.5'
              />
            </svg>
            <h1 className='font-semibold pt-3 pb-3 text-lg'>Ratings</h1>
            <p>
              Love the quality and service?
              <br />
              Give tailor shops a five-star rating
            </p>
          </div>
          <div className='grid text-center justify-items-center'>
            <svg
              className='mb-2 w-9 h-9'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill='#171B1F'
                fill-rule='evenodd'
                d='M0,8 C0,6.34315 1.34315,5 3,5 L13,5 C14.6569,5 16,6.34315 16,8 C16,9.65685 14.6569,11 13,11 L3,11 C1.34315,11 0,9.65685 0,8 Z M10,7 L13,7 C13.5523,7 14,7.44772 14,8 C14,8.55228 13.5523,9 13,9 L8,9 L10,7 Z'
              />
            </svg>
            <h1 className='font-semibold pt-3 text-lg'>Check Progress</h1>
            <p>
              Sewift keeps their clients updated of
              <br />
              their ordered apparels
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
