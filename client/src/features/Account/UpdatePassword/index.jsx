/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Input, Button, Form, notification } from 'antd';
import { UserContext } from '../../../App';
import StyledButton from '../../../components/PrimaryButton';

const UpdatePassword = ({ closeDrawer }) => {
  const { authService } = useContext(UserContext);
  const [form] = Form.useForm();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;

  const onFinish = (values) => {
    console.log(values);
    const { currentPassword, newPassword } = values;
    if (currentPassword === newPassword) {
      notification.error({
        message: 'Same Password',
        description: 'Current and new password cannot be the same.',
      });
    } else {
      authService
        .updatePassword(currentPassword, newPassword)
        .then(() => {
          notification.success({
            message: 'Password Updated',
            description: 'Your password has been successfully updated.',
          });
          form.resetFields();
          closeDrawer();
        })
        .catch((error) => {
          notification.error({
            message: error.response.data.error,
            description: 'The current password is not correct.',
          });
        });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="updatePassword"
      onFinish={onFinish}
    >
      <Form.Item
        label="Confirm Current Password"
        name="currentPassword"
        rules={[
          {
            required: true,
            message: 'Please write your current password.',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item noStyle>
        <div>
          Password must be 8-20 characters, including: at least one capital
          letter, at least one small letter, one number and one special
          character - ! @ # $ % ^ & * ( ) _ +
        </div>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Please input your Password.',
            },
            {
              min: 8,
              message: 'Must be a minimum of 8 characters',
            },
            {
              pattern: passwordRegex,
              message:
                'Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * ( ) _ +',
            },
          ]}
        >
          <Input.Password type="password" />
        </Form.Item>
      </Form.Item>
      <Form.Item
        label="Confirm  New Password"
        name="confirm"
        dependencies={['newPassword']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your  new password.',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <StyledButton larger="true" type="primary" htmlType="submit">
          Submit Changes
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

export default UpdatePassword;
