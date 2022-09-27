/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { UserContext } from '../../../App';
import UpdateAdultProfile from './Adult';
import UpdateStudentProfile from './Student';

const UpdateProfile = ({ closeDrawer }) => {
  const { authService } = useContext(UserContext);

  return (
    <>
      <div>Current Details</div>
      <div>FirstName: {authService.firstName}</div>
      {authService.role === 'student' ? (
        <>
          <div>Last Initial: {authService.lastInitial}</div>
          <div>Classroom Code: {authService.classroomCode}</div>
          <UpdateStudentProfile closeDrawer={closeDrawer} />
        </>
      ) : (
        <>
          <div>Last Name: {authService.lastName}</div>
          <div>Email: {authService.email}</div>
          <div>
            Grade Levels:{' '}
            {authService.gradeLevel.length > 1
              ? authService.gradeLevel.join(', ')
              : authService.gradeLevel}
          </div>
          <UpdateAdultProfile closeDrawer={closeDrawer} />
        </>
      )}
    </>
  );
};

export default UpdateProfile;
