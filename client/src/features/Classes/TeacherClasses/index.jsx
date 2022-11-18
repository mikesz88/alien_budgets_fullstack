import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GreetingBar from '../../../components/GreetingBar';
import columns from './helper';
import StyledTable from '../../../components/Table';
import Notification from '../../../components/Notification';
import { ERROR, error, SUCCESS, success } from '../../../common/constants';
import StyledDivWrapper from '../../../components/DivWrapper';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';
import { useClassroomServiceProvider } from '../../../services/ClassroomServiceProvider';
import AlienImages from '../../../components/AlienImages';

const TeacherClasses = () => {
  const { teacherId } = useParams();
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getBearerHeader } = useAuthServiceProvider();
  const { getAllTeacherClassrooms } = useClassroomServiceProvider();

  const data = (classes) =>
    classes.map((classroom) => ({
      key: classroom._id,
      classroomCode: classroom.classroomCode,
      grade: classroom.gradeLevel,
      numberOfStudents: classroom.students.length,
      viewClass: classroom._id,
    }));

  const getClassrooms = () => {
    setLoading(true);
    getAllTeacherClassrooms(getBearerHeader(), teacherId)
      .then((response) => {
        setClassrooms(data(response));
        Notification(success, SUCCESS, 'Teacher classrooms found!');
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'Connection Error. Unable to find teacher classrooms. Please try again.'
        )
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => getClassrooms(), []);

  return (
    <StyledDivWrapper>
      <AlienImages />
      <GreetingBar template="My Classes" />
      <StyledTable
        pagination={false}
        columns={columns}
        dataSource={classrooms}
        loading={loading}
      />
    </StyledDivWrapper>
  );
};

export default TeacherClasses;
