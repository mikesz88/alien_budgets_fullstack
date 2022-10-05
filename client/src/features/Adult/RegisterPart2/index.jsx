import React, { useState, useContext, useEffect } from 'react';
import {
  Form,
  Pagination,
  Radio,
  Modal,
  notification,
  Checkbox,
  Row,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import Avatar from '../../../components/Avatar';
import StyledRadioButton from './styles';
import StyledButton from '../../../components/PrimaryButton';
import theme from '../../../theme';
import StyledTitle from '../../../components/Title';

const RegisterAdultPart2 = () => {
  const { avatarService, authService, updateService } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [avatarList, setAvatarList] = useState([]);
  const [avatarURL, setAvatarURL] = useState('');
  const [userBackgroundColor, setUserBackgroundColor] = useState('');
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
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

  const getRandomAvatar = () => {
    avatarService
      .getRandomAvatar()
      .then((res) => {
        setAvatarURL(res.avatarURL);
      })
      .catch(() => {
        notification.error({
          message: 'error',
          description: 'Bad connection. Try again later',
        });
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
      avatarURL,
    });
  };

  const handleAvatarChange = ({ target: { value } }) => {
    form.setFieldsValue({
      avatarURL: value.avatarURL,
    });
    setAvatarURL(value);
  };

  const initialBackgroundColor = () => handleBgColorChange(generateBgColor());
  const initialAvatarURL = () => handleAvatarURL();

  useEffect(() => {
    initialBackgroundColor();
    getAvatarList();
    getRandomAvatar();
  }, []);

  useEffect(() => {
    initialAvatarURL();
  }, [avatarURL]);

  const onFinish = (values) => {
    setLoading(true);
    authService
      .registerAdult(values)
      .then(() => {
        navigate('/dashboard');
        notification.success({
          message: 'Sign Up Successful',
          description: 'You are now currently logged in.',
        });
        updateService();
      })
      .catch(() =>
        notification.error({
          message: 'Error',
          description: 'Please try again!',
        })
      )
      .finally(() => setLoading(false));
  };

  return (
    <>
      <StyledTitle>NEW ADULT</StyledTitle>
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
            <StyledButton onClick={openModal} type="primary">
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
                avatarName: avatarURL,
                avatarColor: userBackgroundColor,
              }}
              size="large"
            />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
            <Checkbox.Group>
              <Row>
                <Checkbox value="4th">4th</Checkbox>
                <Checkbox value="5th">5th</Checkbox>
                <Checkbox value="6th">6th</Checkbox>
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </div>
        <Form.Item register="true" style={{ textAlign: 'center' }}>
          <div>By signing up you agree to our terms and policies.</div>
          <StyledButton
            loading={loading}
            larger="true"
            type="primary"
            htmlType="submit"
          >
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
                    value={avatarIcon.avatarURL}
                    onClick={() => setAvatarURL(avatarIcon.avatarURL)}
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

export default RegisterAdultPart2;
