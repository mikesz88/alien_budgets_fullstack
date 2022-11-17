import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Spin } from 'antd';
import { faker } from '@faker-js/faker';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import StyledButton from '../../../../../components/PrimaryButton';
import Avatar from '../../../../../components/Avatar';
import StyledRadioButton from '../../../../../components/RadioButton';
import theme from '../../../../../theme';
import {
  ERROR,
  error,
  generateBgColor,
  SUCCESS,
  success,
} from '../../../../../common/constants';
import Notification from '../../../../../components/Notification';
import StyledPagination from '../../../../../components/Pagination';
import StyledRadioGroup from '../../../../../components/RadioGroup';
import { useAuthServiceProvider } from '../../../../../services/AuthServiceProvider';
import { useAvatarServiceProvider } from '../../../../../services/AvatarServiceProvider';
import { useClassroomServiceProvider } from '../../../../../services/ClassroomServiceProvider';

const EditCloseModal = ({ open, close, data }) => {
  const { getBearerHeader, updateStudentByAdult } = useAuthServiceProvider();
  const {
    getAvatarList: getListOfAvatars,
    getRandomAdjective: getOneRandomAdjective,
  } = useAvatarServiceProvider();
  const { deleteStudent: deleteThisStudent, updateStudentInClassroom } =
    useClassroomServiceProvider();
  const [loading, setLoading] = useState(false);
  const [avatarList, setAvatarList] = useState([]);
  const [userAvatar, setUserAvatar] = useState({});
  const [userAdjective, setUserAdjective] = useState('');
  const [userNumbers, setUserNumbers] = useState();
  const [userBackgroundColor, setUserBackgroundColor] = useState('');
  const [pagination, setPagination] = useState({
    total: '',
    totalPages: '',
    page: '',
    prevPage: '',
    nextPage: '',
  });
  const [form] = Form.useForm();

  const getAvatarList = (page, limit = 4) => {
    setLoading(true);
    getListOfAvatars(page, limit)
      .then((res) => {
        setAvatarList(res.data);
        setPagination({
          total: res.pagination.total,
          totalPages: res.pagination.totalPages,
          page: res.pagination.page,
          prevPage: res.pagination.prev ? res.pagination.prev.page : 10,
          nextPage: res.pagination.next ? res.pagination.next.page : 1,
        });
        Notification(success, SUCCESS, 'List of avatars found.');
      })
      .catch(() =>
        Notification(error, ERROR, 'Connection Error. Please refresh.')
      )
      .finally(() => setLoading(false));
  };

  const currentAvatar = () => {
    const underscore = data.username.search('_');
    const title = data.username
      .split('')
      .slice(underscore + 1, data.username.length - 3)
      .join('');
    const adjective = data.username.slice(0, underscore);
    const numbers = data.username.slice(data.username.length - 3);
    setUserAvatar({
      avatarURL: data.avatarURL,
      avatarColor: data.avatarColor,
      username: data.username,
      title,
    });
    setUserAdjective(adjective);
    setUserNumbers(numbers);
    return true;
  };

  const handleBgColorChange = (value) => {
    form.setFieldsValue({
      avatarColor: value,
    });
    setUserBackgroundColor(value);
  };

  const handleAvatarURL = () => {
    form.setFieldsValue({
      avatarURL: userAvatar.avatarURL,
    });
  };

  const handleAvatarChange = ({ target: { value } }) => {
    form.setFieldsValue({
      avatarURL: value.avatarURL,
    });
    setUserAvatar(value);
  };

  const initialBackgroundColor = () => handleBgColorChange(data.avatarColor);

  const initialAvatarURL = () => handleAvatarURL();

  const handleUsername = (value) => {
    form.setFieldsValue({
      username: value,
    });
  };

  const getRandomAdjective = () =>
    getOneRandomAdjective().then((res) => setUserAdjective(res));

  const selectUsernameNumbers = () => {
    const numbers = faker.random.numeric(3);
    if (numbers === 666) {
      selectUsernameNumbers();
    } else {
      setUserNumbers(numbers);
    }
  };

  const username = useMemo(
    () => `${userAdjective}_${userAvatar.title}${userNumbers}`,
    [userAdjective, userAvatar.title, userNumbers]
  );

  useEffect(() => {
    if (!currentAvatar()) {
      getRandomAdjective();
      selectUsernameNumbers();
    }
    initialBackgroundColor();
    getAvatarList();
  }, []);

  useEffect(() => {
    initialAvatarURL();
  }, [userAvatar]);

  useEffect(
    () => handleUsername(username),
    [userAdjective, userAvatar.title, userNumbers]
  );

  const deleteStudent = () => {
    deleteThisStudent(getBearerHeader(), data._id, data.classroomCode)
      .then(() => {
        Notification(success, SUCCESS, 'Student Deleted.');
        close();
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'Connection Error. Student was not deleted. Please try again.'
        )
      );
  };

  const confirm = () => {
    Modal.confirm({
      title: 'Delete Student',
      icon: <ExclamationCircleOutlined />,
      content: `Deleting the student will remove the student from the class and delete their account.
      Are you sure you want to delete this student?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        deleteStudent();
      },
      closable: true,
      destroyOnClose: true,
      maskClosable: true,
    });
  };

  const updateStudent = (body) => {
    updateStudentByAdult(data._id, body)
      .then((res) => {
        updateStudentInClassroom(getBearerHeader(), res)
          .then(() => {
            Notification(success, SUCCESS, 'Student has been updated!');
            close();
          })
          .catch(() =>
            Notification(
              error,
              ERROR,
              'Connection Error. Student was not updated in the class. Please try again.'
            )
          );
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'Connection Error. Student was not updated. Please try again.'
        )
      );
  };

  const onFinish = (values) => {
    const body = {};
    for (const key of Object.keys(values)) {
      if (values[key]) {
        body[key] = values[key];
      }
    }
    if (
      (data.firstName === values.firstName || !values.firstName) &&
      (data.lastInitial === values.lastInitial || !values.lastInitial) &&
      data.username === values.username &&
      data.avatarColor === values.avatarColor &&
      data.avatarURL === values.avatarURL
    ) {
      Notification(error, 'EMPTY!', 'You must change at least one.');
    } else {
      updateStudent(body);
    }
  };

  return (
    <Modal
      width={700}
      open={open}
      title="Edit Student"
      onCancel={close}
      destroyOnClose
      footer={null}
    >
      <>
        <Form form={form} onFinish={onFinish}>
          <div>First Name: {data.firstName}</div>
          <div>Last Initial: {data.lastInitial}</div>
          <div>Update name</div>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              () => ({
                validator(_, value) {
                  if (value !== data.firstName) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('It cannot be the same name as before.')
                  );
                },
              }),
              {
                pattern: /[a-zA-Z]{3,}/gm,
                message: 'Must be minimum 3 letters.',
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Last Initial"
            name="lastInitial"
            rules={[
              () => ({
                validator(_, value) {
                  if (value !== data.lastInitial) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('It cannot be the same name as before.')
                  );
                },
              }),
              {
                pattern: /^[a-zA-Z]{1}$/gm,
                message: 'Please only write one letter.',
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <div>Current Avatar</div>
          <Form.Item noStyle>
            <Avatar
              avatar={{
                avatarName: data.avatarURL,
                avatarColor: data.avatarColor,
              }}
              size="large"
            />
          </Form.Item>
          <div>Updated Avatar</div>
          <div>Choose Animal</div>
          <Form.Item name="avatarURL">
            <StyledRadioGroup onChange={handleAvatarChange}>
              <Spin spinning={loading}>
                {avatarList.map((avatarIcon) => (
                  <StyledRadioButton
                    key={avatarIcon.avatarURL}
                    value={avatarIcon}
                    onClick={() => setUserAvatar(avatarIcon)}
                  >
                    <Avatar
                      key={avatarIcon.avatarURL}
                      avatar={{
                        avatarName: avatarIcon.avatarURL,
                        avatarColor: theme.colors.lightGrey,
                      }}
                      size="large"
                    />
                  </StyledRadioButton>
                ))}
              </Spin>
            </StyledRadioGroup>
          </Form.Item>
          <Form.Item noStyle>
            <StyledPagination
              total={pagination.total}
              simple
              pageSize={4}
              showSizeChanger={false}
              current={pagination.page}
              onChange={(page) => getAvatarList(page)}
            />
          </Form.Item>
          <Form.Item
            name="avatarColor"
            rules={[
              {
                required: true,
                message: 'Please select a color!',
              },
            ]}
          >
            <StyledButton
              onClick={() => handleBgColorChange(generateBgColor())}
              type="primary"
            >
              Choose Random Background Color
            </StyledButton>
          </Form.Item>
          <Form.Item noStyle>
            <Avatar
              avatar={{
                avatarName: userAvatar.avatarURL,
                avatarColor: userBackgroundColor,
              }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              {
                type: 'text',
                required: true,
                message: 'Please input your username.',
              },
              {
                pattern: /[a-zA-Z]{3,}/gm,
                required: true,
                message: 'Must be minimum 3 letters.',
              },
            ]}
          >
            <Form.Item noStyle>
              <StyledButton
                onClick={getRandomAdjective}
                type="primary"
                placeholder="Username"
              >
                Choose Adjective
              </StyledButton>
              <StyledButton
                onClick={selectUsernameNumbers}
                type="primary"
                placeholder="Username"
              >
                Choose Random Numbers
              </StyledButton>
              <span>{username}</span>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <StyledButton larger="true" type="primary" htmlType="submit">
              Save Changes
            </StyledButton>
          </Form.Item>
        </Form>
        <StyledButton larger="true" type="primary" onClick={confirm}>
          Delete Student
        </StyledButton>
      </>
    </Modal>
  );
};

export default EditCloseModal;
