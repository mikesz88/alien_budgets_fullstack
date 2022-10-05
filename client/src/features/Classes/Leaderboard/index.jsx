/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'antd';
import GreetingBar from '../../../components/GreetingBar';
import theme from '../../../theme';
import Avatar from '../../../components/Avatar';
import { UserContext } from '../../../App';
import StyledTitle from '../../../components/Title';

const Leaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const { authService, classroomService, updateService } =
    useContext(UserContext);

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

  useEffect(() => {
    setLoading(true);
    classroomService
      .getClassroomFromStudent(
        authService.getBearerHeader(),
        authService.classroomCode
      )
      .then((res) => {
        console.log(res);
        setStudents(data(res.students));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    // classroom call to get students
  }, []);

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
    <div
      style={{
        backgroundColor: theme.colors.lightGrey,
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '8rem 0',
      }}
    >
      <GreetingBar template={`Classroom: ${authService.classroomCode}`} />
      <h1
        style={{
          fontFamily: theme.fontFamily.creepster,
          color: theme.colors.primaryBlue,
          textAlign: 'center',
          fontSize: '4rem',
          margin: '0',
        }}
      >
        Classroom Leaderboard
      </h1>
      <Table
        style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}
        columns={columns}
        loading={loading}
        pagination={{
          pageSize: 10,
          position: ['topCenter'],
        }}
        dataSource={students}
      />
    </div>
  );
};

export default Leaderboard;
