/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useCallback } from 'react';
import { Form, Modal, Space, Input, Button, notification } from 'antd';
import { faker } from '@faker-js/faker';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import StyledButton from '../../../../../components/PrimaryButton';
import theme from '../../../../../theme';

import { UserContext } from '../../../../../App';

const NewStudentModal = ({ open, close, classId, classroomCode }) => {
  const [loading, setLoading] = useState(false);
  const [newClassroomRoster, setNewClassroomRoster] = useState(false);
  const [newStudentData, setNewStudentData] = useState([]);
  const { authService, avatarService, classroomService, updateService } =
    useContext(UserContext);
  const [form] = Form.useForm();

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
    console.log(values);
    const body = {
      classId,
    };
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
          classroomCode,
          username: `${randomAdjective}_${randomAvatar.title}${randomNumbers}`,
          avatarURL: randomAvatar.avatarURL,
          avatarColor: generateBgColor(),
          password: newPassword(),
          score: 0,
        });
      }
      body.students = studentListWithInfo;
    }
    console.log(body);
    classroomService
      .createNewStudentInClassroom(authService.getBearerHeader(), body)
      .then((res) => {
        console.log(res);
        setNewClassroomRoster(true);
        setNewStudentData(res.students);
        notification.success({
          message: 'Success',
          description:
            'You have successfully added a new student to your classroom. Please print a copy for your records.',
        });
        updateService();
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          message: 'Error',
          description:
            'There was a bad connection. The student was not created or added to the class.',
        });
      });
    setLoading(false);
  };

  return (
    <Modal
      open={open}
      onCancel={close}
      title={newClassroomRoster ? 'New Student Data' : 'Add New Student'}
      footer={null}
      closable
      destroyOnClose
    >
      <>
        {!newClassroomRoster && (
          <Form form={form} name="Create new student" onFinish={onFinish}>
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
                Create Student
              </StyledButton>
            </Form.Item>
          </Form>
        )}
        {newClassroomRoster && (
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
                key={student._id}
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
            <div style={{ textAlign: 'center' }}>
              You will not be able to return to this! Please print or write down
              somewhere!
            </div>
            <StyledButton larger="true" type="primary" onClick={close}>
              Close
            </StyledButton>
          </div>
        )}
      </>
    </Modal>
  );
};

export default NewStudentModal;
