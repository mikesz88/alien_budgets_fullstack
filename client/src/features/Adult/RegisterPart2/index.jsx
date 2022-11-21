import React, { useState, useEffect } from 'react';
import { Form, Modal, Checkbox, Row, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../../components/Avatar';
import {
  StyledDivWrapper,
  StyledGradeLevelContainer,
  StyledRegisterPart2Container,
  StyledCenteredFormItem,
} from './styles';
import StyledPagination from '../../../components/Pagination';
import StyledRadioGroup from '../../../components/RadioGroup';
import StyledRadioButton from '../../../components/RadioButton';
import StyledButton from '../../../components/PrimaryButton';
import theme from '../../../theme';
import StyledTitle from '../../../components/Title';
import Notification from '../../../components/Notification';
import {
  ERROR,
  error,
  generateBgColor,
  SUCCESS,
  success,
} from '../../../common/constants';
import StyledBasicDiv from '../../../components/BasicDiv';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';
import { useAvatarServiceProvider } from '../../../services/AvatarServiceProvider';
import AlienImages from '../../../components/AlienImages';

const RegisterAdultPart2 = () => {
  const { registerAdult } = useAuthServiceProvider();
  const {
    getAvatarList: getListOfAvatars,
    getRandomAvatar: getOneRandomAvatar,
  } = useAvatarServiceProvider();
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
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
    setAvatarLoading(true);
    getListOfAvatars(page)
      .then((res) => {
        setAvatarList(res.data);
        setPagination({
          total: res.pagination.total,
          totalPages: res.pagination.totalPages,
          page: res.pagination.page,
          prevPage: res.pagination.prev ? res.pagination.prev.page : 10,
          nextPage: res.pagination.next ? res.pagination.next.page : 1,
        });
        Notification(success, SUCCESS, 'Avatars Loaded.');
      })
      .catch(() => {
        Notification(error, ERROR, 'Avatars Failed to have Load.');
      })
      .finally(() => setAvatarLoading(false));
  };

  const getRandomAvatar = () => {
    getOneRandomAvatar()
      .then((res) => {
        setAvatarURL(res.avatarURL);
        Notification(success, SUCCESS, 'Selected a Random Avatar.');
      })
      .catch(() => {
        Notification(error, ERROR, 'Bad connection. Try again later.');
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
    registerAdult(values)
      .then(() => {
        navigate('/dashboard');
        Notification(success, 'Sign Up Successful', 'You are now logged in!');
      })
      .catch(() =>
        Notification(error, ERROR, 'There was an error. Please try again!')
      )
      .finally(() => setLoading(false));
  };

  return (
    <StyledDivWrapper>
      <AlienImages />
      <StyledTitle>NEW ADULT</StyledTitle>
      <Form form={form} id={form} onFinish={onFinish}>
        <StyledRegisterPart2Container>
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
        </StyledRegisterPart2Container>
        <StyledGradeLevelContainer
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
        </StyledGradeLevelContainer>
        <StyledCenteredFormItem register="true">
          <StyledBasicDiv>
            By signing up you agree to our terms and policies.
          </StyledBasicDiv>
          <StyledButton
            loading={loading}
            larger="true"
            type="primary"
            htmlType="submit"
          >
            Register
          </StyledButton>
        </StyledCenteredFormItem>
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
              <Spin spinning={avatarLoading}>
                <StyledRadioGroup onChange={handleAvatarChange}>
                  {avatarList.map((avatarIcon) => (
                    <StyledRadioButton
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
                </StyledRadioGroup>
              </Spin>
              <StyledPagination
                total={pagination.total}
                simple
                pageSize={10}
                showSizeChanger={false}
                current={pagination.page}
                onChange={(page) => getAvatarList(page)}
              />
            </Modal>
          </Form.Item>
        </Form.Item>
      </Form>
    </StyledDivWrapper>
  );
};

export default RegisterAdultPart2;
