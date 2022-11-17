import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import StyledTitle from '../../../components/Title';
import StyledButton from '../../../components/PrimaryButton';
import Notification from '../../../components/Notification';
import { ERROR, error, SUCCESS, success } from '../../../common/constants';
import StyledCenteredFormItem from '../../../components/CenteredFormItem';
import StyledBasicDiv from '../../../components/BasicDiv';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';
import { useClassroomServiceProvider } from '../../../services/ClassroomServiceProvider';

const RegisterStudentPart1 = () => {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const {
    getAllForgotQuestions: getAllForgottenQuestions,
    registerStudentPart1,
  } = useAuthServiceProvider();
  const { classroomCodes, getAllClassrooms } = useClassroomServiceProvider();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const getAllClassCodes = useCallback(
    () =>
      getAllClassrooms().catch(() =>
        Notification(
          error,
          ERROR,
          'Connection Error. Please refresh and try again.'
        )
      ),
    []
  );

  const getAllForgotQuestions = useCallback(
    () =>
      getAllForgottenQuestions()
        .then((res) => setQuestionList(res))
        .catch(() =>
          Notification(
            error,
            ERROR,
            'Connection Error. Please refresh and try again later.'
          )
        ),
    []
  );

  const forgotPassQuestionChange = (value) => {
    form.setFieldsValue({
      note: value,
    });
  };

  const completeStudentData = (userData) => {
    setLoading(true);
    try {
      registerStudentPart1(userData);
      form.resetFields();
      navigate('/register/student/part2');
      Notification(success, SUCCESS, 'Part 1 completed!');
    } catch (err) {
      Notification(
        error,
        ERROR,
        'Uh Oh! You made a mistake! Please try again!'
      );
    } finally {
      setLoading(false);
    }
  };

  const isValidClassCode = useCallback(
    (classCode) => classroomCodes.includes(classCode),
    []
  );

  const onFinish = (values) => {
    if (isValidClassCode(values.classroomCode)) {
      completeStudentData(values);
    } else {
      Notification(
        error,
        ERROR,
        'You have made a mistake. Please try another Classroom Code.'
      );
    }
  };

  useEffect(() => {
    getAllClassCodes();
    getAllForgotQuestions();
  }, []);

  return (
    <>
      <StyledTitle>NEW ALIEN</StyledTitle>
      <Form form={form} name="registerStudent" onFinish={onFinish}>
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
          name="lastInitial"
          hasFeedback
          rules={[
            {
              type: 'text',
              required: true,
              message: 'Please input your last initial.',
            },
            {
              pattern: /^[a-zA-Z]{1}$/gm,
              required: true,
              message: 'Please only write one letter.',
            },
          ]}
        >
          <Input type="text" placeholder="Last Initial" />
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
        <Form.Item
          name="classroomCode"
          rules={[
            {
              required: true,
              message: 'Please write in a valid Class Code.',
            },
          ]}
        >
          <Input type="text" placeholder="Type your class code in now" />
        </Form.Item>
        <StyledCenteredFormItem register="true">
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
        </StyledCenteredFormItem>
      </Form>
    </>
  );
};

export default RegisterStudentPart1;
