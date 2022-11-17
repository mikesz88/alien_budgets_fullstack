import React from 'react';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';
import UpdateAdultProfile from './Adult';
import UpdateStudentProfile from './Student';

const UpdateProfile = ({ closeDrawer }) => {
  const { user } = useAuthServiceProvider();

  return (
    <>
      <div>Current Details</div>
      <div>FirstName: {user.firstName}</div>
      {user.role === 'student' ? (
        <>
          <div>Last Initial: {user.lastInitial}</div>
          <div>Classroom Code: {user.classroomCode}</div>
          <UpdateStudentProfile closeDrawer={closeDrawer} />
        </>
      ) : (
        <>
          <div>Last Name: {user.lastName}</div>
          <div>Email: {user.email}</div>
          <div>
            Grade Levels:{' '}
            {user.gradeLevel.length > 1
              ? user.gradeLevel.join(', ')
              : user.gradeLevel}
          </div>
          <UpdateAdultProfile closeDrawer={closeDrawer} />
        </>
      )}
    </>
  );
};

export default UpdateProfile;
