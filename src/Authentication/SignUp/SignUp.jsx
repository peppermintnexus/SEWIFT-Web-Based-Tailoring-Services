import React, { useState } from 'react';
import ClientSignUp from './ClientSignUp.jsx'
import AdminSignUp from './AdminSignUp.jsx'

const SignUp = () => {
  const [selectCheckbox, setChecked] = useState('');

  const handleChangeCheckbox = (checkbox) => {
    setChecked(checkbox);
  };

  return (
    <div className='flex justify-center items-center bg-[#d9edf4] min-h-screen'>
        <div className='px-24 bg-[#fefefe] rounded-lg'>
            <h1 className='text-center pt-5 mb-8 font-semibold text-4xl'>Sign up</h1>
        <div className='flex mb-3'>
            <p>Sign Up as:</p>

            <div className='flex justify-center items-center bg-[#eeeeee] rounded-lg mx-2 px-2 py-1'>
                <p>Client</p>
            <input type='checkbox'
                   checked={selectCheckbox === 'checkedClient'} 
                   onChange={() => handleChangeCheckbox('checkedClient')} 
                   className='w-5 ml-2' />
            </div>
            <div className='flex justify-center items-center bg-[#eeeeee] rounded-lg mx-2 px-2 py-1'>
                <p>Admin</p>
            <input type='checkbox'
                   checked={selectCheckbox === 'checkedAdmin'} 
                   onChange={() => handleChangeCheckbox('checkedAdmin')} 
                   className='w-5 ml-2' />
            </div>
        </div>

        <div className='flex justify-center items-center'>
            {selectCheckbox === 'checkedClient' ? <ClientSignUp /> : <div></div>}
        </div>

        <div className='flex justify-center items-center'>
            {selectCheckbox === 'checkedAdmin' ? <AdminSignUp /> : <div></div>}
        </div>
        </div>
    </div>
  )
}

export default SignUp;
