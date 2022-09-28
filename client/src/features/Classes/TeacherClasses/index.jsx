/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import GreetingBar from '../../../components/GreetingBar';
import { UserContext } from '../../../App';
import StyledDashboardWrapper from '../../../components/Dashboard/Wrapper';
import columns from './helper';

const TeacherClasses = () => {
  const { teacherId } = useParams();
  const [classrooms, setClassrooms] = useState([]);
  const { authService, classroomService } = useContext(UserContext);

  const data = (classes) =>
    classes.map((classroom) => ({
      key: classroom._id,
      classroomCode: classroom.classroomCode,
      grade: classroom.gradeLevel,
      numberOfStudents: classroom.students.length,
      viewClass: classroom._id,
    }));

  useEffect(() => {
    classroomService
      .getAllTeacherClassrooms(authService.getBearerHeader(), teacherId)
      .then((response) => setClassrooms(data(response)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <StyledDashboardWrapper>
      <GreetingBar template="My Classes" />
      <Table
        style={{ width: '100%', margin: '0 3rem' }}
        pagination={false}
        columns={columns}
        dataSource={classrooms}
      />
    </StyledDashboardWrapper>
  );
};

export default TeacherClasses;
