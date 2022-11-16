import React, { useState, useCallback, useEffect } from 'react';
import { Form, Radio, Row, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import GreetingBar from '../../../components/GreetingBar';
import StyledButton from '../../../components/PrimaryButton';
import {
  ERROR,
  error,
  generateBgColor,
  SUCCESS,
  success,
} from '../../../common/constants';
import Notification from '../../../components/Notification';
import {
  StyledBoldedSpan,
  StyledCenteredFormItem,
  StyledCreateClassroomContainer,
  StyledRosterContainer,
  StyledRosterHeaderWrapper,
  StyledSpacing,
  StyledStudentCard,
  StyledStudentListContainer,
  StyledStudentListItems,
  StyledTitle,
} from './styles';
import StyledBasicDiv from '../../../components/BasicDiv';
import { useAuthServiceProvider } from '../../../providers/AuthServiceProvider';
import { useAvatarServiceProvider } from '../../../providers/AvatarServiceProvider';
import { useClassroomServiceProvider } from '../../../providers/ClassroomServiceProvider';

const CreateClass = () => {
  const { user, getBearerHeader, getAllForgotQuestions } =
    useAuthServiceProvider();
  const { getRandomAvatar: getOneRandomAvatar } = useAvatarServiceProvider();
  const { createClassroom: createNewClassroom } = useClassroomServiceProvider();
  const [classroomCode, setClassroomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [newClassId, setNewClassId] = useState({});
  const [newClassroomRoster, setNewClassroomRoster] = useState(false);
  const [newStudentData, setNewStudentData] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

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

  const goToClassDetails = () =>
    navigate(`/classrooms/teacher/details/${newClassId}`);

  const createStudentsInfo = async (students, chosenClassroomCode) => {
    const studentListWithInfo = [];
    for (const student of students) {
      const forgotPasswordSet = await getRandomForgotPasswordSet();
      const randomAdjective = getRandomAdjective();
      const randomAvatar = await getRandomAvatar();
      const randomNumbers = selectUsernameNumbers();
      studentListWithInfo.push({
        firstName: student.firstName,
        lastInitial: student.lastInitial,
        forgotPasswordQuestion: forgotPasswordSet.forgotPasswordQuestion,
        forgotPasswordAnswer: forgotPasswordSet.forgotPasswordAnswer,
        classroomCode: chosenClassroomCode,
        username: `${randomAdjective}_${randomAvatar.title}${randomNumbers}`,
        avatarURL: randomAvatar.avatarURL,
        avatarColor: generateBgColor(),
        password: newPassword(),
        score: 0,
      });
    }
    return studentListWithInfo;
  };

  const createClassroom = (body) => {
    setLoading(true);
    createNewClassroom(getBearerHeader(), body)
      .then((res) => {
        setNewClassId(res.id);
        setNewStudentData(res.students);
        setNewClassroomRoster(true);
        Notification(
          success,
          SUCCESS,
          'Class Created! Please print the cards below to hand out to the students to sign in.'
        );
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'There was a connection error. Please try again later'
        )
      )
      .finally(() => setLoading(false));
  };

  const onFinish = async (values) => {
    let students = [];
    if (values.students) {
      students = await createStudentsInfo(
        values.students,
        values.classroomCode
      );
    }
    const body = {
      classroomCode: values.classroomCode,
      gradeLevel: values.gradeLevel,
      students,
      adult: user.id,
    };
    createClassroom(body);
  };

  return (
    <StyledCreateClassroomContainer>
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
                  <StyledSpacing key={key} align="baseline">
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
                  </StyledSpacing>
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
              Create Class
            </StyledButton>
          </StyledCenteredFormItem>
        </Form>
      )}
      {newClassroomRoster && (
        <StyledRosterContainer>
          <StyledRosterHeaderWrapper>
            <StyledTitle>Class Roster</StyledTitle>
            <StyledButton type="primary" onClick={goToClassDetails}>
              Go to Class Details
            </StyledButton>
          </StyledRosterHeaderWrapper>
          <StyledStudentListContainer>
            {newStudentData.map((student) => (
              <StyledStudentCard key={student._id}>
                <StyledStudentListItems>
                  <StyledBasicDiv>
                    <StyledBoldedSpan>First Name:</StyledBoldedSpan>{' '}
                    {student.firstName}
                  </StyledBasicDiv>
                  <StyledBasicDiv>
                    <StyledBoldedSpan>Last Initial:</StyledBoldedSpan>{' '}
                    {student.lastInitial}
                  </StyledBasicDiv>
                </StyledStudentListItems>
                <StyledStudentListItems>
                  <StyledBasicDiv>
                    <StyledBoldedSpan>Username:</StyledBoldedSpan>{' '}
                    {student.username}
                  </StyledBasicDiv>
                  <StyledBasicDiv>
                    <StyledBoldedSpan>Password:</StyledBoldedSpan>{' '}
                    {student.password}
                  </StyledBasicDiv>
                </StyledStudentListItems>
                <StyledStudentListItems>
                  <StyledBasicDiv>
                    <StyledBoldedSpan>
                      Forgot Password Question:
                    </StyledBoldedSpan>{' '}
                    {student.forgotPasswordQuestion}
                  </StyledBasicDiv>
                  <StyledBasicDiv>
                    <StyledBoldedSpan>Forgot Password Answer:</StyledBoldedSpan>{' '}
                    {student.forgotPasswordAnswer}
                  </StyledBasicDiv>
                </StyledStudentListItems>
              </StyledStudentCard>
            ))}
          </StyledStudentListContainer>
        </StyledRosterContainer>
      )}
    </StyledCreateClassroomContainer>
  );
};

export default CreateClass;
