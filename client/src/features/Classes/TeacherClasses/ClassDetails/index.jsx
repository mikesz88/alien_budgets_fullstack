/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import GreetingBar from '../../../../components/GreetingBar';
import { UserContext } from '../../../../App';
import StyledDashboardWrapper from '../../../../components/Dashboard/Wrapper';
import columns from './helper';
import theme from '../../../../theme';

const ClassDetails = () => {
  const { classId } = useParams();
  const [students, setStudents] = useState([]);
  const [classroomCode, setClassroomCode] = useState('');
  const { authService, classroomService } = useContext(UserContext);

  const data = (studentsInClass) =>
    studentsInClass.map((student) => ({
      key: student._id,
      avatar: [student.avatarColor, student.avatarURL],
      firstName: student.firstName,
      lastInitial: student.lastInitial,
      username: student.username,
      password: student._id,
      score: student.score,
      editStudent: student._id,
    }));

  useEffect(() => {
    classroomService
      .getSpecificClassroom(authService.getBearerHeader(), classId)
      .then((res) => {
        setClassroomCode(res.classroomCode);
        setStudents(data(res.students));
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(classroomCode);
  console.log(students);

  return (
    <div
      style={{
        backgroundColor: theme.colors.lightGrey,
        display: 'flex',
        padding: '8rem 0',
      }}
    >
      <GreetingBar template={`Class: ${classroomCode}`} />
      <Table
        style={{ width: '100%', margin: '0 3rem' }}
        columns={columns}
        pagination={{
          pageSize: 10,
          position: ['topRight'],
        }}
        dataSource={students}
      />
    </div>
  );
};

export default ClassDetails;
