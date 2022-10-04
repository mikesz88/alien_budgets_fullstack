/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Modal, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../../App';
import StyledButton from '../../../../../components/PrimaryButton';

const DeleteModal = ({ open, close, classId }) => {
  const { authService, classroomService } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDeleteClass = () => {
    classroomService
      .deleteSingleClassroomByTeacher(authService.getBearerHeader(), classId)
      .then((response) => {
        console.log(response);
        notification.success({
          message: 'Classrooms deleted',
          description:
            'Classrooms linked to this adult account have also been deleted.',
        });
        authService
          .deleteSelectedStudents(response.students)
          .then(() => {
            notification.success({
              message: 'Students deleted',
              description:
                'Students linked to this adult account have also been deleted.',
            });
            navigate('/dashboard');
          })
          .catch((error) => {
            console.error(error);
            notification.error({
              message: 'Error',
              description:
                'There was a connection error. No students linked to this adult have been deleted.',
            });
          });
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          message: 'Error',
          description:
            'There was a connection error. No classroom linked to this adult have been deleted.',
        });
      });
  };

  return (
    <Modal
      open={open}
      onCancel={close}
      title="Delete Classroom"
      footer={null}
      closable
      destroyOnClose
    >
      <div>Are you sure you want to delete this class?</div>
      <div>The students accounts will also be deleted as well.</div>
      <StyledButton type="primary" onClick={handleDeleteClass}>
        Delete Class
      </StyledButton>
    </Modal>
  );
};

export default DeleteModal;
