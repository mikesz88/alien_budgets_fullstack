import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';
import Notification from '../../../components/Notification';
import StyledBasicHeader from './styles';
import StyledBasicDiv from '../../../components/BasicDiv';
import { ERROR, error, SUCCESS, success } from '../../../common/constants';

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const { authService, classroomService } = useContext(UserContext);
  const navigate = useNavigate();

  const deleteSelf = () => {
    authService
      .deleteSelf()
      .then((res) => {
        Notification(success, SUCCESS, res.message);
        navigate('/deleted');
      })
      .catch(() => {
        Notification(error, ERROR, 'There was a connection error');
      })
      .finally(() => setLoading(false));
  };

  const deleteStudent = () => {
    setLoading(true);
    const body = {
      classroomCode: authService.classroomCode,
      id: authService.id,
    };
    classroomService
      .deleteStudentFromClass(authService.getBearerHeader(), body)
      .then(() =>
        Notification(
          success,
          'Deleted from Classroom',
          'You have been officially deleted from the classroom'
        )
      )
      .catch(() => {
        Notification(
          error,
          ERROR,
          'You have not been deleted from the classroom'
        );
      });
    deleteSelf();
  };

  const deleteAdult = () => {
    setLoading(true);
    classroomService
      .deleteAllClassroomsByTeacher(
        authService.getBearerHeader(),
        authService.id
      )
      .then((response) => {
        Notification(
          success,
          'Classrooms deleted',
          'Classrooms linked to this adult account have also been deleted.'
        );
        authService
          .deleteSelectedStudents(response.students)
          .then(() =>
            Notification(
              success,
              'Students deleted',
              'Students linked to this adult account have also been deleted.'
            )
          )
          .catch(() => {
            Notification(
              error,
              ERROR,
              'There was a connection error. No students linked to this adult have been deleted.'
            );
          });
      })
      .catch(() => {
        Notification(
          error,
          ERROR,
          'There was a connection error. No classroom linked to this adult have been deleted.'
        );
      });
    deleteSelf();
  };

  const handleDelete = () =>
    authService.role === 'adult' ? deleteAdult() : deleteStudent();

  return (
    <>
      <StyledBasicHeader>Deleting Account</StyledBasicHeader>
      <StyledBasicDiv>
        There is no going back from this. You will need to create a new account
        in order to access Alien Budgets.
      </StyledBasicDiv>
      {authService.role === 'adult' && (
        <StyledBasicDiv>
          If you delete your account, any classrooms you own and the students
          enrolled into them will also be deleted as well.
        </StyledBasicDiv>
      )}
      <StyledButton loading={loading} type="primary" onClick={handleDelete}>
        Confirm Deletion
      </StyledButton>
    </>
  );
};

export default DeleteAccount;
