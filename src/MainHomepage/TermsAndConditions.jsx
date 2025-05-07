import React from "react";
import Header from "/src/components/Header.jsx";
import BackgroundOne from "/src/assets/images/BackgroundOne.png";

const sections = [
  {
    title: "Service Agreement",
    content:
      "Clients can book tailoring services through the app. The tailor shop agrees to provide services as described, and clients agree to provide accurate information for measurements, preferences, and appointments.",
  },
  {
    title: "Payments",
    content: (
      <>
        <span>Clients must pay the agreed amount</span> before or upon
        completion of services. Prices shown in the app are final unless extra
        customizations are added.
      </>
    ),
  },
  {
    title: "Tailor Shop Responsibility",
    content: (
      <>
        <span>Each tailor shop is responsible</span> for the quality, timing,
        and completion of its own services. The web app only connects clients
        and shops and <span>does not manage or guarantee</span> any specific
        service outcome.
      </>
    ),
  },
  {
    title: "Responsibility for Measurements",
    content: (
      <>
        <span>Clients are responsible</span> for providing correct measurements
        if no in-person fitting is done. The tailor shop is not liable for
        errors caused by incorrect information.
      </>
    ),
  },
  {
    title: "Privacy and Data",
    content: (
      <>
        <span>Client information is used only</span> for booking and
        communication purposes. The app will not share personal data with third
        parties without consent.
      </>
    ),
  },
];

export default function About() {
  return (
    <div
      className='min-h-screen bg-cover bg-center'
      style={{ backgroundImage: `url(${BackgroundOne})` }}
    >
      <Header />

      <div className='max-w-4xl m-auto bg-white rounded-lg shadow-lg p-8 my-8'>
        <h1 className='text-3xl font-bold text-gray-900 border-b-2 border-gray-200 pb-3 mb-8'>
          Terms & Conditions
        </h1>

        {sections.map((section, i) => (
          <div
            key={i}
            className='mb-6 p-4 bg-gray-50 border-l-4 border-blue-500'
          >
            <h2 className='text-xl font-semibold text-gray-800 mb-3'>
              {section.title}
            </h2>
            <p className='text-gray-600 leading-relaxed'>{section.content}</p>
          </div>
        ))}

        <div className='mt-8 text-center text-gray-600'>
          <p className='mb-2'>March 30, 2025</p>
        </div>
      </div>
    </div>
  );
}
