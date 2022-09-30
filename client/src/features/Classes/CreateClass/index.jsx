/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Form, Radio, Row, Space, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { faker } from '@faker-js/faker';
import GreetingBar from '../../../components/GreetingBar';
import { UserContext } from '../../../App';
import StyledDashboardWrapper from '../../../components/Dashboard/Wrapper';
import theme from '../../../theme';
import StyledButton from '../../../components/PrimaryButton';

const CreateClass = () => {
  const [classroomCode, setClassroomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { authService, avatarService } = useContext(UserContext);
  const [form] = Form.useForm();

  // Create Class Code
  const createClassroomCode = useCallback(
    () => faker.random.alphaNumeric(6),
    []
  );

  const handleRandomClassroomCode = () => {
    const classCode = createClassroomCode();
    form.setFieldsValue({
      classroomCode: classCode,
    });
    setClassroomCode(classCode);
  };

  useEffect(() => {
    handleRandomClassroomCode(createClassroomCode());
  }, []);

  const newPassword = useCallback(
    () => faker.internet.password(8, false, /[a-zA-Z0-9-#$^+_!*()@%&]/),
    []
  );

  const getRandomAdjective = useCallback(() => faker.word.adjective(), []);

  const getRandomAvatar = useCallback(
    async () => avatarService.getRandomAvatar(),
    []
  );

  const selectUsernameNumbers = useCallback(() => {
    const numbers = faker.random.numeric(3);
    if (numbers === 666) {
      selectUsernameNumbers();
    }
    return numbers;
  }, []);

  const generateBgColor = useCallback(
    () =>
      // eslint-disable-next-line no-bitwise
      `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`,
    []
  );

  const getRandomForgotPasswordSet = useCallback(async () => {
    const forgotQuestionList = await authService.getAllForgotQuestions();
    const chosenQuestion = faker.helpers.arrayElement(forgotQuestionList);
    return {
      forgotPasswordQuestion: chosenQuestion.question,
      forgotPasswordAnswer: faker.word.adjective(),
    };
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    let students = [];
    if (values.students.length) {
      const studentListWithInfo = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const student of values.students) {
        const forgotPasswordSet = await getRandomForgotPasswordSet();
        const randomAdjective = getRandomAdjective();
        const randomAvatar = await getRandomAvatar();
        const randomNumbers = selectUsernameNumbers();
        studentListWithInfo.push({
          firstName: student.firstName,
          lastInitial: student.lastInitial,
          forgotPasswordQuestion: forgotPasswordSet.forgotPasswordQuestion,
          forgotPasswordAnswer: forgotPasswordSet.forgotPasswordAnswer,
          classroomCode: values.classroomCode,
          username: `${randomAdjective}_${randomAvatar.title}${randomNumbers}`,
          avatarURL: randomAvatar.avatarURL,
          avatarColor: generateBgColor(),
          password: newPassword(),
        });
      }
      students = studentListWithInfo;
    }
    console.log({
      classroomCode: values.classroomCode,
      gradeLevel: values.gradeLevel,
      students,
    });
    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: theme.colors.lightGrey,
        display: 'flex',
        padding: '8rem 0',
        height: '100vh',
      }}
    >
      <GreetingBar template="New Class" />
      <Form form={form} name="Create new class" onFinish={onFinish}>
        <Form.Item name="classroomCode">
          <StyledButton onClick={handleRandomClassroomCode}>
            {classroomCode}
          </StyledButton>
        </Form.Item>
        <Form.Item
          name="gradeLevel"
          label="Grade Level"
          rules={[
            {
              required: true,
              message: 'Please select a grade level!',
            },
          ]}
        >
          <Radio.Group>
            <Row>
              <Radio value="4th">4th</Radio>
              <Radio value="5th">5th</Radio>
              <Radio value="6th">6th</Radio>
            </Row>
          </Radio.Group>
        </Form.Item>
        <Form.List name="students">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'firstName']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing first name',
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'lastInitial']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing last name',
                      },
                    ]}
                  >
                    <Input placeholder="Last Initial" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item register="true" style={{ textAlign: 'center' }}>
          <StyledButton
            loading={loading}
            larger="true"
            type="primary"
            htmlType="submit"
          >
            Create Class
          </StyledButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateClass;
