/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

const TestMyMath = ({ open, toggleVisibility, data }) => {
  console.log('data =>', data);
  const [errorObject, setErrorObject] = useState(null);
  const preTaxMonthlySalary = 0;
  const salaryTax = 0;
  const postTaxMonthlyTax = 0;

  const checkForErrors = () => console.log('check for errors');

  const errorMessage = (mistake) => console.log(mistake);

  return (
    <Modal
      closable={false}
      onCancel={() => toggleVisibility(false)}
      onOk={() => console.log('placeholder ok message')}
      open={open}
    >
      <>
        <div>Test my data</div>
        <div>Test my data</div>
      </>
    </Modal>
  );
};

export default TestMyMath;
