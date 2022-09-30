/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { Table, Button, Popconfirm, Modal } from 'antd';
import { useParams } from 'react-router-dom';
import GreetingBar from '../../../../components/GreetingBar';
import { UserContext } from '../../../../App';
import theme from '../../../../theme';
import StyledButton from '../../../../components/PrimaryButton';
import Avatar from '../../../../components/Avatar';
import EditCloseModal from './EditCloseModal';

const ClassDetails = () => {
  const { classId } = useParams();
  const [students, setStudents] = useState([]);
  const [classroomCode, setClassroomCode] = useState('');
  const [resetMessageObject, setResetMessageObject] = useState({});
  const [studentInfo, setStudentInfo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openEditStudentModal, setOpenEditStudentModal] = useState(false);
  const { authService, classroomService } = useContext(UserContext);

  const data = (studentsInClass) =>
    studentsInClass.map((student) => ({
      key: student._id,
      avatar: [student.avatarColor, student.avatarURL],
      firstName: student.firstName,
      lastInitial: student.lastInitial,
      username: student.username,
      password: student._id,
      score: student.score,
      editStudent: student._id,
    }));

  useEffect(() => {
    classroomService
      .getSpecificClassroom(authService.getBearerHeader(), classId)
      .then((res) => {
        setClassroomCode(res.classroomCode);
        setStudents(data(res.students));
      })
      .catch((error) => console.error(error));

    return classroomService.setCurrentClassUpdate('');
  }, [classroomService.currentClassUpdated]);

  const confirm = (studentId) => {
    authService
      .resetStudentPassword(studentId)
      .then((res) => {
        console.log(res);
        setResetMessageObject(res);
        setOpenModal(true);
      })
      .catch((error) => console.error(error));
  };

  const handleResetPasswordClose = () => {
    setOpenModal(false);
    setResetMessageObject({});
  };

  const handleEditStudentClose = () => {
    setOpenEditStudentModal(false);
    setStudentInfo({});
  };

  const editStudentInfo = (studentId) => {
    authService
      .getStudentInfo(studentId)
      .then((res) => {
        console.log(res);
        setStudentInfo(res);
        setOpenEditStudentModal(true);
      })
      .catch((error) => console.error(error));
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text) => (
        <Avatar
          key={text[1]}
          avatar={{
            avatarName: text[1],
            avatarColor: text[0],
          }}
          size="small"
        />
      ),
      width: '5%',
      align: 'center',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '14%',
      align: 'center',
    },
    {
      title: 'Last Initial',
      dataIndex: 'lastInitial',
      key: 'lastInitial',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: '14%',
      align: 'center',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: (text) => (
        <Popconfirm
          title="Are you sure to reset the password?"
          onConfirm={() => confirm(text)}
          okText="Yes"
          cancelText="No"
        >
          <Button>Reset Password</Button>
        </Popconfirm>
      ),
      width: '14%',
      align: 'center',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      width: '14%',
      align: 'center',
    },
    {
      title: 'Edit Student',
      dataIndex: 'editStudent',
      key: 'editStudent',
      render: (text) => (
        <StyledButton
          style={{ margin: '0', minWidth: '0', padding: '5px 10px' }}
          onClick={() => editStudentInfo(text)}
          type="primary"
        >
          Edit
        </StyledButton>
      ),
      width: '14%',
      align: 'center',
    },
  ];

  return (
    <div
      style={{
        backgroundColor: theme.colors.lightGrey,
        display: 'flex',
        padding: '8rem 0',
      }}
    >
      <GreetingBar template={`Class: ${classroomCode}`} />
      <Table
        style={{ width: '100%', margin: '0 3rem' }}
        columns={columns}
        pagination={{
          pageSize: 10,
          position: ['topRight'],
        }}
        dataSource={students}
      />
      <Modal
        open={openModal}
        title="Password has been reset"
        onCancel={handleResetPasswordClose}
        footer={null}
        closable
        destroyOnClose
      >
        <div>
          {`${resetMessageObject.firstName} ${resetMessageObject.lastInitial} with username: ${resetMessageObject.username} now has a new password.`}
        </div>
        <div>
          The new password is:{' '}
          <span style={{ fontWeight: 'bold' }}>
            {resetMessageObject.newPassword}
          </span>
        </div>
        <div>{`${resetMessageObject.message}`}</div>
      </Modal>
      {openEditStudentModal && (
        <EditCloseModal
          open={openEditStudentModal}
          close={handleEditStudentClose}
          data={studentInfo}
        />
      )}
    </div>
  );
};

export default ClassDetails;