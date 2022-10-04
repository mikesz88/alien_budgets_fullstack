/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useCallback } from 'react';
import { Form, Modal, Space, Input, Button, notification } from 'antd';
import { faker } from '@faker-js/faker';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import StyledButton from '../../../../../components/PrimaryButton';

import { UserContext } from '../../../../../App';

const NewStudentModal = ({ open, close, classId, classroomCode }) => {
  const [loading, setLoading] = useState(false);
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
      title="Add New Student"
      footer={null}
      closable
      destroyOnClose
    >
      <>
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
              Create Class
            </StyledButton>
          </Form.Item>
        </Form>
        <div>
          I need to add the card of information about the new student here!
        </div>
      </>
    </Modal>
  );
};

export default NewStudentModal;
