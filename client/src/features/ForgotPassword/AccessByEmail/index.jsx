/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Input, Result, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import StyledTitle from '../../../components/Title';
import StyledButton from '../../../components/PrimaryButton';
import GreetingBar from '../../../components/GreetingBar';
import { UserContext } from '../../../App';

const AccessByEmail = () => {
  const { authService } = useContext(UserContext);
  const [successResult, setSuccessResult] = useState(false);
  const [failedResult, setFailedResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleClose = () => {
    setSuccessResult(false);
    navigate('/');
  };

  const handleFailedClose = () => setFailedResult(false);

  const onFinish = (values) => {
    setLoading(true);
    const { email } = values;
    console.log(email);
    authService
      .resetPasswordByEmail(email)
      .then((response) => {
        console.log(response);
        setSuccessResult(true);
      })
      .catch((error) => {
        console.error(error);
        setFailedResult(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <GreetingBar template="Reset Password by Email" />
      <div style={{ marginTop: '6rem' }}>
        <StyledTitle>Write Email</StyledTitle>
        <Form layout="vertical" name="Email" onFinish={onFinish} form={form}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your email.',
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item style={{ marginTop: '1rem' }}>
            <StyledButton
              loading={loading}
              type="primary"
              size="large"
              htmlType="submit"
            >
              Submit
            </StyledButton>
          </Form.Item>
        </Form>

        <Modal
          open={successResult}
          footer={[
            <StyledButton key="close" type="primary" onClick={handleClose}>
              Go to Home
            </StyledButton>,
          ]}
        >
          <Result
            status="success"
            title="Email Sent"
            subTitle="Please go to your email and click the link. It will take you to reset your password."
          />
        </Modal>

        <Modal
          open={failedResult}
          onCancel={handleFailedClose}
          footer={[
            <StyledButton
              key="close"
              type="primary"
              onClick={handleFailedClose}
            >
              Close
            </StyledButton>,
          ]}
        >
          <Result
            status="error"
            title="Email was not correct"
            subTitle="Please write a valid email."
          />
        </Modal>
      </div>
    </>
  );
};

export default AccessByEmail;
