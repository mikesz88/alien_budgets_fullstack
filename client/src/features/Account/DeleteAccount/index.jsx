import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../../components/PrimaryButton';
import Notification from '../../../components/Notification';
import StyledBasicHeader from './styles';
import StyledBasicDiv from '../../../components/BasicDiv';
import { ERROR, error, SUCCESS, success } from '../../../common/constants';
import { useAuthServiceProvider } from '../../../providers/AuthServiceProvider';
import { useClassroomServiceProvider } from '../../../providers/ClassroomServiceProvider';

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const {
    user,
    deleteSelf: deleteMyself,
    deleteSelectedStudents,
    getBearerHeader,
  } = useAuthServiceProvider();
  const { deleteStudentFromClass, deleteAllClassroomsByTeacher } =
    useClassroomServiceProvider();
  const navigate = useNavigate();

  const deleteSelf = () => {
    deleteMyself()
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
      classroomCode: user.classroomCode,
      id: user.id,
    };
    deleteStudentFromClass(getBearerHeader(), body)
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
    deleteAllClassroomsByTeacher(getBearerHeader(), user.id)
      .then((response) => {
        Notification(
          success,
          'Classrooms deleted',
          'Classrooms linked to this adult account have also been deleted.'
        );
        deleteSelectedStudents(response.students)
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
    user.role === 'adult' ? deleteAdult() : deleteStudent();

  return (
    <>
      <StyledBasicHeader>Deleting Account</StyledBasicHeader>
      <StyledBasicDiv>
        There is no going back from this. You will need to create a new account
        in order to access Alien Budgets.
      </StyledBasicDiv>
      {user.role === 'adult' && (
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
