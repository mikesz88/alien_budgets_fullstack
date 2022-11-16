import React from 'react';
import { Table } from 'antd';
import GreetingBar from '../../components/GreetingBar';
import { withMoneySymbol } from '../../common/constants';
import StyledDivWrapper from '../../components/DivWrapper';
import { useAuthServiceProvider } from '../../providers/AuthServiceProvider';

const Stats = () => {
  const { user } = useAuthServiceProvider();

  const previousGames = user.previousGames.map((game) => ({
    key: game._id,
    Job: game.job,
    Dwelling: game.dwelling,
    Salary: withMoneySymbol(game.salary),
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
    <StyledDivWrapper>
      <GreetingBar template="My Stats" />
      <Table pagination={false} dataSource={previousGames} columns={columns} />
    </StyledDivWrapper>
  );
};

export default Stats;
