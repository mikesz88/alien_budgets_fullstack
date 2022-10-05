/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Table } from 'antd';
import GreetingBar from '../../../components/GreetingBar';
import theme from '../../../theme';
import Avatar from '../../../components/Avatar';

const Leaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const data = (studentsInClass) =>
    studentsInClass.map((student) => ({
      key: student.username,
      avatar: [student.avatarColor, student.avatarURL],
      username: student.username,
      score: student.score,
    }));

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
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
      key: 'username',
      align: 'center',
    },
    {
      title: 'Score ($)',
      dataIndex: 'score',
      key: 'score',
      align: 'center',
    },
  ];

  return (
    <div
      style={{
        backgroundColor: theme.colors.lightGrey,
        display: 'flex',
        flexDirection: 'column',
        padding: '8rem 0',
      }}
    >
      <GreetingBar template="Class Leaderboard" />
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
