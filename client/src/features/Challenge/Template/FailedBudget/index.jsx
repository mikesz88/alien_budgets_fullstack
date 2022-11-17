import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withMoneySymbol } from '../../../../common/constants';
import StyledButton from '../../../../components/PrimaryButton';
import { useGameServiceProvider } from '../../../../services/GameServiceProvider';
import {
  StyledBudgetInfo,
  StyledDivMarginBottom,
  StyledFailedBudgetContainer,
  StyledH1CenteredAndBottom,
} from './style';

const FailedBudget = () => {
  const navigate = useNavigate();
  const {
    getSalary,
    getSavings,
    getBonusOrFine,
    getHouse,
    getUtilities,
    getHouseMembers,
  } = useGameServiceProvider();

  const [preTaxMonthlySalary] = useState(
    () => +(getSalary() / 12 + getSavings() + getBonusOrFine()).toFixed(2),
    []
  );
  const [monthlySalaryTax] = useState(
    () => +(preTaxMonthlySalary * 0.1).toFixed(2),
    []
  );

  const [postTaxMonthlyIncome] = useState(
    +(preTaxMonthlySalary - monthlySalaryTax).toFixed(2)
  );
  const [mortgage] = useState(getHouse().monthlyPayment);
  const [utilities] = useState(
    +(getUtilities() * getHouse().monthlyPayment).toFixed(2)
  );
  const [groceries] = useState(+((getHouseMembers() + 1) * 50).toFixed(2));

  return (
    <StyledFailedBudgetContainer>
      <StyledH1CenteredAndBottom>
        Your monthly salary after taxes does not cover the essentials (mortgage,
        utilities, and groceries) for the month
      </StyledH1CenteredAndBottom>
      <StyledBudgetInfo>
        <StyledDivMarginBottom>
          Monthly Income after taxes:{' '}
          {withMoneySymbol(postTaxMonthlyIncome + 1)}
        </StyledDivMarginBottom>
        <StyledDivMarginBottom>
          Money needed:{' '}
          {withMoneySymbol(+(mortgage + utilities + groceries).toFixed(2))}
        </StyledDivMarginBottom>
        <StyledButton
          type="primary"
          onClick={() => navigate('/aliendashboard')}
        >
          Back to Dashboard
        </StyledButton>
      </StyledBudgetInfo>
    </StyledFailedBudgetContainer>
  );
};

export default FailedBudget;
