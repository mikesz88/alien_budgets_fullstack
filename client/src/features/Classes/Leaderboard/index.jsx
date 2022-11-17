import React, { useState, useEffect } from 'react';
import GreetingBar from '../../../components/GreetingBar';
import Avatar from '../../../components/Avatar';
import Notification from '../../../components/Notification';
import { ERROR, error, SUCCESS, success } from '../../../common/constants';
import { StyledDivContainer, StyledHeader } from './styles';
import StyledTable from '../../../components/Table';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';
import { useClassroomServiceProvider } from '../../../services/ClassroomServiceProvider';

const Leaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const { user, getBearerHeader } = useAuthServiceProvider();
  const { getClassroomFromStudent } = useClassroomServiceProvider();

  const data = (studentsInClass) =>
    studentsInClass
      .map((student) => ({
        key: student.username,
        avatar: [student.avatarColor, student.avatarURL],
        username: student.username,
        score: student.score,
      }))
      .sort((a, z) => {
        if (a.username < z.username) {
          return -1;
        }
        if (a.username > z.username) {
          return 1;
        }
        return 0;
      });

  const getClassroom = () => {
    setLoading(true);
    getClassroomFromStudent(getBearerHeader(), user.classroomCode)
      .then((res) => {
        setStudents(data(res.students));
        Notification(success, SUCCESS, 'Leaderboard Updated!');
      })
      .catch(() =>
        Notification(
          error,
          ERROR,
          'Classroom not found. Please try again later.'
        )
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => getClassroom(), []);

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      width: '33%',
      key: 'avatar',
      align: 'center',
      render: (text) => (
        <Avatar
          key={text[1]}
          avatar={{
            avatarName: text[1],
            avatarColor: text[0],
          }}
          size="small"
        />
      ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      width: '33%',
      key: 'username',
      align: 'center',
    },
    {
      title: 'Score ($)',
      dataIndex: 'score',
      width: '33%',
      key: 'score',
      align: 'center',
      sorter: (a, b) => a.score - b.score,
      sortDirections: ['descend'],
    },
  ];

  return (
    <StyledDivContainer>
      <GreetingBar template={`Classroom: ${user.classroomCode}`} />
      <StyledHeader>Classroom Leaderboard</StyledHeader>
      <StyledTable
        columns={columns}
        loading={loading}
        pagination={{
          pageSize: 10,
          position: ['topCenter'],
        }}
        dataSource={students}
      />
    </StyledDivContainer>
  );
};

export default Leaderboard;
