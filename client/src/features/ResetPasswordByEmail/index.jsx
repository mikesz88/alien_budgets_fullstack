/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Result, Modal } from 'antd';
import GreetingBar from '../../components/GreetingBar';
import StyledTitle from '../../components/Title';
import StyledButton from '../../components/PrimaryButton';
import { UserContext } from '../../App';

const ResetPasswordByEmail = () => {
  const { authService } = useContext(UserContext);
  const { resettoken } = useParams();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [successResult, setSuccessResult] = useState(false);
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;

  const goToLogin = () => {
    setSuccessResult(false);
    navigate('/login/adult');
  };

  const onFinish = (values) => {
    setLoading(true);
    const { password } = values;
    console.log(password);
    console.log(resettoken);
    authService
      .resetPasswordByToken(resettoken, password)
      .then((res) => {
        console.log(res);
        setSuccessResult(true);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <GreetingBar template="Reset Password" />
      <StyledTitle style={{ marginTop: '6rem' }}>Reset Password</StyledTitle>
      <Form layout="vertical" form={form} id={form} onFinish={onFinish}>
        <Form.Item noStyle>
          <div>
            Your new password must be 8-20 characters, including: at least one
            capital letter, at least one small letter, one number and one
            special character - ! @ # $ % ^ & * ( ) _ +
          </div>
          <Form.Item
            name="password"
            hasFeedback
            register="true"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
              {
                min: 8,
                required: true,
                message: 'Must be a minimum of 8 characters',
              },
              {
                max: 20,
                required: true,
                message: 'Must be a maximum of 20 characters',
              },
              {
                pattern: passwordRegex,
                required: true,
                message:
                  'Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * ( ) _ +',
              },
            ]}
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          register="true"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password type="password" placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item register="true" style={{ textAlign: 'center' }}>
          <div>By signing up you agree to our terms and policies.</div>
          <StyledButton
            loading={loading}
            larger="true"
            type="primary"
            htmlType="submit"
          >
            Submit
          </StyledButton>
        </Form.Item>
      </Form>

      <Modal
        open={successResult}
        footer={[
          <StyledButton
            key="moveToLogin"
            larger="true"
            type="primary"
            onClick={goToLogin}
          >
            Go To Login
          </StyledButton>,
        ]}
      >
        <Result
          status="success"
          title="Successfully Changed Password"
          subTitle="You have successfully change your password. Please click close out and sign in again with your new password. Close the button below to get back to the login screen."
        />
      </Modal>
    </>
  );
};

export default ResetPasswordByEmail;
