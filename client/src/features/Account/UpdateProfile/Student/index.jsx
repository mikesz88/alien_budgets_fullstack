/* eslint-disable no-unused-vars */
import React, { useContext, useMemo, useCallback, useEffect } from 'react';
import { Form, Input, Checkbox, Row, notification } from 'antd';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';

const UpdateStudentProfile = ({ closeDrawer }) => {
  const { authService, updateService, classCodeService } =
    useContext(UserContext);
  const [form] = Form.useForm();

  const getAllClassCodes = useMemo(
    () => classCodeService.getAllClassCodes(),
    []
  );

  const isValidClassCode = useCallback(
    (classCode) => classCodeService.classCodeList.includes(classCode),
    []
  );

  useEffect(() => {
    getAllClassCodes();
  }, []);

  const onFinish = (values) => {
    console.log(values);
    if (!Object.keys(values).length) {
      notification.error({
        message: 'Empty!',
        description: 'You must change at least one.',
      });
    } else if (!isValidClassCode(values.classroomCode)) {
      notification.error({
        message: 'error',
        description: 'Invalid Classroom Code',
      });
    } else {
      authService
        .updateStudentProfile(values)
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
        );
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
        label="Last Initial"
        name="lastInitial"
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
        name="classroomCode"
        rules={[
          {
            required: true,
            message: 'Please write in a valid Class Code.',
          },
        ]}
      >
        <Input type="text" placeholder="Type your class code in now" />
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
        <StyledButton larger="true" type="primary" htmlType="submit">
          Submit Changes
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

export default UpdateStudentProfile;
