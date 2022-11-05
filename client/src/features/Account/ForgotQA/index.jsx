import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';
import Notification from '../../../components/Notification';
import StyledBasicDiv from '../../../components/BasicDiv';
import { error, ERROR, SUCCESS, success } from '../../../common/constants';

const ForgotQA = ({ closeDrawer }) => {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const { authService, updateService } = useContext(UserContext);
  const [form] = Form.useForm();

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
    authService
      .updateForgotQuestionAnswer(values)
      .then(() => {
        Notification(
          success,
          SUCCESS,
          'You have successfully changed your forgot question and answer'
        );
        form.resetFields();
        updateService();
        closeDrawer();
      })
      .catch(() => {
        Notification(error, ERROR, 'Incorrect Answer');
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
      <StyledBasicDiv>Current Forgot Question</StyledBasicDiv>
      <StyledBasicDiv>{currentQuestion}</StyledBasicDiv>
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
