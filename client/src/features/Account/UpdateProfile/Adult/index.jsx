import React, { useState, useContext } from 'react';
import { Form, Input, Checkbox, Row, notification } from 'antd';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';

const UpdateAdultProfile = ({ closeDrawer }) => {
  const [loading, setLoading] = useState(false);
  const { authService, updateService } = useContext(UserContext);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    console.log(values);
    const body = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(values)) {
      if (values[key]) {
        // eslint-disable-next-line no-unused-expressions
        key === 'email'
          ? (body[key] = values[key].toLowerCase())
          : (body[key] = values[key]);
      }
    }
    if (!Object.keys(body).length) {
      notification.error({
        message: 'Empty!',
        description: 'You must change at least one.',
      });
    } else {
      console.log(body);
      authService
        .updateAdultProfile(body)
        .then(() => {
          notification.success({
            message: 'Success',
            description: 'Your profile has been successfully updated.',
          });
          form.resetFields();
          updateService();
          closeDrawer();
        })
        .catch(() =>
          notification.error({
            message: 'Connection error',
            description: 'There was something wrong with the conenction',
          })
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
              if (value !== authService.firstName) {
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
              if (value !== authService.lastName) {
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
