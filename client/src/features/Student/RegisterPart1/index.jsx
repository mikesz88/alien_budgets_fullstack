import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Form, Input, notification, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import StyledTitle from '../../../components/Title';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';

const RegisterStudentPart1 = () => {
  const [questionList, setQuestionList] = useState([]);
  const { authService, classCodeService } = useContext(UserContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const getAllClassCodes = useCallback(
    () => classCodeService.getAllClassCodes(),
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

  const completeStudentData = (userData) => {
    try {
      authService.registerStudentPart1(userData);
      form.resetFields();
      notification.success({
        message: 'success',
        description: 'Part 1 completed!',
      });
      navigate('/register/student/part2');
    } catch (error) {
      notification.error({
        message: 'error',
        description: 'You made a mistake!',
      });
    }
  };

  const isValidClassCode = useCallback(
    (classCode) => classCodeService.classCodeList.includes(classCode),
    []
  );

  const onFinish = (values) => {
    if (isValidClassCode(values.classroomCode)) {
      completeStudentData(values);
    } else {
      notification.error({
        message: 'error',
        description: 'You made a mistake',
      });
    }
  };

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
        <Form.Item register="true" style={{ textAlign: 'center' }}>
          <div>By signing up you agree to our terms and policies.</div>
          <StyledButton larger="true" type="primary" htmlType="submit">
            Next Page
          </StyledButton>
          <div>
            The next page you will out your username, password, and avatar.
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterStudentPart1;
