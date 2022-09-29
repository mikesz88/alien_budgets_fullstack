import React from 'react';
import { Link } from 'react-router-dom';
import StyledButton from '../../../components/PrimaryButton';

const columns = [
  {
    title: 'Class Code',
    dataIndex: 'classroomCode',
    key: 'classCode',
    width: '25%',
    align: 'center',
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    key: 'grade',
    width: '25%',
    align: 'center',
  },
  {
    title: '# of Students',
    dataIndex: 'numberOfStudents',
    key: 'numberOfStudents',
    width: '25%',
    align: 'center',
  },
  {
    title: 'View Class',
    dataIndex: 'viewClass',
    key: 'viewClass',
    render: (text) => (
      <StyledButton type="primary">
        <Link to={`/classrooms/teacher/details/${text}`}>Details</Link>
      </StyledButton>
    ),
    width: '25%',
    align: 'center',
  },
];

export default columns;
