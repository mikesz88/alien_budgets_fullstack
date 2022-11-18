import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import StyledTitle from '../../../components/Title';
import StyledButton from '../../../components/PrimaryButton';
import { success, error, ERROR } from '../../../common/constants';
import Notification from '../../../components/Notification';
import loginButtons from './helper';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';
import AlienImages from '../../../components/AlienImages';

const AdultLogin = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useAuthServiceProvider();

  const onFinish = (values) => {
    setLoading(true);
    login(values)
      .then(() => {
        Notification(
          success,
          'Login Successful',
          'You are now currently logged in.'
        );
        navigate('/dashboard');
      })
      .catch((err) => Notification(error, ERROR, err.response.data.error))
      .finally(() => {
        form.resetFields();
        setLoading(false);
      });
  };

  return (
    <>
      <AlienImages />
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
          {loginButtons.map((feature) => {
            if (feature.htmlType) {
              return (
                <StyledButton
                  key={feature.buttonText}
                  loading={loading}
                  larger={feature.larger}
                  type={feature.type}
                  htmlType={feature.htmlType}
                >
                  {feature.buttonText}
                </StyledButton>
              );
            }
            return (
              <StyledButton
                key={feature.buttonText}
                larger={feature.larger}
                type={feature.type}
              >
                <Link to={feature.Link}>{feature.buttonText}</Link>
              </StyledButton>
            );
          })}
        </Form.Item>
      </Form>
    </>
  );
};

export default AdultLogin;
