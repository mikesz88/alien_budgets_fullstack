import React, { useState } from 'react';
import { Input, Form } from 'antd';
import StyledButton from '../../../components/PrimaryButton';
import StyledBasicDiv from '../../../components/BasicDiv';
import Notification from '../../../components/Notification';
import { error, passwordRegex, success } from '../../../common/constants';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';

const UpdatePassword = ({ closeDrawer }) => {
  const [loading, setLoading] = useState(false);
  const { updatePassword } = useAuthServiceProvider();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    const { currentPassword, newPassword } = values;
    if (currentPassword === newPassword) {
      Notification(
        error,
        'Same Password',
        'Current and new password cannot be the same'
      );
    } else {
      updatePassword(currentPassword, newPassword)
        .then(() => {
          Notification(
            success,
            'Password Updated',
            'Your password has been successfully updated.'
          );
          form.resetFields();
          closeDrawer();
        })
        .catch((err) => {
          Notification(
            error,
            err.response.data.error,
            'The current password is not correct.'
          );
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      <h1>Update Password</h1>
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
          <StyledBasicDiv>
            Password must be 8-20 characters, including: at least one capital
            letter, at least one small letter, one number and one special
            character - ! @ # $ % ^ & * ( ) _ +
          </StyledBasicDiv>
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
          <StyledButton
            loading={loading}
            larger="true"
            type="primary"
            htmlType="submit"
          >
            Submit Changes
          </StyledButton>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdatePassword;
