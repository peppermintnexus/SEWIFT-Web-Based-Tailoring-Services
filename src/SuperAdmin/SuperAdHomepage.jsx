import React from "react";
import LogoBlack from "/src/assets/images/LogoBlack.png";

export default function SuperAdHomepage() {
  const documents = [
    {
      id: 1,
      name: "Sastre.docx",
      uploadedBy: "Levi Uy",
      date: "2025-04-09",
      documentUrl: "/documents/Sastre.docx",
    },
    {
      id: 2,
      name: "TailorShop.pdf",
      uploadedBy: "Monica Zerrudo",
      date: "2025-04-09",
      documentUrl: "/documents/TailorShop.pdf",
    },
  ];

  return (
    <div className='bg-[#eeeeee] min-h-screen'>
      {/* Header Section */}
      <div className='viewport shadow flex-wrap justify-between items-center h-20 w-full px-4 sm:px-10  text-[#fefefe] bg-[#fefefe] relative'>
        <div className='flex justify-between items-center'>
          <a href='/AdminJobOrder' className='flex-shrink-0'>
            <img
              src={LogoBlack}
              className='ml-4 sm:ml-14 mt-5 h-10'
              alt='Sewift Logo'
            />
          </a>

          <div className='mt-5 flex items-center flex-shrink-0'>
            <svg
              className='w-5 h-5'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='12' cy='9' r='3' stroke='#7F7F7F' strokeWidth='1.5' />
              <circle
                cx='12'
                cy='12'
                r='10'
                stroke='#7F7F7F'
                strokeWidth='1.5'
              />
              <path
                d='M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20'
                stroke='#7F7F7F'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Document Table Section */}
      <div className='px-4 sm:px-10 py-8'>
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
            Documents
          </h2>

          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gray-50'>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Document Name
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Uploaded By
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Date
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {doc.name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {doc.uploadedBy}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {doc.date}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      <a
                        href={doc.documentUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-900 font-medium'
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {documents.length === 0 && (
            <div className='text-center py-8 text-gray-500'>
              No documents found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
