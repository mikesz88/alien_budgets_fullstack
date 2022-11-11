import React, { useState, useContext, useEffect } from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import GreetingBar from '../../../../components/GreetingBar';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';
import Avatar from '../../../../components/Avatar';
import EditCloseModal from './EditStudentModal';
import DeleteModal from './DeleteModal';
import NewStudentModal from './NewStudentModal';
import { ERROR, error, SUCCESS, success } from '../../../../common/constants';
import Notification from '../../../../components/Notification';
import {
  StyledBoldSpan,
  StyledDivContainer,
  StyledTableButton,
} from './styles';
import StyledDivWrapper from '../../../../components/DivWrapper';
import StyledTable from '../../../../components/Table';
import StyledBasicDiv from '../../../../components/BasicDiv';

const ClassDetails = () => {
  const { classId } = useParams();
  const [students, setStudents] = useState([]);
  const [classroomCode, setClassroomCode] = useState('');
  const [resetMessageObject, setResetMessageObject] = useState({});
  const [loading, setLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openEditStudentModal, setOpenEditStudentModal] = useState(false);
  const [openDeleteClassModal, setOpenDeleteClassModal] = useState(false);
  const [openNewStudentModal, setOpenNewStudentModal] = useState(false);
  const { authService, classroomService } = useContext(UserContext);
  const navigate = useNavigate();

  const data = (studentsInClass) =>
    studentsInClass
      .map((student) => ({
        key: student._id,
        avatar: [student.avatarColor, student.avatarURL],
        firstName: student.firstName,
        lastInitial: student.lastInitial,
        username: student.username,
        password: student._id,
        score: student.score,
        editStudent: student._id,
      }))
      .sort((a, z) => {
        if (a.username < z.username) {
          return -1;
        }
        if (a.username > z.username) {
          return 1;
        }
        return 0;
      });

  const getClassroom = () => {
    setLoading(true);
    classroomService
      .getSpecificClassroom(authService.getBearerHeader(), classId)
      .then((res) => {
        setClassroomCode(res.classroomCode);
        setStudents(data(res.students));
        Notification(
          success,
          SUCCESS,
          `Classroom with code ${res.classroomCode} was found.`
        );
      })
      .catch(() =>
        Notification(error, ERROR, 'Connection Error. No Connection found')
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getClassroom();

    return classroomService.setCurrentClassUpdate('');
  }, [classroomService.currentClassUpdated]);

  const confirm = (studentId) => {
    authService
      .resetStudentPassword(studentId)
      .then((res) => {
        setResetMessageObject(res);
        setOpenModal(true);
        Notification(success, SUCCESS, "Student's password was reset.");
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          "Connection Error. Student's password was not reset."
        )
      );
  };

  const handleResetPasswordClose = () => {
    setOpenModal(false);
    setResetMessageObject({});
  };

  const handleEditStudentClose = () => {
    setOpenEditStudentModal(false);
    setStudentInfo({});
  };

  const handleOpenDeleteModal = () => setOpenDeleteClassModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteClassModal(false);

  const handleOpenNewStudentModal = () => setOpenNewStudentModal(true);
  const handleCloseNewStudentModal = () => setOpenNewStudentModal(false);

  const editStudentInfo = (studentId) => {
    authService
      .getStudentInfo(studentId)
      .then((res) => {
        setStudentInfo(res);
        setOpenEditStudentModal(true);
        Notification(success, SUCCESS, 'Student Information Found.');
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          "Connection Error. Could not grab the student's information."
        )
      );
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
      sorter: (a, b) => a.score - b.score,
      sortDirections: ['descend'],
    },
    {
      title: 'Edit Student',
      dataIndex: 'editStudent',
      key: 'editStudent',
      render: (text) => (
        <StyledTableButton
          style={{ margin: '0', minWidth: '0', padding: '5px 10px' }}
          onClick={() => editStudentInfo(text)}
          type="primary"
        >
          Edit
        </StyledTableButton>
      ),
      width: '14%',
      align: 'center',
    },
  ];

  const classButtons = (
    <StyledDivContainer>
      <StyledButton
        size="large"
        type="primary"
        onClick={handleOpenNewStudentModal}
      >
        Add New Student
      </StyledButton>
      <StyledButton
        size="large"
        type="primary"
        onClick={() => navigate(`/classrooms/teacher/${authService.id}`)}
      >
        Back to My Classes
      </StyledButton>
      <StyledButton size="large" type="primary" onClick={handleOpenDeleteModal}>
        Delete Class
      </StyledButton>
    </StyledDivContainer>
  );

  return (
    <StyledDivWrapper>
      <GreetingBar template={`Class: ${classroomCode}`} />
      {classButtons}
      <StyledTable
        columns={columns}
        loading={loading}
        pagination={{
          pageSize: 10,
          position: ['topCenter'],
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
        <StyledBasicDiv>
          {`${resetMessageObject.firstName} ${resetMessageObject.lastInitial} with username: ${resetMessageObject.username} now has a new password.`}
        </StyledBasicDiv>
        <StyledBasicDiv>
          The new password is:{' '}
          <StyledBoldSpan>{resetMessageObject.newPassword}</StyledBoldSpan>
        </StyledBasicDiv>
        <StyledBasicDiv>{`${resetMessageObject.message}`}</StyledBasicDiv>
      </Modal>
      {openEditStudentModal && (
        <EditCloseModal
          open={openEditStudentModal}
          close={handleEditStudentClose}
          data={studentInfo}
        />
      )}
      {openDeleteClassModal && (
        <DeleteModal
          open={openDeleteClassModal}
          close={handleCloseDeleteModal}
          classId={classId}
        />
      )}
      {openNewStudentModal && (
        <NewStudentModal
          open={openNewStudentModal}
          close={handleCloseNewStudentModal}
          classId={classId}
          classroomCode={classroomCode}
        />
      )}
    </StyledDivWrapper>
  );
};

export default ClassDetails;
