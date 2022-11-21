import React from 'react';
import GreetingBar from '../../components/GreetingBar';
import { withMoneySymbol } from '../../common/constants';
import StyledDivWrapper from '../../components/DivWrapper';
import { useAuthServiceProvider } from '../../services/AuthServiceProvider';
import AlienImages from '../../components/AlienImages';
import StyledTable from './styles';

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
      <AlienImages />
      <GreetingBar template="My Stats" />
      <StyledTable
        pagination={{
          pageSize: 5,
          position: ['bottomCenter'],
        }}
        dataSource={previousGames}
        columns={columns}
      />
    </StyledDivWrapper>
  );
};

export default Stats;
