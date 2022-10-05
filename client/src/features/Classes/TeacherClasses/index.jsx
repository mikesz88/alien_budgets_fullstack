/* eslint-disable no-underscore-dangle */
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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    classroomService
      .getAllTeacherClassrooms(authService.getBearerHeader(), teacherId)
      .then((response) => setClassrooms(data(response)))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <StyledDashboardWrapper>
      <GreetingBar template="My Classes" />
      <Table
        style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}
        pagination={false}
        columns={columns}
        dataSource={classrooms}
        loading={loading}
      />
    </StyledDashboardWrapper>
  );
};

export default TeacherClasses;
