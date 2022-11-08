export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;

export const error = 'error';
export const ERROR = 'Error';
export const success = 'success';
export const SUCCESS = 'Success';
export const battleships = 'battleships';
export const mathFacts = 'mathFacts';
export const template = 'template';
export const budgetSummary = 'budgetSummary';
export const savedGame = 'savedGame';

export const generateBgColor = () =>
  `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`;

export const withMoneySymbol = (salary) =>
  salary.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export const convertMoneyToNumber = (moneyString) => {
  const removeComma = moneyString.split(',').join('');
  return +removeComma.slice(1);
};

export const BATTLESHIP_MONTHS = [4, 8, 12];
