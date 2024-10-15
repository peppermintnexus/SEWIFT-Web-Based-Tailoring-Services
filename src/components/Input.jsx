import React from 'react';
import { Flex, Input } from 'antd';
const { TextArea } = Input;
const onChange = (e) => {
  console.log('Change:', e.target.value);
};
const App = () => (
    <TextArea 
    showCount
    maxLength={100} 
    onChange={onChange} 
    placeholder="Description" 
    className='mt-2 custom-width max-w-lg' 
  />
);
export default App;