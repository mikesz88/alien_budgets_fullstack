/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { Form, Modal, Input, Result, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';
import StyledTitle from '../../../components/Title';
import GreetingBar from '../../../components/GreetingBar';

const { confirm } = Modal;

const AccessByForgotPassword = () => {
  const { authService } = useContext(UserContext);
  const [resetModal, setResetModal] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [forgotQuestion, setForgotQuestion] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [successResult, setSuccessResult] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const chooseEmailOrUsername = (input) => setEmailOrUsername(input);

  const handleQuestion = () => {
    const user = email || username;
    authService
      .retrieveForgotQuestionFromUser(user)
      .then((res) => {
        console.log(res);
        authService
          .getOneForgotQuestion(res)
          .then((response) => {
            console.log(response);
            setForgotQuestion(response.question);
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => console.error(error));
  };

  const handleEmail = ({ target: { value } }) => setEmail(value);
  const handleUsername = ({ target: { value } }) => setUsername(value);

  const handleCancel = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to reset?',
      onOk() {
        setResetModal(true);
        form.resetFields();
      },
      onCancel() {},
    });
  };

  const closeModals = () => {
    setResetModal(false);
    setSuccessResult(false);
    return email ? navigate('/login/adult') : navigate('/login/student');
  };

  const onFinish = (values) => {
    const { forgotPasswordAnswer } = values;
    authService
      .validateForgotPassword(email, username, forgotPasswordAnswer)
      .then((res) => {
        console.log(res);
        setResetToken(res);
        setResetModal(true);
      })
      .catch((error) => {
        form.resetFields();
        console.error(error);
        notification.error({
          message: 'error',
          description: 'Please try again!',
        });
      });
  };

  const resetSubmit = (values) => {
    const { newPassword } = values;
    authService
      .resetPassword(resetToken, newPassword)
      .then((res) => {
        console.log(res);
        setResetModal(false);
        setSuccessResult(true);
      })
      .catch((err) => console.error(err));
  };

  const forgotPasswordForm = (
    <Form layout="vertical" name="Forgot Login" onFinish={onFinish} form={form}>
      <div>{forgotQuestion}</div>
      <Form.Item
        name="forgotPasswordAnswer"
        rules={[
          {
            required: true,
            message: 'Please write your answer.',
          },
        ]}
      >
        <Input type="text" placeholder="Write Answer Here" />
      </Form.Item>
      <Form.Item style={{ marginTop: '1rem' }}>
        <StyledButton type="primary" size="large" htmlType="submit">
          Submit
        </StyledButton>
      </Form.Item>
    </Form>
  );

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;

  return (
    <>
      <GreetingBar template="Forgot Question" />
      <div style={{ marginTop: '6rem' }}>
        <StyledTitle style={{ fontSize: '4rem' }}>
          Choose Email (Adult) or Username (Student/Alien)
        </StyledTitle>
        <div>
          <StyledButton
            type="primary"
            size="large"
            onClick={() => chooseEmailOrUsername('email')}
          >
            Email
          </StyledButton>
          <StyledButton
            type="primary"
            size="large"
            onClick={() => chooseEmailOrUsername('username')}
          >
            Username
          </StyledButton>
        </div>
        {emailOrUsername === 'email' ? (
          <div>
            <Input
              type="email"
              onChange={handleEmail}
              placeholder="write your email"
            />
            <StyledButton type="primary" size="large" onClick={handleQuestion}>
              Find Question
            </StyledButton>
          </div>
        ) : emailOrUsername === 'username' ? (
          <div>
            <Input
              type="text"
              onChange={handleUsername}
              placeholder="write your username"
            />
            <StyledButton type="primary" size="large" onClick={handleQuestion}>
              Find Question
            </StyledButton>
          </div>
        ) : null}
        {forgotQuestion ? forgotPasswordForm : null}

        <Modal
          open={resetModal}
          title="Reset Password"
          destroyOnClose
          onCancel={handleCancel}
          footer={[
            <StyledButton key="1" onClick={handleCancel}>
              Cancel
            </StyledButton>,
          ]}
        >
          <Form layout="vertical" name="new_password" onFinish={resetSubmit}>
            <Form.Item label="New Password">
              <div>
                Password must be 8-20 characters, including: at least one
                capital letter, at least one small letter, one number and one
                special character - ! @ # $ % ^ & * ( ) _ +
              </div>
              <Form.Item
                name="newPassword"
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password.',
                  },
                  {
                    min: 8,
                    message: 'Must be a minimum of 8 characters',
                  },
                  {
                    pattern: passwordRegex,
                    message:
                      'Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * ( ) _ +',
                  },
                ]}
              >
                <Input.Password type="password" />
              </Form.Item>
            </Form.Item>
            <Form.Item
              label="Confirm  New Password"
              name="confirm"
              dependencies={['newPassword']}
              hasFeedback
              style={{ width: '100%' }}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your  new password.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <StyledButton type="primary" htmlType="submit">
                Submit
              </StyledButton>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          open={successResult}
          onCancel={closeModals}
          footer={[
            <StyledButton key="close" type="primary" onClick={closeModals}>
              Close
            </StyledButton>,
          ]}
        >
          <Result
            status="success"
            title="Successfully Changed Password"
            subTitle="You have successfully change your password. Please click close out and sign in again with your new password. Close the button below to get back to the login screen."
          />
        </Modal>
      </div>
    </>
  );
};

export default AccessByForgotPassword;
