export const MONTHLY_PAYMENT = 'Monthly House/Apartment Payment';
export const UTILITIES =
  'Utilities (Electricity, Gas, Water/Sewer, Internet/Phone, Trash)';
export const SAVINGS = 'Savings (This will carry over to next month)';
export const GROCERIES = 'Groceries ($50 per person minimum)';
export const requiredCells = [MONTHLY_PAYMENT, UTILITIES, SAVINGS, GROCERIES];
export const errorMessages = {
  monthlyPayment: 'Your monthly payment must equal the minimum payment',
  utilities: 'Your utilities must equal the minimum payment',
  savings:
    'You cannot make it a negative budget item. Any saved amount from previous month will be shown under the Current Annual Salary.',
  groceries: 'Your groceries must be AT LEAST $50 per person',
  monthlyIncome:
    'Please try again! Make sure you round to the nearest hundredth place and Add the bonuses/fines after finding your monthly salary.',
  taxes: 'Please try again! Make sure you round to the nearest hundredth place',
  incomeToSpend:
    'Please try again! Make sure you round to the nearest hundredth place',
  default: 'You cannot have a new budget item be less than or equal to zero',
};

export const errorSwitchCheck = (data) => {
  const newErrors = [];
  data.forEach((item) => {
    switch (item.budgetItem) {
      case MONTHLY_PAYMENT:
        if (item.chosenBudget !== item.requiredMinimum) {
          newErrors.push({
            error: item.budgetItem,
            errorMessage: errorMessages.monthlyPayment,
          });
        }
        break;
      case UTILITIES:
        if (item.chosenBudget !== item.requiredMinimum) {
          newErrors.push({
            error: item.budgetItem,
            errorMessage: errorMessages.utilities,
          });
        }
        break;
      case SAVINGS:
        if (item.chosenBudget < 0) {
          newErrors.push({
            error: item.budgetItem,
            errorMessage: errorMessages.savings,
          });
        }
        break;
      case GROCERIES:
        if (item.chosenBudget < item.requiredMinimum) {
          newErrors.push({
            error: item.budgetItem,
            errorMessage: errorMessages.groceries,
          });
        }
        break;
      case 'monthlyIncome':
        if (item.chosenBudget !== item.requiredMinimum) {
          newErrors.push({
            error: 'Monthly Income',
            errorMessage: errorMessages.monthlyIncome,
          });
        }
        break;
      case 'taxes':
        if (item.chosenBudget !== item.requiredMinimum) {
          newErrors.push({
            error: 'Taxes',
            errorMessage: errorMessages.taxes,
          });
        }
        break;
      case 'incomeToSpend':
        if (item.chosenBudget !== item.requiredMinimum) {
          newErrors.push({
            error: 'Income to spend after taxes',
            errorMessage: errorMessages.incomeToSpend,
          });
        }
        break;
      default:
        if (item.chosenBudget <= 0) {
          newErrors.push({
            error: item.budgetItem,
            errorMessage: errorMessages.default,
          });
        }
        break;
    }
  });
  return newErrors;
};
