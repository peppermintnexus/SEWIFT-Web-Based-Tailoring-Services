import React from 'react';

const TextBox = ({ name, value, onChange }) => {
  return (
      <input 
        className="w-full h-7 border border-gray-300 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type='text'
        name={name}
        value={value}
        onChange={onChange}
      />
  );
}

export default TextBox;
