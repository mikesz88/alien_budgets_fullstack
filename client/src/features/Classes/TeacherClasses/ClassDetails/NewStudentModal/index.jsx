import React, { useState, useCallback } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { faker } from '@faker-js/faker';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import StyledButton from '../../../../../components/PrimaryButton';
import {
  ERROR,
  error,
  generateBgColor,
  SUCCESS,
  success,
} from '../../../../../common/constants';
import Notification from '../../../../../components/Notification';
import {
  StyledDiv,
  StyledNewClassRosterWrapper,
  StyledSpace,
  StyledSpan,
  StyledStudentCardColumn,
  StyledStudentCardContainer,
} from './styles';
import StyledCenteredFormItem from '../../../../../components/CenteredFormItem';
import StyledBasicDiv from '../../../../../components/BasicDiv';
import { useAuthServiceProvider } from '../../../../../services/AuthServiceProvider';
import { useAvatarServiceProvider } from '../../../../../services/AvatarServiceProvider';
import { useClassroomServiceProvider } from '../../../../../services/ClassroomServiceProvider';

const NewStudentModal = ({ open, close, classId, classroomCode }) => {
  const [loading, setLoading] = useState(false);
  const [newClassroomRoster, setNewClassroomRoster] = useState(false);
  const [newStudentData, setNewStudentData] = useState([]);
  const { getAllForgotQuestions, getBearerHeader } = useAuthServiceProvider();
  const { getRandomAvatar: getOneRandomAvatar } = useAvatarServiceProvider();
  const { createNewStudentInClassroom } = useClassroomServiceProvider();
  const [form] = Form.useForm();

  const newPassword = useCallback(
    () => faker.internet.password(8, false, /[a-zA-Z0-9-#$^+_!*()@%&]/),
    []
  );

  const getRandomAdjective = useCallback(() => faker.word.adjective(), []);

  const getRandomAvatar = useCallback(async () => getOneRandomAvatar(), []);

  const selectUsernameNumbers = useCallback(() => {
    const numbers = faker.random.numeric(3);
    if (numbers === 666) {
      selectUsernameNumbers();
    }
    return numbers;
  }, []);

  const getRandomForgotPasswordSet = useCallback(async () => {
    const forgotQuestionList = await getAllForgotQuestions();
    const chosenQuestion = faker.helpers.arrayElement(forgotQuestionList);
    return {
      forgotPasswordQuestion: chosenQuestion.question,
      forgotPasswordAnswer: faker.word.adjective(),
    };
  }, []);

  const createNewStudents = (body) => {
    createNewStudentInClassroom(getBearerHeader(), body)
      .then((res) => {
        setNewClassroomRoster(true);
        setNewStudentData(res.students);
        Notification(
          success,
          SUCCESS,
          'You have successfully added a new student to your classroom. Please print a copy for your records.'
        );
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'There was a bad connection. The student was not created or added to the class.'
        )
      )
      .finally(() => setLoading(false));
  };

  const onFinish = async (values) => {
    setLoading(true);
    const body = {
      classId,
    };
    if (values.students) {
      const studentListWithInfo = [];
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
    createNewStudents(body);
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
                    <StyledSpace key={key} align="baseline">
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
                    </StyledSpace>
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
            <StyledCenteredFormItem register="true">
              <StyledButton
                loading={loading}
                larger="true"
                type="primary"
                htmlType="submit"
              >
                Create Student
              </StyledButton>
            </StyledCenteredFormItem>
          </Form>
        )}
        {newClassroomRoster && (
          <StyledNewClassRosterWrapper>
            {newStudentData.map((student) => (
              <StyledStudentCardContainer key={student._id}>
                <StyledStudentCardColumn>
                  <StyledBasicDiv>
                    <StyledSpan>First Name:</StyledSpan> {student.firstName}
                  </StyledBasicDiv>
                  <StyledBasicDiv>
                    <StyledSpan>Last Initial:</StyledSpan> {student.lastInitial}
                  </StyledBasicDiv>
                </StyledStudentCardColumn>
                <StyledStudentCardColumn>
                  <StyledBasicDiv>
                    <StyledSpan>Username:</StyledSpan> {student.username}
                  </StyledBasicDiv>
                  <StyledBasicDiv>
                    <StyledSpan>Password:</StyledSpan> {student.password}
                  </StyledBasicDiv>
                </StyledStudentCardColumn>
                <StyledStudentCardColumn>
                  <StyledBasicDiv>
                    <StyledSpan>Forgot Password Question:</StyledSpan>{' '}
                    {student.forgotPasswordQuestion}
                  </StyledBasicDiv>
                  <StyledBasicDiv>
                    <StyledSpan>Forgot Password Answer:</StyledSpan>{' '}
                    {student.forgotPasswordAnswer}
                  </StyledBasicDiv>
                </StyledStudentCardColumn>
              </StyledStudentCardContainer>
            ))}
            <StyledDiv>
              You will not be able to return to this! Please print or write down
              somewhere!
            </StyledDiv>
            <StyledButton larger="true" type="primary" onClick={close}>
              Close
            </StyledButton>
          </StyledNewClassRosterWrapper>
        )}
      </>
    </Modal>
  );
};

export default NewStudentModal;
