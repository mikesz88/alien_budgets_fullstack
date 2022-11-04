/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, notification } from 'antd';
import StyledTitle from '../../../components/Title';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';

const AdultLogin = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { authService, updateService } = useContext(UserContext);

  const onFinish = (values) => {
    setLoading(true);
    console.log('values =>', values);
    authService
      .login(values)
      .then(() => {
        navigate('/dashboard');
        notification.success({
          message: 'Login Successful',
          description: 'You are now currently logged in.',
        });
        form.resetFields();
        updateService();
      })
      .catch((error) => {
        form.resetFields();
        console.error(error);
        notification.error({
          message: 'error',
          description: 'Please try again!',
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <StyledTitle>RETURNING ADULT</StyledTitle>
      <Form form={form} name="loginStudent" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email.',
            },
          ]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <StyledButton
            loading={loading}
            larger="true"
            type="primary"
            htmlType="submit"
          >
            Login
          </StyledButton>
          <StyledButton larger="true" type="primary">
            <Link to="/register/adult/part1">New Adult</Link>
          </StyledButton>
          <StyledButton larger="true" type="primary">
            <Link to="/forgotpassword/question">
              Forgot Password? Use Forgot Question
            </Link>
          </StyledButton>
          <StyledButton larger="true" type="primary">
            <Link to="/forgotpassword/email">
              Forgot Password? Find by Email
            </Link>
          </StyledButton>
          <StyledButton larger="true" type="primary">
            <Link to="/">Back to Main Page</Link>
          </StyledButton>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdultLogin;
