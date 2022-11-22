import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyledDivPaddingTop,
  StyledFirstNumber,
  StyledInput,
  StyledMathFactWrapper,
  StyledQuestionHeader,
  StyledXSecondNumber,
  StyledH1Centered,
  StyledH3Bolded,
  StyledButton300Width,
} from './styles';
import StyledBasicDiv from '../../../components/BasicDiv';
import { useGameServiceProvider } from '../../../services/GameServiceProvider';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';

const MathFacts = ({ changeView }) => {
  const { getBearerHeader } = useAuthServiceProvider();
  const {
    game,
    setPushMathFactResult,
    updateMathFactScore,
    getBonusOrFine,
    updateGameById,
    getMonth,
    getSavings,
    getScore,
  } = useGameServiceProvider();
  const inputRef = useRef(true);
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [previousNumbers, setPreviousNumbers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [count, setCount] = useState(0);

  const randomNumber = useCallback(() => Math.ceil(Math.random() * 12), []);
  const newNumbers = useCallback(() => {
    const updateFirstNumber = randomNumber();
    const updateSecondNumber = randomNumber();
    if (
      updateFirstNumber === firstNumber ||
      updateSecondNumber === secondNumber
    ) {
      newNumbers();
    }
    setFirstNumber(updateFirstNumber);
    setSecondNumber(updateSecondNumber);
  }, []);

  useEffect(() => {
    updateGameById(
      {
        month: getMonth(),
        savings: getSavings(),
        score: getScore(),
        bonusOrFine: getBonusOrFine(),
      },
      game.gameId,
      getBearerHeader()
    );
  }, []);

  const getNewNumbers = (answer, correct) => {
    setPreviousNumbers((prevState) => [
      ...prevState,
      {
        firstNumber,
        secondNumber,
        answer,
        correct,
      },
    ]);
    newNumbers();
  };

  const confirmAnswer = (answer) => {
    const trueAnswer = firstNumber * secondNumber;
    getNewNumbers(answer, trueAnswer === answer);
  };

  const percentages =
    (previousNumbers.filter((question) => question.correct).length / 20) * 100;

  const backToBudget = () => changeView('template');

  useEffect(() => {
    newNumbers();
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (count === 20) {
      setPushMathFactResult(percentages);
      updateMathFactScore(percentages);
    }
  }, [count === 20]);

  return (
    <>
      {count < 20 && (
        <StyledDivPaddingTop>
          <StyledH1Centered>Math Facts</StyledH1Centered>
          <StyledQuestionHeader>
            Questions left: {20 - count}
          </StyledQuestionHeader>
          <StyledMathFactWrapper>
            <StyledFirstNumber>{firstNumber}</StyledFirstNumber>
            <StyledXSecondNumber>
              <StyledBasicDiv>x</StyledBasicDiv>
              <StyledBasicDiv>{secondNumber}</StyledBasicDiv>
            </StyledXSecondNumber>
            <StyledInput
              value={currentAnswer}
              onChange={(e) => {
                setCurrentAnswer(e.target.value);
              }}
              onPressEnter={() => {
                confirmAnswer(+currentAnswer);
                setCurrentAnswer('');
                setCount(count + 1);
              }}
              type="text"
              ref={inputRef}
            />
          </StyledMathFactWrapper>
        </StyledDivPaddingTop>
      )}
      {count === 20 && (
        <StyledDivPaddingTop textAlign="center">
          <h1>You did 20 questions!</h1>
          <StyledH3Bolded>Amount Correct:{percentages}%</StyledH3Bolded>
          {getBonusOrFine() < 0 ? (
            <>
              <h1>You have received {getBonusOrFine()} points! :(</h1>
              <StyledH3Bolded>
                You have received a fine ${getBonusOrFine()}! :(
              </StyledH3Bolded>
            </>
          ) : (
            <>
              <StyledH3Bolded>
                You have received {getBonusOrFine()} points! :)
              </StyledH3Bolded>
              <StyledH3Bolded>
                You have received a bonus of ${getBonusOrFine()}! :)
              </StyledH3Bolded>
            </>
          )}
          <StyledButton300Width
            size="large"
            type="primary"
            onClick={backToBudget}
          >
            Back to Budget Planning
          </StyledButton300Width>
        </StyledDivPaddingTop>
      )}
    </>
  );
};

export default MathFacts;
