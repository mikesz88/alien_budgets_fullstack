/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Table } from 'antd';
import GreetingBar from '../../components/GreetingBar';
import { UserContext } from '../../App';
import theme from '../../theme';

const salaryWithMoneySymbol = (salary) =>
  salary.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

const Stats = () => {
  const { authService } = useContext(UserContext);
  const previousGames = authService.previousGames.map((game) => ({
    key: game._id,
    Job: game.job,
    Dwelling: game.dwelling,
    Salary: salaryWithMoneySymbol(game.salary),
    averageMathFactScore: `${game.averageMathFactScore}%`,
    averageBattleshipScore: game.averageBattleshipScore,
    Score: game.score,
  }));

  const columns = [
    {
      title: 'Job',
      dataIndex: 'Job',
      key: 'Job',
    },
    {
      title: 'Dwelling',
      dataIndex: 'Dwelling',
      key: 'Dwelling',
    },
    {
      title: 'Salary',
      dataIndex: 'Salary',
      key: 'Salary',
    },
    {
      title: 'Average Math Fact Score',
      dataIndex: 'averageMathFactScore',
      key: 'averageMathFactScore',
    },
    {
      title: 'Average Battleship Score',
      dataIndex: 'averageBattleshipScore',
      key: 'averageBattleshipScore',
    },
    {
      title: 'Score',
      dataIndex: 'Score',
      key: 'Score',
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
      <GreetingBar template="My Stats" />
      <Table pagination={false} dataSource={previousGames} columns={columns} />
    </div>
  );
};

export default Stats;