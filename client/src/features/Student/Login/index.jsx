import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, notification } from 'antd';
import StyledTitle from '../../../components/Title';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';

const StudentLogin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { authService, updateService } = useContext(UserContext);

  const onFinish = (values) => {
    console.log('values =>', values);
    authService
      .login(values)
      .then(() => {
        navigate('/aliendashboard');
        notification.success({
          message: 'Login Successful',
          description: 'You are now currently logged in.',
        });
        updateService();
      })
      .catch(() => {
        form.resetFields();
        notification.error({
          message: 'error',
          description: 'Please try again!',
        });
      });
  };

  return (
    <>
      <StyledTitle>RETURNING ALIEN</StyledTitle>
      <Form form={form} name="loginStudent" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username.',
            },
          ]}
        >
          <Input type="text" placeholder="Username" />
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
          <StyledButton larger="true" type="primary" htmlType="submit">
            Login
          </StyledButton>
          <StyledButton larger="true" type="primary">
            <Link to="/register/student/part1">New Alien</Link>
          </StyledButton>
        </Form.Item>
      </Form>
    </>
  );
};

export default StudentLogin;
