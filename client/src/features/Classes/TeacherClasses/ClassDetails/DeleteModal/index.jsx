import React from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../../../../components/PrimaryButton';
import Notification from '../../../../../components/Notification';
import {
  ERROR,
  error,
  SUCCESS,
  success,
} from '../../../../../common/constants';
import StyledBasicDiv from '../../../../../components/BasicDiv';
import { useAuthServiceProvider } from '../../../../../providers/AuthServiceProvider';
import { useClassroomServiceProvider } from '../../../../../providers/ClassroomServiceProvider';

const DeleteModal = ({ open, close, classId }) => {
  const { getBearerHeader, deleteSelectedStudents } = useAuthServiceProvider();
  const { deleteSingleClassroomByTeacher } = useClassroomServiceProvider();
  const navigate = useNavigate();

  const handleDeleteClass = () => {
    deleteSingleClassroomByTeacher(getBearerHeader(), classId)
      .then((response) => {
        Notification(
          success,
          SUCCESS,
          'Classrooms linked to this adult account have also been deleted.'
        );
        deleteSelectedStudents(response.students)
          .then(() => {
            Notification(
              success,
              'Students deleted',
              'Students linked to this adult account have also been deleted.'
            );
            navigate('/dashboard');
          })
          .catch(() =>
            Notification(
              error,
              ERROR,
              'There was a connection error. No students linked to this adult have been deleted.'
            )
          );
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'There was a connection error. No classroom linked to this adult have been deleted.'
        )
      );
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
      <StyledBasicDiv>
        Are you sure you want to delete this class?
      </StyledBasicDiv>
      <StyledBasicDiv>
        The students accounts will also be deleted as well.
      </StyledBasicDiv>
      <StyledButton type="primary" onClick={handleDeleteClass}>
        Delete Class
      </StyledButton>
    </Modal>
  );
};

export default DeleteModal;
