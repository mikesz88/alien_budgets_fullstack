/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Form, Input, notification, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';

const ForgotQA = ({ closeDrawer }) => {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const { authService, updateService } = useContext(UserContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const getAllForgotQuestions = useCallback(
    () =>
      authService.getAllForgotQuestions().then((res) => setQuestionList(res)),
    []
  );

  const forgotPassQuestionChange = (value) => {
    form.setFieldsValue({
      note: value,
    });
  };

  const getCurrentForgotQuestion = useCallback(() => {
    authService
      .getOneForgotQuestion(authService.forgotPasswordQuestion)
      .then((res) => {
        setCurrentQuestion(res.question);
      });
  }, []);

  useEffect(() => {
    getAllForgotQuestions();
    getCurrentForgotQuestion();
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    console.log(values);
    authService
      .updateForgotQuestionAnswer(values)
      .then(() => {
        notification.success({
          message: 'Success',
          description:
            'You have successfully changed your forgot question and answer',
        });
        form.resetFields();
        updateService();
        closeDrawer();
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: 'Incorrect Answer',
        });
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="Update Forgot Q&A"
      onFinish={onFinish}
    >
      <div>Current Forgot Question</div>
      <div>{currentQuestion}</div>
      <Form.Item
        label="Current Forgot Password Answer"
        name="currentForgotAnswer"
        rules={[
          {
            required: true,
            message: 'Please select your question',
          },
        ]}
      >
        <Input.Password type="password" placeholder="Forgot Password Answer" />
      </Form.Item>
      <Form.Item
        label="New Forgot Password Question"
        name="newForgotPasswordQuestion"
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
        label="New Forgot Password Answer"
        name="newForgotPasswordAnswer"
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
      <Form.Item>
        <StyledButton
          loading={loading}
          larger="true"
          type="primary"
          htmlType="submit"
        >
          Submit Changes
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

export default ForgotQA;
