/* eslint-disable import/no-cycle */
import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Form, Input, Pagination, Radio, Modal, notification } from 'antd';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import Avatar from '../../../components/Avatar';
import StyledRadioButton from './styles';
import StyledButton from '../../../components/PrimaryButton';
import theme from '../../../theme';
import StyledTitle from '../../../components/Title';

const RegisterStudentPart2 = () => {
  const { avatarService, authService, updateService } = useContext(UserContext);
  const [avatarList, setAvatarList] = useState([]);
  const [userAvatar, setUserAvatar] = useState({});
  const [userAdjective, setUserAdjective] = useState('');
  const [userBackgroundColor, setUserBackgroundColor] = useState('');
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [userNumbers, setUserNumbers] = useState();
  const [pagination, setPagination] = useState({
    total: '',
    totalPages: '',
    page: '',
    prevPage: '',
    nextPage: '',
  });
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const openModal = () => setOpenAvatarModal(true);
  const closeModal = () => setOpenAvatarModal(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;

  const getAvatarList = (page) => {
    avatarService
      .getAvatarList(page)
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

  const getRandomAdjective = () =>
    avatarService.getRandomAdjective().then((res) => setUserAdjective(res));

  const getRandomAvatar = () => {
    avatarService
      .getRandomAvatar()
      .then((res) => {
        setUserAvatar(res);
      })
      .catch((error) => {
        setUserAvatar(error);
        throw error;
      });
  };

  const generateBgColor = () =>
    // eslint-disable-next-line no-bitwise
    `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`;

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

  const handleUsername = (value) => {
    form.setFieldsValue({
      username: value,
    });
  };

  const handleBgColorChange = (value) => {
    setUserBackgroundColor(value);
    form.setFieldsValue({
      avatarColor: value,
    });
  };

  const handleAvatarURL = () => {
    form.setFieldsValue({
      avatarURL: userAvatar.avatarURL,
    });
  };

  const username = useMemo(
    () => `${userAdjective}_${userAvatar.title}${userNumbers}`,
    [userAdjective, userAvatar.title, userNumbers]
  );

  const initialBackgroundColor = () => handleBgColorChange(generateBgColor());
  const initialUsername = () => handleUsername(username);
  const initialAvatarURL = () => handleAvatarURL();

  useEffect(() => {
    initialBackgroundColor();
    getAvatarList();
    getRandomAdjective();
    getRandomAvatar();
    selectUsernameNumbers();
  }, []);

  useEffect(
    () => initialUsername(),
    [userAdjective, userAvatar.title, userNumbers]
  );

  const handleAvatarChange = ({ target: { value } }) => {
    form.setFieldsValue({
      avatarURL: value.avatarURL,
    });
    setUserAvatar(value);
  };

  useEffect(() => {
    initialAvatarURL();
  }, [userAvatar]);

  const onFinish = (values) => {
    authService
      .registerStudent(values)
      .then(() => {
        navigate('/aliendashboard');
        notification.success({
          message: 'Sign Up Successful',
          description: 'You are now currently logged in.',
        });
        form.resetFields();
        updateService();
      })
      .catch(() => {
        notification.error({
          message: 'error',
          description: 'You made a mistake',
        });
      });
  };

  return (
    <>
      <StyledTitle>NEW ALIEN</StyledTitle>
      <Form form={form} id={form} onFinish={onFinish}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Form.Item noStyle>
            <StyledButton
              onClick={openModal}
              type="primary"
              placeholder="Select Avatar"
            >
              Choose Avatar
            </StyledButton>
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
        </div>
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
        <Form.Item noStyle>
          <div>
            Password must be 8-20 characters, including: at least one capital
            letter, at least one small letter, one number and one special
            character - ! @ # $ % ^ & * ( ) _ +
          </div>
          <Form.Item
            name="password"
            hasFeedback
            register="true"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
              {
                min: 8,
                required: true,
                message: 'Must be a minimum of 8 characters',
              },
              {
                max: 20,
                required: true,
                message: 'Must be a maximum of 20 characters',
              },
              {
                pattern: passwordRegex,
                required: true,
                message:
                  'Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * ( ) _ +',
              },
            ]}
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          register="true"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password type="password" placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item register="true" style={{ textAlign: 'center' }}>
          <div>By signing up you agree to our terms and policies.</div>
          <StyledButton larger="true" type="primary" htmlType="submit">
            Register
          </StyledButton>
        </Form.Item>
        <Form.Item name="avatarURL">
          <Form.Item noStyle>
            <Modal
              open={openAvatarModal}
              width={1000}
              closable
              destroyOnClose
              onCancel={closeModal}
              footer={null}
            >
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
              <Pagination
                total={pagination.total}
                simple
                pageSize={10}
                showSizeChanger={false}
                current={pagination.page}
                onChange={(page) => getAvatarList(page)}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </Modal>
          </Form.Item>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterStudentPart2;
