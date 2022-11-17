import React, { useState, useEffect, useMemo } from 'react';
import { Form, Spin } from 'antd';
import { faker } from '@faker-js/faker';
import Avatar from '../../../components/Avatar';
import StyledBasicSpan from './styles';
import StyledPagination from '../../../components/Pagination';
import StyledRadioGroup from '../../../components/RadioGroup';
import StyledRadioButton from '../../../components/RadioButton';
import StyledButton from '../../../components/PrimaryButton';
import theme from '../../../theme';
import Notification from '../../../components/Notification';
import {
  ERROR,
  error,
  SUCCESS,
  success,
  generateBgColor,
} from '../../../common/constants';
import StyledBasicDiv from '../../../components/BasicDiv';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';
import { useAvatarServiceProvider } from '../../../services/AvatarServiceProvider';

const ChangeAvatar = ({ closeDrawer }) => {
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const {
    getAvatarList: getListOfAvatars,
    getRandomAdjective: getOneRandomAdjective,
  } = useAvatarServiceProvider();
  const { user, updateAvatar } = useAuthServiceProvider();
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
    setAvatarLoading(true);
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
      })
      .catch((err) => {
        setAvatarList([]);
        Notification(error, ERROR, err.response.data.error);
      })
      .finally(() => setAvatarLoading(false));
  };

  const currentAvatar = () => {
    const underscore = user.username.search('_');
    const title = user.username
      .split('')
      .slice(underscore + 1, user.username.length - 3)
      .join('');
    setUserAvatar({
      avatarURL: user.avatarURL,
      avatarColor: user.avatarColor,
      username: user.username,
      title,
    });
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

  const initialBackgroundColor = () => handleBgColorChange(user.avatarColor);

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
    setLoading(true);
    if (
      values.avatarURL === user.avatarURL &&
      values.avatarColor === user.avatarColor
    ) {
      Notification(
        error,
        ERROR,
        'Avatar must have a different color or animal'
      );
    } else {
      updateAvatar(values)
        .then(() => {
          Notification(success, SUCCESS, 'Avatar has been updated!');
          form.resetFields();
          closeDrawer();
        })
        .catch((err) => {
          Notification(error, ERROR, err.response.data.error);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <StyledBasicDiv>Current Avatar</StyledBasicDiv>
      <Form.Item noStyle>
        <Avatar
          avatar={{
            avatarName: user.avatarURL,
            avatarColor: user.avatarColor,
          }}
          size="large"
        />
      </Form.Item>
      <StyledBasicDiv>Updated Avatar</StyledBasicDiv>
      <StyledBasicDiv>Choose Animal</StyledBasicDiv>
      <Form.Item name="avatarURL">
        <StyledRadioGroup onChange={handleAvatarChange}>
          <Spin spinning={avatarLoading}>
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
      {user.role === 'student' && (
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
            <StyledBasicSpan>{username}</StyledBasicSpan>
          </Form.Item>
        </Form.Item>
      )}
      <Form.Item>
        <StyledButton
          loading={loading}
          larger="true"
          type="primary"
          htmlType="submit"
        >
          Save Changes
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

export default ChangeAvatar;
