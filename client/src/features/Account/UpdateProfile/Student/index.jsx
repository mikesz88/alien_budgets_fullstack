import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input } from 'antd';
import StyledButton from '../../../../components/PrimaryButton';
import Notification from '../../../../components/Notification';
import { ERROR, error, SUCCESS, success } from '../../../../common/constants';
import { useAuthServiceProvider } from '../../../../providers/AuthServiceProvider';
import { useClassroomServiceProvider } from '../../../../providers/ClassroomServiceProvider';

const UpdateStudentProfile = ({ closeDrawer }) => {
  const { user, updateStudentProfile, getBearerHeader } =
    useAuthServiceProvider();
  const { classroomCodes, getAllClassrooms, transferStudentToDifferentClass } =
    useClassroomServiceProvider();
  const [loading, setLoading] = useState(false);
  const [currentClassroomCode] = useState(user.classroomCode);
  const [form] = Form.useForm();

  const getAllClassCodes = useCallback(() => getAllClassrooms(), []);

  const isValidClassCode = useCallback(
    (classCode) => classroomCodes.includes(classCode),
    []
  );

  useEffect(() => {
    getAllClassCodes();
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    if (values.classroomCode) {
      if (!isValidClassCode(values.classroomCode)) {
        return Notification(error, ERROR, 'Invalid Classroom Code');
      }
    }
    const body = {};
    for (const key of Object.keys(values)) {
      if (values[key]) {
        body[key] = values[key];
      }
    }
    if (!Object.keys(body).length) {
      Notification(error, ERROR, 'You must change at least one.');
    } else {
      updateStudentProfile(body)
        .then((res) => {
          if (body.classroomCode) {
            const classroomBody = {
              ...res,
              currentClassroomCode,
              newClassroomCode: body.classroomCode,
            };
            transferStudentToDifferentClass(getBearerHeader(), classroomBody)
              .then(() =>
                Notification(
                  success,
                  SUCCESS,
                  'Student has been transferred to the new class.'
                )
              )
              .catch(() =>
                Notification(
                  error,
                  ERROR,
                  'You were not swapped to your new class.'
                )
              );
          }
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
            'Connection error. There was something wrong with the connection'
          )
        )
        .finally(() => setLoading(false));
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
        label="Last Initial"
        name="lastInitial"
        rules={[
          () => ({
            validator(_, value) {
              if (value !== user.lastInitial) {
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

export default UpdateStudentProfile;
