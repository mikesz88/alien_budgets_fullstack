/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Form, Radio, Row, Space, Input, Button, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import GreetingBar from '../../../components/GreetingBar';
import { UserContext } from '../../../App';
import theme from '../../../theme';
import StyledButton from '../../../components/PrimaryButton';

const CreateClass = () => {
  const [classroomCode, setClassroomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [newClassId, setNewClassId] = useState({});
  const [newClassroomRoster, setNewClassroomRoster] = useState(false);
  const [newStudentData, setNewStudentData] = useState([]);
  const { authService, avatarService, classroomService } =
    useContext(UserContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

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
    if (values.students) {
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
          score: 0,
        });
      }
      students = studentListWithInfo;
    }
    const body = {
      classroomCode: values.classroomCode,
      gradeLevel: values.gradeLevel,
      students,
      adult: authService.id,
    };

    classroomService
      .createClassroom(authService.getBearerHeader(), body)
      .then((res) => {
        console.log(res);
        setNewClassId(res.id);
        setNewStudentData(res.students);
        setNewClassroomRoster(true);
        notification.success({
          message: 'Class Created!',
          description:
            'Please print the cards below to hand out to the students to sign in.',
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: 'There was a connection error. Please try again later',
        });
        console.error(error);
      });

    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: theme.colors.lightGrey,
        display: 'flex',
        justifyContent: 'center',
        padding: '8rem 0',
        height: '100vh',
      }}
    >
      <GreetingBar template="New Class" />
      {!newClassroomRoster && (
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
                        {
                          pattern: /[a-zA-Z]{3,}/gm,
                          required: true,
                          message: 'Must be minimum 3 letters.',
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
                        {
                          pattern: /^[a-zA-Z]{1}$/gm,
                          required: true,
                          message: 'Please only write one letter.',
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
      )}
      {newClassroomRoster && (
        <div
          style={{
            backgroundColor: theme.colors.lightGrey,
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h1
              style={{ textAlign: 'center', fontFamily: theme.fontFamily.hind }}
            >
              Class Roster
            </h1>
            <StyledButton
              type="primary"
              onClick={() =>
                navigate(`/classrooms/teacher/details/${newClassId}`)
              }
            >
              Go to Class Details
            </StyledButton>
          </div>
          <div
            style={{
              padding: '1rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {newStudentData.map((student) => (
              <div
                style={{
                  border: '1px solid transparent',
                  borderRadius: '8px',
                  boxShadow: '0px 10px 10px grey',
                  margin: '1rem',
                  padding: '0.5rem',
                  width: '300px',
                  height: '300px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                }}
                key={student._id}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '1rem',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 'bold' }}>First Name:</span>{' '}
                    {student.firstName}
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Last Initial:</span>{' '}
                    {student.lastInitial}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '1rem',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Username:</span>{' '}
                    {student.username}
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Password:</span>{' '}
                    {student.password}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '1rem',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 'bold' }}>
                      Forgot Password Question:
                    </span>{' '}
                    {student.forgotPasswordQuestion}
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>
                      Forgot Password Answer:
                    </span>{' '}
                    {student.forgotPasswordAnswer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateClass;
