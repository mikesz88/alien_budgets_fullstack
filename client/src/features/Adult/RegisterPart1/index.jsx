import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import StyledTitle from '../../../components/Title';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';
import Notification from '../../../components/Notification';
import { ERROR, error, SUCCESS, success } from '../../../common/constants';
import StyledFormItem from './styles';
import StyledBasicDiv from '../../../components/BasicDiv';

const RegisterAdult = () => {
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authService, classroomService } = useContext(UserContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;

  const getAllClassCodes = useCallback(
    () => classroomService.getAllClassrooms(),
    []
  );

  const getAllForgotQuestions = useCallback(
    () =>
      authService.getAllForgotQuestions().then((res) => setQuestionList(res)),
    []
  );

  useEffect(() => {
    getAllClassCodes();
    getAllForgotQuestions();
  }, []);

  const forgotPassQuestionChange = (value) => {
    form.setFieldsValue({
      note: value,
    });
  };

  const registerAdult = (values) => {
    try {
      authService.registerAdultPart1(values);
      form.resetFields();
      Notification(success, SUCCESS, 'Part 1 Completed!');
      navigate('/register/adult/part2');
    } catch (err) {
      Notification(error, ERROR, 'You made a mistake. Please try again!');
    }
  };

  const onFinish = (values) => {
    setLoading(true);
    authService
      .validateEmail(values.email)
      .then((response) => {
        Notification(success, SUCCESS, response.message);
        registerAdult(values);
      })
      .catch((err) => {
        Notification(error, ERROR, err.response.data.error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <StyledTitle>NEW ADULT</StyledTitle>
      <Form form={form} name="registerAdult" onFinish={onFinish}>
        <Form.Item
          name="firstName"
          hasFeedback
          rules={[
            {
              type: 'text',
              required: true,
              message: 'Please input your first name.',
            },
            {
              pattern: /[a-zA-Z]{3,}/gm,
              required: true,
              message: 'Must be minimum 3 letters.',
            },
          ]}
        >
          <Input type="text" placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          hasFeedback
          rules={[
            {
              type: 'text',
              message: 'Please input your last name.',
            },
            {
              pattern: /[a-zA-Z]{3,}/gm,
              required: true,
              message: 'Must be minimum 3 letters.',
            },
            {
              required: true,
              message: 'You are required to write a name.',
            },
          ]}
        >
          <Input type="text" placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="email"
          register="true"
          rules={[
            {
              type: 'email',
              message: 'Please input a valid email',
            },
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item noStyle>
          <StyledBasicDiv>
            Password must be 8-20 characters, including: at least one capital
            letter, at least one small letter, one number and one special
            character - ! @ # $ % ^ & * ( ) _ +
          </StyledBasicDiv>
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
        <Form.Item
          name="forgotPasswordQuestion"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select your question',
            },
          ]}
        >
          <Select
            placeholder="Forgot Password Question"
            onChange={forgotPassQuestionChange}
            allowClear
          >
            {questionList.map((question) => (
              <Select.Option key={question.id} value={question.id}>
                {question.question}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="forgotPasswordAnswer"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please write your answer.',
            },
          ]}
        >
          <Input type="text" placeholder="Forgot Password Answer" />
        </Form.Item>
        <StyledFormItem register="true">
          <StyledBasicDiv>
            By signing up you agree to our terms and policies.
          </StyledBasicDiv>
          <StyledButton
            loading={loading}
            larger="true"
            type="primary"
            htmlType="submit"
          >
            Next Page
          </StyledButton>
          <StyledBasicDiv>
            The next page you will out your username, password, and avatar.
          </StyledBasicDiv>
          <StyledButton larger="true" type="primary">
            <Link to="/">Back to Main Page</Link>
          </StyledButton>
        </StyledFormItem>
      </Form>
    </>
  );
};

export default RegisterAdult;
