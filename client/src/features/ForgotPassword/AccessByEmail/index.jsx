import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Input, Result } from 'antd';
import StyledTitle from '../../../components/Title';
import StyledButton from '../../../components/PrimaryButton';
import GreetingBar from '../../../components/GreetingBar';
import Notification from '../../../components/Notification';
import { ERROR, error, SUCCESS, success } from '../../../common/constants';
import { StyledDivWrapper, StyledFormItem } from './styles';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';

const AccessByEmail = () => {
  const { resetPasswordByEmail } = useAuthServiceProvider();
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

  const resetEmail = (email) => {
    setLoading(true);
    resetPasswordByEmail(email)
      .then(() => {
        setSuccessResult(true);
        Notification(
          success,
          SUCCESS,
          'Email has been sent. Please check your email.'
        );
      })
      .catch(() => {
        setFailedResult(true);
        Notification(error, ERROR, 'No email found. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  const onFinish = (values) => {
    const { email } = values;
    resetEmail(email);
  };

  return (
    <>
      <GreetingBar template="Reset Password by Email" />
      <StyledDivWrapper>
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
          <StyledFormItem>
            <StyledButton
              loading={loading}
              type="primary"
              size="large"
              htmlType="submit"
            >
              Submit
            </StyledButton>
          </StyledFormItem>
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
      </StyledDivWrapper>
    </>
  );
};

export default AccessByEmail;
