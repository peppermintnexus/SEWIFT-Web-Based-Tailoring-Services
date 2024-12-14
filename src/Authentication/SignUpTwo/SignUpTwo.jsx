import React, { useState } from 'react';
import { Tabs } from 'antd';
import ClientSignUp from './ClientSignUp.jsx';
import AdminSignUp from './AdminSignUp.jsx';
import EmployeeSignUp from './EmployeeSignUp.jsx';

const SignUp = () => {
  const [activeTab, setActiveTab] = useState('1'); // Default active tab

  const onChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="flex justify-center items-center bg-[#d9edf4] min-h-screen">
      <div className="px-24 bg-[#fefefe] rounded-lg">
        <h1 className="text-center pt-5 mb-8 font-semibold text-4xl">Sign Up</h1>
        <Tabs
          onChange={onChange}
          activeKey={activeTab}
          type="card"
          items={[
            {
              label: 'Client',
              key: '1',
              children: <ClientSignUp />,
            },
            {
              label: 'Admin',
              key: '2',
              children: <AdminSignUp />,
            },
            {
              label: 'Tailor Shop Employee',
              key: '3',
              children: <EmployeeSignUp />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default SignUp;
