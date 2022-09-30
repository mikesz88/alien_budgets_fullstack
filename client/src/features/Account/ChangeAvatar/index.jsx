/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Form, Pagination, Radio, notification } from 'antd';
import { faker } from '@faker-js/faker';
import { UserContext } from '../../../App';
import Avatar from '../../../components/Avatar';
import StyledRadioButton from './styles';
import StyledButton from '../../../components/PrimaryButton';
import theme from '../../../theme';

const ChangeAvatar = ({ closeDrawer }) => {
  const { avatarService, authService, updateService } = useContext(UserContext);
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
    const underscore = authService.username.search('_');
    const title = authService.username
      .split('')
      .slice(underscore + 1, authService.username.length - 3)
      .join('');
    setUserAvatar({
      avatarURL: authService.avatarURL,
      avatarColor: authService.avatarColor,
      username: authService.username,
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

  const initialBackgroundColor = () =>
    handleBgColorChange(authService.avatarColor);

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

  const onFinish = (values) => {
    console.log(values);
    if (
      values.avatarURL === authService.avatarURL &&
      values.avatarColor === authService.avatarColor
    ) {
      notification.error({
        message: 'Error',
        description: 'Avatar must have a different color or animal',
      });
    } else {
      authService
        .updateAvatar(values)
        .then((res) => {
          console.log(res);
          notification.success({
            message: 'Success',
            description: 'Avatar has been updated!',
          });
          form.resetFields();
          updateService();
          closeDrawer();
        })
        .catch((error) => {
          console.log(error);
          notification.error({
            message: 'Error',
            description: 'Please try again later!',
          });
        });
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <div>Current Avatar</div>
      <Form.Item noStyle>
        <Avatar
          avatar={{
            avatarName: authService.avatarURL,
            avatarColor: authService.avatarColor,
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
      {authService.role === 'student' && (
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
      )}
      <Form.Item>
        <StyledButton larger="true" type="primary" htmlType="submit">
          Save Changes
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

export default ChangeAvatar;
