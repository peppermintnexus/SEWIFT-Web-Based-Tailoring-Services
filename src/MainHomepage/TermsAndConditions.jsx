import React from "react";
import Header from "/src/components/Header.jsx";
import StickerNote from "/src/assets/images/StickerNote.png";

export default function About() {
  return (
    <div className='bg-[#fefefe]'>
      <div>
        <Header />
      </div>

      <nav className='flex place-content-center my-2 '>
        <a href='/About'>
          <button className='font-semibold rounded-full px-4 py-2 text-[#6F6F6F] bg-[#FEFEFE] hover:bg-[#10aeb2] hover:text-[#fefefe] hover:shadow-md'>
            About Us
          </button>
        </a>
        <a href='/TermsAndConditions'>
          <button className='font-semibold rounded-full px-4 py-2 text-[#6F6F6F] bg-[#FEFEFE] hover:bg-[#10aeb2] hover:text-[#fefefe] hover:shadow-md'>
            Terms and Conditions
          </button>
        </a>
        <a href='/Contact'>
          <button className='font-semibold rounded-full px-4 py-2 text-[#6F6F6F] bg-[#FEFEFE] hover:bg-[#10aeb2] hover:text-[#fefefe] hover:shadow-md'>
            Contact
          </button>
        </a>
      </nav>

      <div className='sm:mx-5 md:mx-10 rounded-xl bg-gradient-to-r from-[#10aeb2] to-[#99dbff]'>
        <div className='flex text-left'>
          <img src={StickerNote} class='sm:w-2/4 md:w-1/3 p-12' />

          <div>
            <h1 className='sm:text-3xl md:text-5xl font-semibold text-[#fefefe] md:pl-12 mt-12 mb-5'>
              Terms and Conditions
            </h1>
            <p className='md:text-xl md:pl-14'>To be added</p>
          </div>
        </div>
      </div>
    </div>
  );
}
