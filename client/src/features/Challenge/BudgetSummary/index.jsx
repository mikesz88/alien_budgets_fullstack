import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';

const BudgetSummary = () => {
  const { gameService, authService, classroomService, updateService } =
    useContext(UserContext);
  const [total, setTotal] = useState(null);
  const monthlyBudgetScore = gameService.getMonth() * 1000;
  const mathFactScore = gameService
    .getMathFactResults()
    .reduce((a, z) => a + gameService.getMathFactScore(z), 0);
  const battleshipScore = gameService
    .getBattleshipResults()
    .reduce((a, z) => a + z * 1000, 0);
  const savingScore = gameService.getSavings() * 10;

  useEffect(() => {
    setTotal(gameService.updateScoreFromSavings(gameService.getSavings()));
    updateService();
    authService.addScore(gameService.score).then(() => {
      classroomService.updateStudentInClassroom(authService.getBearerHeader(), {
        _id: authService.id,
        score: authService.score,
        firstName: authService.firstName,
        lastInitial: authService.lastInitial,
        username: authService.username,
        avatarURL: authService.avatarURL,
        avatarColor: authService.avatarColor,
        classroomCode: authService.classroomCode,
      });
    });
    authService
      .deleteGame()
      .then(() =>
        gameService
          .deleteGame(gameService.gameId, authService.getBearerHeader())
          .then((response) => console.log(response))
      )
      .catch((error) => console.error(error));
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
      Score: monthlyBudgetScore,
    },
    {
      key: '2',
      Category: 'Math Facts',
      Score: mathFactScore,
    },
    {
      key: '3',
      Category: 'Battleship',
      Score: battleshipScore,
    },
    {
      key: '4',
      Category: 'Saving (how much saved by the end * 10)',
      Score: savingScore,
    },
    {
      key: '5',
      Category: 'Total',
      Score: total,
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
    </>
  );
};

export default BudgetSummary;
