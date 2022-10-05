/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Form, Input, Pagination, Radio, Modal, notification } from 'antd';
import { faker } from '@faker-js/faker';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { UserContext } from '../../../../../App';
import StyledButton from '../../../../../components/PrimaryButton';
import Avatar from '../../../../../components/Avatar';
import StyledRadioButton from './styles';
import theme from '../../../../../theme';

const EditCloseModal = ({ open, close, data }) => {
  const { avatarService, authService, classroomService, updateService } =
    useContext(UserContext);
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
    avatarService
      .getAvatarList(page, limit)
      .then((res) => {
        setAvatarList(res.data);
        setPagination({
          total: res.pagination.total,
          totalPages: res.pagination.totalPages,
          page: res.pagination.page,
          prevPage: res.pagination.prev ? res.pagination.prev.page : 10,
          nextPage: res.pagination.next ? res.pagination.next.page : 1,
        });
        // Notification
      })
      .catch((error) => {
        setAvatarList(error);
        throw error;
        // Notification
      });
  };

  const currentAvatar = () => {
    const underscore = data.username.search('_');
    const title = data.username
      .split('')
      .slice(underscore + 1, data.username.length - 3)
      .join('');
    setUserAvatar({
      avatarURL: data.avatarURL,
      avatarColor: data.avatarColor,
      username: data.username,
      title,
    });
  };

  const generateBgColor = () =>
    // eslint-disable-next-line no-bitwise
    `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`;

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
    avatarService.getRandomAdjective().then((res) => setUserAdjective(res));

  const selectUsernameNumbers = () => {
    const length =
      userAdjective && userAvatar.title
        ? userAdjective.length + userAvatar.title.length
        : 5;
    const numbers =
      length < 5 ? faker.random.numeric(8 - length) : faker.random.numeric(3);
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
    initialBackgroundColor();
    getAvatarList();
    currentAvatar();
    getRandomAdjective();
    selectUsernameNumbers();
  }, []);

  useEffect(() => {
    initialAvatarURL();
  }, [userAvatar]);

  useEffect(
    () => handleUsername(username),
    [userAdjective, userAvatar.title, userNumbers]
  );

  const deleteStudent = () => {
    classroomService
      .deleteStudent(
        authService.getBearerHeader(),
        data._id,
        data.classroomCode
      )
      .then((res) => {
        console.log(res);
        updateService();
        close();
      })
      .catch((error) => console.error(error));
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
      // onCancel() {
      //   console.log('Cancel');
      // },
    });
  };

  const onFinish = (values) => {
    const body = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(values)) {
      if (values[key]) {
        body[key] = values[key];
      }
    }
    if (!Object.keys(body).length) {
      notification.error({
        message: 'Empty!',
        description: 'You must change at least one.',
      });
    } else if (
      values.avatarURL === data.avatarURL &&
      values.avatarColor === data.avatarColor
    ) {
      notification.error({
        message: 'Error',
        description: 'Avatar must have a different color or animal',
      });
    } else {
      console.log(body);
      authService
        .updateStudentByAdult(data._id, body)
        .then((res) => {
          classroomService
            .updateStudentInClassroom(authService.getBearerHeader(), res)
            .then(() => {
              notification.success({
                message: 'Success',
                description: 'Student has been updated!',
              });
              updateService();
              close();
            })
            .catch(() =>
              notification.error({
                message: 'Error',
                description: 'Connection Error. The Class did not update.',
              })
            );
        })
        .catch(() =>
          notification.error({
            message: 'Error',
            description: 'Student was not updated.',
          })
        );
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
            <Radio.Group
              onChange={handleAvatarChange}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              {avatarList.map((avatarIcon) => (
                <StyledRadioButton
                  style={{
                    height: '100%',
                    margin: '1rem',
                  }}
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
            </Radio.Group>
          </Form.Item>
          <Form.Item noStyle>
            <Pagination
              total={pagination.total}
              simple
              pageSize={4}
              showSizeChanger={false}
              current={pagination.page}
              onChange={(page) => getAvatarList(page)}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
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
