import React from 'react';
// import { Link } from 'react-router-dom';
import { Button } from 'antd';
import StyledButton from '../../../../components/PrimaryButton';
import Avatar from '../../../../components/Avatar';

const columns = [
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
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
    width: '5%',
    align: 'center',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '14%',
    align: 'center',
  },
  {
    title: 'Last Initial',
    dataIndex: 'lastInitial',
    key: 'lastInitial',
    width: '10%',
    align: 'center',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    width: '14%',
    align: 'center',
  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
    render: (text) => (
      <Button onClick={() => console.log(text)}>Reset Password</Button>
    ),
    width: '14%',
    align: 'center',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    width: '14%',
    align: 'center',
  },
  {
    title: 'Edit Student',
    dataIndex: 'editStudent',
    key: 'editStudent',
    render: (text) => (
      <StyledButton
        style={{ margin: '0', minWidth: '0', padding: '5px 10px' }}
        onClick={() => console.log(`open modal with link: ${text}`)}
        type="primary"
      >
        Edit
        {/* <Link to={`/classrooms/teacher/details/${text}`}>Details</Link> */}
      </StyledButton>
    ),
    width: '14%',
    align: 'center',
  },
];

export default columns;
