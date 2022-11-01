/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Modal } from 'antd';
import { UserContext } from '../../../../App';
import StyledButton from '../../../../components/PrimaryButton';

const withMoneySymbol = (salary) =>
  salary.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

// const convertMoneyToNumber = (moneyString) => {
//   console.log(moneyString);
//   const removeComma = moneyString.split(',').join('');
//   console.log(removeComma, +removeComma.slice(1));
//   return +removeComma.slice(1);
// };

const BATTLESHIP_MONTHS = [4, 8, 12];

const TestMyMath = ({ open, toggleVisibility, data, changeView }) => {
  // console.log('data =>', data);
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
        console.log(newObject);
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

  const checkForErrors = () => {
    const newErrors = [];
    // for (const item of testData) {
    testData.forEach((item) => {
      console.log('budgetItem', item.budgetItem);
      switch (item.budgetItem) {
        case 'Monthly House/Apartment Payment':
          if (item.chosenBudget !== item.requiredMinimum) {
            console.log('fix this1');
            console.log(item.chosenBudget, 'not equal', item.requiredMinimum);
            newErrors.push({
              error: item.budgetItem,
              errorMessage:
                'Your monthly payment must equal the minimum payment',
            });
          }
          break;
        case 'Utilities (Electricity, Gas, Water/Sewer, Internet/Phone, Trash)':
          if (item.chosenBudget !== item.requiredMinimum) {
            console.log('fix this2');
            console.log(item.chosenBudget, 'not equal', item.requiredMinimum);
            newErrors.push({
              error: item.budgetItem,
              errorMessage: 'Your utilities must equal the minimum payment',
            });
          }
          break;
        case 'Savings (This will carry over to next month)':
          if (item.chosenBudget < 0) {
            console.log('fix this3');
            console.log(item.chosenBudget, 'less than 0');
            newErrors.push({
              error: item.budgetItem,
              errorMessage:
                'You cannot make it a negative budget item. Any saved amount from previous month will be shown under the Current Annual Salary.',
            });
          }
          break;
        case 'Groceries ($50 per person minimum)':
          if (item.chosenBudget < item.requiredMinimum) {
            console.log('fix this4');
            console.log(item.chosenBudget, 'less than', item.requiredMinimum);
            newErrors.push({
              error: item.budgetItem,
              errorMessage: `Your groceries must be AT LEAST the required minimum of  ${withMoneySymbol(
                item.requiredMinimum
              )}`,
            });
          }
          break;
        case 'monthlyIncome':
          if (item.chosenBudget !== item.requiredMinimum) {
            console.log('fix this5');
            console.log(item.chosenBudget, 'not equal', item.requiredMinimum);
            newErrors.push({
              error: item.budgetItem,
              errorMessage:
                'Please try again! Make sure you round to the nearest hundredth place',
            });
          }
          break;
        case 'taxes':
          if (item.chosenBudget !== item.requiredMinimum) {
            console.log('fix this6');
            console.log(item.chosenBudget, 'not equal', item.requiredMinimum);
            newErrors.push({
              error: item.budgetItem,
              errorMessage:
                'Please try again! Make sure you round to the nearest hundredth place',
            });
          }
          break;
        case 'incomeToSpend':
          if (item.chosenBudget !== item.requiredMinimum) {
            console.log('fix this7');
            console.log(item.chosenBudget, 'not equal', item.requiredMinimum);
            newErrors.push({
              error: item.budgetItem,
              errorMessage:
                'Please try again! Make sure you round to the nearest hundredth place',
            });
          }
          break;
        default:
          if (item.chosenBudget <= 0) {
            console.log('fix this8');
            console.log(item.chosenBudget, 'not less than or equal to 0');
            newErrors.push({
              error: item.budgetItem,
              errorMessage:
                'You cannot have a new budget item be less than or equal to zero',
            });
          }
          break;
      }
    });
    setErrorList(newErrors);
  };

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
    console.log(gameService.getMonth());
    console.log(gameService.getScore());
    if (BATTLESHIP_MONTHS.some((month) => month === gameService.getMonth())) {
      changeView('battleships');
    } else {
      changeView('mathFacts');
    }
  };

  useEffect(() => checkForErrors(), []);

  console.log('testData', testData);
  console.log('errorData', errorList);
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
          <div key={errorObject.error}>
            <div>Budget Item: {errorObject.error}</div>
            <div>Reason: {errorObject.errorMessage}</div>
          </div>
        ))
      ) : (
        <>
          <div>Congrats! All your math was correct!</div>
          <div>You may now advance to the next month!</div>
          <StyledButton type="primary" onClick={nextMonth}>
            Next Month
          </StyledButton>
        </>
      )}
    </Modal>
  );
};

export default TestMyMath;
