import React, { useState } from 'react';
import { Form, Modal, Input, Result } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../../components/PrimaryButton';
import GreetingBar from '../../../components/GreetingBar';
import {
  ERROR,
  error,
  passwordRegex,
  SUCCESS,
  success,
} from '../../../common/constants';
import Notification from '../../../components/Notification';
import StyledBasicDiv from '../../../components/BasicDiv';
import {
  StyledDivWrapper,
  StyledExtraTitle,
  StyledFormItem,
  StyledWidthFormItem,
} from './styles';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';

const { confirm } = Modal;

const AccessByForgotPassword = () => {
  const {
    retrieveForgotQuestionFromUser,
    getOneForgotQuestion,
    validateForgotPassword: validateForgottenPassword,
    resetPassword: resetUserPassword,
  } = useAuthServiceProvider();
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
    retrieveForgotQuestionFromUser(user)
      .then((res) => {
        getOneForgotQuestion(res)
          .then((response) => {
            setForgotQuestion(response.question);
            Notification(success, SUCCESS, 'Forgot Question found!');
          })
          .catch(() =>
            Notification(error, ERROR, 'Unable to retrieve Forgot Question.')
          );
      })
      .catch(() => Notification(error, ERROR, 'Unable to retrieve user.'));
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

  const validateForgotPassword = (forgotPasswordAnswer) => {
    validateForgottenPassword(email, username, forgotPasswordAnswer)
      .then((res) => {
        setResetToken(res);
        setResetModal(true);
        Notification(
          success,
          SUCCESS,
          'Forgot Answer Accepted! Reset Password Now.'
        );
      })
      .catch(() => {
        form.resetFields();
        Notification(error, ERROR, 'Please try again!');
      });
  };

  const onFinish = (values) => {
    const { forgotPasswordAnswer } = values;
    validateForgotPassword(forgotPasswordAnswer);
  };

  const resetPassword = (newPassword) => {
    resetUserPassword(resetToken, newPassword)
      .then(() => {
        setResetModal(false);
        setSuccessResult(true);
        Notification(
          success,
          SUCCESS,
          'Password has been reset. Please Login!'
        );
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'Connection Error. Please refresh and try again later.'
        )
      );
  };

  const resetSubmit = (values) => {
    const { newPassword } = values;
    resetPassword(newPassword);
  };

  const forgotPasswordForm = (
    <Form layout="vertical" name="Forgot Login" onFinish={onFinish} form={form}>
      <StyledBasicDiv>{forgotQuestion}</StyledBasicDiv>
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
      <StyledFormItem>
        <StyledButton type="primary" size="large" htmlType="submit">
          Submit
        </StyledButton>
      </StyledFormItem>
    </Form>
  );

  return (
    <>
      <GreetingBar template="Forgot Question" />
      <StyledDivWrapper>
        <StyledExtraTitle>
          Choose Email (Adult) or Username (Student/Alien)
        </StyledExtraTitle>
        <StyledBasicDiv>
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
        </StyledBasicDiv>
        {emailOrUsername === 'email' ? (
          <StyledBasicDiv>
            <Input
              type="email"
              onChange={handleEmail}
              placeholder="write your email"
            />
            <StyledButton type="primary" size="large" onClick={handleQuestion}>
              Find Question
            </StyledButton>
          </StyledBasicDiv>
        ) : emailOrUsername === 'username' ? (
          <StyledBasicDiv>
            <Input
              type="text"
              onChange={handleUsername}
              placeholder="write your username"
            />
            <StyledButton type="primary" size="large" onClick={handleQuestion}>
              Find Question
            </StyledButton>
          </StyledBasicDiv>
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
              <StyledBasicDiv>
                Password must be 8-20 characters, including: at least one
                capital letter, at least one small letter, one number and one
                special character - ! @ # $ % ^ & * ( ) _ +
              </StyledBasicDiv>
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
            <StyledWidthFormItem
              label="Confirm  New Password"
              name="confirm"
              dependencies={['newPassword']}
              hasFeedback
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
            </StyledWidthFormItem>
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
      </StyledDivWrapper>
    </>
  );
};

export default AccessByForgotPassword;
