import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import StyledTitle from '../../../components/Title';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';
import Notification from '../../../components/Notification';
import { ERROR, error, success } from '../../../common/constants';

const StudentLogin = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { authService, updateService } = useContext(UserContext);

  const login = (values) => {
    setLoading(true);
    authService
      .login(values)
      .then(() => {
        navigate('/aliendashboard');
        Notification(
          success,
          'Login Successful',
          'You are now currently logged in.'
        );
        updateService();
      })
      .catch(() => {
        form.resetFields();
        Notification(error, ERROR, 'Please try again!');
      })
      .finally(() => setLoading(false));
  };

  const onFinish = (values) => login(values);

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
          <StyledButton
            loading={loading}
            larger="true"
            type="primary"
            htmlType="submit"
          >
            Login
          </StyledButton>
          <StyledButton larger="true" type="primary">
            <Link to="/register/student/part1">New Alien</Link>
          </StyledButton>
          <StyledButton larger="true" type="primary">
            <Link to="/forgotpassword/question">
              Forgot Password? Use Forgot Question
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

export default StudentLogin;
