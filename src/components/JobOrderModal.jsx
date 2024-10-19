import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        View More
      </Button>
      {/* Remove OK and Cancel buttons by setting footer to null */}
      <Modal title="JO Number 12345" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <p>Client Name:</p>
        <p>Tailor ID:</p>
        <p>Date of Order:</p>
        <p>Quantity:</p>
        <p>Total Price:</p>
        <p>Remarks:</p>

        <div className='flex items-center'>
          <img 
            src="https://via.placeholder.com/150"
            alt="Placeholder"
            className="w-auto h-auto object-cover rounded-lg shadow-md" 
          />
        </div>
      </Modal>
    </>
  );
};

export default App;
