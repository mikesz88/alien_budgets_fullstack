import React from 'react';
import { Modal } from 'antd';

const TestMyMath = ({ open, toggleVisibility, data }) => {
  console.log('data =>', data);

  return (
    <Modal
      closable={false}
      onCancel={() => toggleVisibility(false)}
      onOk={() => console.log('placeholder ok message')}
      open={open}
    >
      TestMyMath
    </Modal>
  );
};

export default TestMyMath;
