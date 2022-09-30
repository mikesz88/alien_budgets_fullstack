/* eslint-disable no-unused-vars */
import React, { useContext, useMemo, useCallback, useEffect } from 'react';
import { Form, Input, Checkbox, Row, notification } from 'antd';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';

const UpdateStudentProfile = ({ closeDrawer }) => {
  const { authService, updateService, classroomService } =
    useContext(UserContext);
  const [form] = Form.useForm();

  const getAllClassCodes = useCallback(
    () => classroomService.getAllClassrooms(),
    []
  );

  const isValidClassCode = useCallback(
    (classCode) => classroomService.classroomCodes.includes(classCode),
    []
  );

  useEffect(() => {
    getAllClassCodes();
  }, []);

  // eslint-disable-next-line consistent-return
  const onFinish = (values) => {
    console.log(values);
    if (values.classroomCode) {
      if (!isValidClassCode(values.classroomCode)) {
        return notification.error({
          message: 'error',
          description: 'Invalid Classroom Code',
        });
      }
    }
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
    } else {
      console.log(body);
      authService
        .updateStudentProfile(body)
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
            description: 'There was something wrong with the connection',
          })
        );
    }
  };
  return (
    <Form
      layout="vertical"
      form={form}
      name="update student profile"
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
        label="Last Initial"
        name="lastInitial"
        rules={[
          () => ({
            validator(_, value) {
              if (value !== authService.lastInitial) {
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
      <Form.Item label="Classroom Code" name="classroomCode">
        <Input type="text" />
      </Form.Item>
      <Form.Item>
        <StyledButton larger="true" type="primary" htmlType="submit">
          Submit Changes
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

export default UpdateStudentProfile;
