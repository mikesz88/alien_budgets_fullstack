import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import StyledTitle from '../../../components/Title';
import StyledButton from '../../../components/PrimaryButton';
import Notification from '../../../components/Notification';
import { ERROR, error, success } from '../../../common/constants';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';
import AlienImages from '../../../components/AlienImages';
import {
  StyledButtonMargin,
  StyledCenteredDivVaried,
  StyledDivWrapper,
  StyledFormItem,
  StyledInput,
  StyledInputPassword,
  StyledInputWrapper,
} from './styles';

const StudentLogin = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login: studentLogin } = useAuthServiceProvider();

  const login = (values) => {
    setLoading(true);
    studentLogin(values)
      .then(() => {
        Notification(
          success,
          'Login Successful',
          'You are now currently logged in.'
        );
        navigate('/aliendashboard');
      })
      .catch((err) => Notification(error, ERROR, err.response.data.error))
      .finally(() => {
        form.resetFields();
        setLoading(false);
      });
  };

  const onFinish = (values) => login(values);

  return (
    <StyledDivWrapper>
      <AlienImages />
      <StyledTitle>RETURNING ALIEN</StyledTitle>
      <Form form={form} name="loginStudent" onFinish={onFinish}>
        <StyledInputWrapper>
          <StyledFormItem
            left="left"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username.',
              },
            ]}
          >
            <StyledInput type="text" placeholder="Username" />
          </StyledFormItem>
          <StyledFormItem
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <StyledInputPassword type="password" placeholder="Password" />
          </StyledFormItem>
        </StyledInputWrapper>
        <Form.Item>
          <StyledCenteredDivVaried>
            <StyledCenteredDivVaried width={300}>
              <StyledButtonMargin
                left="left"
                loading={loading}
                larger="true"
                type="primary"
                htmlType="submit"
              >
                Login
              </StyledButtonMargin>
            </StyledCenteredDivVaried>
            <StyledCenteredDivVaried width={300}>
              <StyledButtonMargin larger="true" type="primary">
                <Link to="/register/student/part1">New Alien</Link>
              </StyledButtonMargin>
            </StyledCenteredDivVaried>
          </StyledCenteredDivVaried>
          <StyledCenteredDivVaried marginTop={4}>
            <StyledButton larger="true" type="primary">
              <Link to="/forgotpassword/question">
                Forgot Password? Use Forgot Question
              </Link>
            </StyledButton>
          </StyledCenteredDivVaried>
          <StyledCenteredDivVaried marginTop={4}>
            <StyledButton larger="true" type="primary">
              <Link to="/">Back to Main Page</Link>
            </StyledButton>
          </StyledCenteredDivVaried>
        </Form.Item>
      </Form>
    </StyledDivWrapper>
  );
};

export default StudentLogin;
