import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Modal } from 'antd';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';
import { BATTLESHIP_MONTHS } from '../../../../common/constants';
import { errorSwitchCheck } from '../helper';
import StyledBasicDiv from '../../../../components/BasicDiv';

const TestMyMath = ({ open, toggleVisibility, data, changeView }) => {
  const { gameService, authService, updateService } = useContext(UserContext);
  const [errorList, setErrorList] = useState([]);
  const preTaxMonthlySalary = useMemo(
    () =>
      +(
        gameService.getSalary() / 12 +
        gameService.getSavings() +
        gameService.getBonusOrFine()
      ).toFixed(2),
    [gameService]
  );
  const monthlySalaryTax = useMemo(
    () => +(preTaxMonthlySalary * 0.1).toFixed(2),
    [gameService]
  );
  const postTaxMonthlyTax = +(preTaxMonthlySalary - monthlySalaryTax).toFixed(
    2
  );
  const testData = useMemo(
    () =>
      data.map((object) => {
        const newObject = object;
        if (!object.requiredMinimum) {
          switch (newObject.budgetItem) {
            case 'monthlyIncome':
              newObject.requiredMinimum = preTaxMonthlySalary;
              break;
            case 'taxes':
              newObject.requiredMinimum = monthlySalaryTax;
              break;
            case 'incomeToSpend':
              newObject.requiredMinimum = postTaxMonthlyTax;
              break;
            default:
              break;
          }
        }
        return newObject;
      }),
    []
  );

  const checkForErrors = () => setErrorList(errorSwitchCheck(testData));

  const nextMonth = () => {
    const savings = testData.find(
      (budgetItem) =>
        budgetItem.budgetItem === 'Savings (This will carry over to next month)'
    );
    gameService.nextMonth();
    gameService.setSavings(savings.chosenBudget);
    gameService.updateBudgetScore();
    gameService.resetBonusFine();
    gameService.updateGameById(
      {
        month: gameService.getMonth(),
        savings: gameService.getSavings(),
        score: gameService.getScore(),
        bonusOrFine: gameService.getBonusOrFine(),
      },
      gameService.gameId,
      authService.getBearerHeader()
    );
    updateService();
    if (BATTLESHIP_MONTHS.some((month) => month === gameService.getMonth())) {
      changeView('battleships');
    } else {
      changeView('mathFacts');
    }
  };

  useEffect(() => checkForErrors(), []);

  return (
    <Modal
      destroyOnClose
      closable={!!errorList.length}
      onCancel={() => toggleVisibility(false)}
      open={open}
      footer={null}
      maskClosable={!!errorList.length}
      keyboard={!!errorList.length}
    >
      {errorList.length ? (
        errorList.map((errorObject) => (
          <StyledBasicDiv key={errorObject.error}>
            <StyledBasicDiv>Budget Item: {errorObject.error}</StyledBasicDiv>
            <StyledBasicDiv>Reason: {errorObject.errorMessage}</StyledBasicDiv>
          </StyledBasicDiv>
        ))
      ) : (
        <>
          <StyledBasicDiv>Congrats! All your math was correct!</StyledBasicDiv>
          <StyledBasicDiv>
            You may now advance to the next month!
          </StyledBasicDiv>
          <StyledButton type="primary" onClick={nextMonth}>
            Next Month
          </StyledButton>
        </>
      )}
    </Modal>
  );
};

export default TestMyMath;
