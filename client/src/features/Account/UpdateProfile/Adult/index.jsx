import React, { useState } from 'react';
import { Form, Input, Checkbox, Row } from 'antd';
import StyledButton from '../../../../components/PrimaryButton';
import Notification from '../../../../components/Notification';
import { ERROR, error, SUCCESS, success } from '../../../../common/constants';
import { useAuthServiceProvider } from '../../../../providers/AuthServiceProvider';

const UpdateAdultProfile = ({ closeDrawer }) => {
  const { user, updateAdultProfile } = useAuthServiceProvider();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    const body = {};
    for (const key of Object.keys(values)) {
      if (values[key]) {
        key === 'email'
          ? (body[key] = values[key].toLowerCase())
          : (body[key] = values[key]);
      }
    }
    if (!Object.keys(body).length) {
      Notification(error, 'Empty!', 'You must change at least one.');
    } else {
      updateAdultProfile(body)
        .then(() => {
          Notification(
            success,
            SUCCESS,
            'Your profile has been successfully updated.'
          );
          form.resetFields();
          closeDrawer();
        })
        .catch(() =>
          Notification(
            error,
            ERROR,
            'Connection error. Please refresh and start again!'
          )
        )
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="update adult profile"
      onFinish={onFinish}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          () => ({
            validator(_, value) {
              if (value !== user.firstName) {
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
        label="Last Name"
        name="lastName"
        rules={[
          () => ({
            validator(_, value) {
              if (value !== user.lastName) {
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
        name="email"
        label="Email"
        register="true"
        rules={[
          {
            type: 'email',
            message: 'Please input a valid email',
          },
        ]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item name="gradeLevel" label="Grade Level">
        <Checkbox.Group>
          <Row>
            <Checkbox value="4th">4th</Checkbox>
            <Checkbox value="5th">5th</Checkbox>
            <Checkbox value="6th">6th</Checkbox>
          </Row>
        </Checkbox.Group>
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
  );
};

export default UpdateAdultProfile;
