import React, { useState } from 'react';
import ClientSignUp from './ClientSignUp.jsx'

const SignUp = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className='flex justify-center items-center bg-[#d9edf4] min-h-screen pb-10'>
        <div className='px-24 bg-[#fefefe]'>
            <h1 className='text-center pt-5 mb-8 font-semibold text-4xl'>Sign up</h1>
        <div className='flex mb-3'>
            <p>Sign Up as:</p>

            <div className='flex bg-[#eeeeee] rounded-lg mx-2 px-2 py-1'>
                <p>Client</p>
            <input type='checkbox'
                   checked={checked} 
                   onChange={handleChange} 
                   className='w-5 ml-2' />
            </div>
        </div>
        <div className='flex justify-center items-center'>
            {checked ? <ClientSignUp /> : <div>Unchecked</div>}
            </div>
        </div>
    </div>
  )
}

export default SignUp;
