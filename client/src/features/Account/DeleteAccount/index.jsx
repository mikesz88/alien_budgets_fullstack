/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const { authService, classroomService } = useContext(UserContext);
  const navigate = useNavigate();

  const deleteSelf = () => {
    authService
      .deleteSelf()
      .then((res) => {
        notification.success({ message: 'Success', description: res.message });
        navigate('/deleted');
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: 'There was a connection error',
        });
        console.error(error);
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
        notification.success({
          message: 'Deleted from Classroom',
          description: 'You have been officially deleted from the classroom',
        })
      )
      .catch((error) => {
        console.error(error);
        notification.error({
          message: 'Error',
          description: 'You have not been deleted from the classroom',
        });
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
        notification.success({
          message: 'Classrooms deleted',
          description:
            'Classrooms linked to this adult account have also been deleted.',
        });
        authService
          .deleteSelectedStudents(response.students)
          .then(() =>
            notification.success({
              message: 'Students deleted',
              description:
                'Students linked to this adult account have also been deleted.',
            })
          )
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
    deleteSelf();
  };

  const handleDelete = () =>
    authService.role === 'adult' ? deleteAdult() : deleteStudent();

  return (
    <>
      <h1>Deleting Account</h1>
      <div>
        There is no going back from this. You will need to create a new account
        in order to access Alien Budgets.
      </div>
      {authService.role === 'adult' && (
        <div>
          If you delete your account, any classrooms you own and the students
          enrolled into them will also be deleted as well.
        </div>
      )}
      <StyledButton loading={loading} type="primary" onClick={handleDelete}>
        Confirm Deletion
      </StyledButton>
    </>
  );
};

export default DeleteAccount;
