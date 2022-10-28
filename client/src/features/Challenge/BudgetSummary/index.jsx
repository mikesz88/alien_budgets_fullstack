import React, { useContext, useEffect } from 'react';
import { Table } from 'antd';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';

const BudgetSummary = () => {
  const { gameService, updateService } = useContext(UserContext);

  useEffect(() => {
    gameService.updateScoreFromSavings(gameService.getSavings());
    updateService();
  }, []);

  console.log(gameService.getMathFactResults());
  console.log(gameService.getMathFactScore(100));
  console.log(
    gameService
      .getMathFactResults()
      .reduce((a, z) => a + gameService.getMathFactScore(z), 0)
  );

  const dataSource = [
    {
      key: '1',
      Category: 'Monthly Budgets',
      Score: gameService.getMonth() * 1000,
    },
    {
      key: '2',
      Category: 'Math Facts',
      Score: gameService
        .getMathFactResults()
        .reduce((a, z) => a + gameService.getMathFactScore(z), 0),
    },
    {
      key: '3',
      Category: 'Battleship',
      Score: gameService
        .getBattleshipResults()
        .reduce((a, z) => a + z * 1000, 0),
    },
    {
      key: '4',
      Category: 'Saving (how much saved by the end * 10)',
      Score: gameService.getSavings() * 10,
    },
    {
      key: '5',
      Category: 'Total',
      Score: gameService.getScore(),
    },
  ];

  const columns = [
    {
      title: 'Category',
      dataIndex: 'Category',
      key: 'Category',
      width: 50,
    },
    {
      title: 'Score',
      dataIndex: 'Score',
      key: 'Score',
      width: 50,
    },
  ];

  return (
    <>
      <div>Budget Summary</div>
      <Table pagination={false} dataSource={dataSource} columns={columns} />
      <StyledButton type="primary" onClick={() => console.log('play new game')}>
        Play Again
      </StyledButton>
      <div>
        I STILL NEED TO CONNECT THIS TO THE API to save the score to user!
      </div>
      <div>I need this in a return useEffect to delete the game.</div>
    </>
  );
};

export default BudgetSummary;
